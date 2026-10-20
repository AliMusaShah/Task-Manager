"use client"

import { useRouter } from "next/navigation"

import { useTaskStore } from "../store/task-store"
import { ScreenContainer } from "./screen-container"
import { ScreenHeader } from "./screen-header"
import { TaskForm } from "./task-form"
import { TaskNotFound } from "./task-not-found"

function TaskEditScreen({ taskId }: { taskId: string }) {
  const router = useRouter()
  const task = useTaskStore((state) =>
    state.tasks.find((item) => item.id === taskId)
  )
  const updateTask = useTaskStore((state) => state.updateTask)

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
        onSubmit={(values) => {
          updateTask(task.id, values)
          router.push(detailHref)
        }}
      />
    </ScreenContainer>
  )
}

export { TaskEditScreen }
