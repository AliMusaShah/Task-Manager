export type TaskStatus = "OPEN" | "IN_PROGRESS" | "DONE"

export type TaskFilter = "ALL" | TaskStatus

export type Task = {
  id: string
  title: string
  description?: string
  status: TaskStatus
}

export type TaskFormValues = {
  title: string
  description: string
  status: TaskStatus
}
