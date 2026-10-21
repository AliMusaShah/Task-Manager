"use client"

import { useRouter } from "next/navigation"

import { useCreateTask } from "../hooks/use-tasks"
import { ScreenContainer } from "./screen-container"
import { ScreenHeader } from "./screen-header"
import { TaskForm } from "./task-form"

function TaskCreateScreen() {
  const router = useRouter()
  const createTask = useCreateTask()

  return (
    <ScreenContainer>
      <ScreenHeader title="New task" backHref="/" />
      <TaskForm
        mode="create"
        cancelHref="/"
        onSubmit={async (values) => {
          const task = await createTask.mutateAsync(values)
          router.push(`/tasks/${task.id}`)
        }}
        isSubmitting={createTask.isPending}
      />
    </ScreenContainer>
  )
}

export { TaskCreateScreen }
