"use client"

import { useRouter } from "next/navigation"

import { isTaskNotFoundError } from "../api/tasks-api"
import { useTask, useUpdateTask } from "../hooks/use-tasks"
import { ScreenContainer } from "./screen-container"
import { ScreenHeader } from "./screen-header"
import { TaskForm } from "./task-form"
import { TaskNotFound } from "./task-not-found"
import { TaskRequestError } from "./task-request-error"
import { TaskScreenFallback } from "./task-screen-fallback"

function TaskEditScreen({ taskId }: { taskId: string }) {
  const router = useRouter()
  const { data: task, error, isPending, refetch } = useTask(taskId)
  const updateTask = useUpdateTask()

  if (isPending) return <TaskScreenFallback />
  if (isTaskNotFoundError(error)) return <TaskNotFound />
  if (error) {
    return (
      <ScreenContainer>
        <ScreenHeader title="Edit task" backHref={`/tasks/${taskId}`} />
        <TaskRequestError
          title="Unable to load task"
          error={error}
          onRetry={() => void refetch()}
        />
      </ScreenContainer>
    )
  }
  if (!task) return <TaskNotFound />

  const detailHref = `/tasks/${task.id}`

  return (
    <ScreenContainer>
      <ScreenHeader title="Edit task" backHref={detailHref} />
      <TaskForm
        mode="edit"
        initialValues={{
          title: task.title,
          description: task.description ?? "",
          status: task.status,
        }}
        cancelHref={detailHref}
        onSubmit={async (values) => {
          await updateTask.mutateAsync({ id: task.id, values })
          router.push(detailHref)
        }}
        isSubmitting={updateTask.isPending}
      />
    </ScreenContainer>
  )
}

export { TaskEditScreen }
