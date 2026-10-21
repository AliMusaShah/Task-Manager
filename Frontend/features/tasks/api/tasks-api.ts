import type { Task, TaskFormValues, TaskStatus } from "../types/task-types"

const TASKS_API_BASE_URL = "/api"

type ApiErrorBody = {
  message?: string | string[]
}

export class TaskApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message)
    this.name = "TaskApiError"
  }
}

function getErrorMessage(body: unknown, fallback: string) {
  if (typeof body !== "object" || body === null || !("message" in body)) {
    return fallback
  }

  const { message } = body as ApiErrorBody

  if (Array.isArray(message)) return message.join(" ")
  return typeof message === "string" && message.trim() ? message : fallback
}

async function readResponseBody(response: Response): Promise<unknown> {
  const body = await response.text()

  if (!body) return undefined

  try {
    return JSON.parse(body)
  } catch {
    return body
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response

  try {
    response = await fetch(`${TASKS_API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    })
  } catch {
    throw new TaskApiError(
      "Could not connect to the task service. Please check your connection and try again."
    )
  }

  const body = await readResponseBody(response)

  if (!response.ok) {
    throw new TaskApiError(
      getErrorMessage(body, "The task request could not be completed. Please try again."),
      response.status
    )
  }

  return body as T
}

export function isTaskApiError(error: unknown): error is TaskApiError {
  return error instanceof TaskApiError
}

export function isTaskNotFoundError(error: unknown) {
  return isTaskApiError(error) && error.status === 404
}

export function getTaskErrorMessage(error: unknown) {
  if (isTaskApiError(error)) return error.message
  return "Something went wrong. Please try again."
}

export async function getTasks(): Promise<Task[]> {
  try {
    return await request<Task[]>("/tasks")
  } catch (error) {
    // The current backend uses 404 to represent an empty task collection.
    if (isTaskNotFoundError(error)) return []
    throw error
  }
}

export function getTask(id: string): Promise<Task> {
  return request<Task>(`/tasks/${encodeURIComponent(id)}`)
}

export function createTask(
  values: Pick<TaskFormValues, "title" | "description">
): Promise<Task> {
  const description = values.description.trim()

  return request<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify({
      title: values.title.trim(),
      ...(description ? { description } : {}),
    }),
  })
}

export function updateTask(
  id: string,
  values: Partial<Pick<TaskFormValues, "title" | "description" | "status">>
): Promise<Task> {
  const payload: {
    title?: string
    description?: string
    status?: TaskStatus
  } = {}

  if (values.title !== undefined) payload.title = values.title.trim()
  if (values.description !== undefined) {
    payload.description = values.description.trim()
  }
  if (values.status !== undefined) payload.status = values.status

  return request<Task>(`/tasks/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  })
}

export function deleteTask(id: string): Promise<void> {
  return request<void>(`/tasks/${encodeURIComponent(id)}`, {
    method: "DELETE",
  })
}
