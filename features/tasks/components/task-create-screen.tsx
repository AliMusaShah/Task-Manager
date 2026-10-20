"use client"

import { useRouter } from "next/navigation"

import { useTaskStore } from "../store/task-store"
import { ScreenContainer } from "./screen-container"
import { ScreenHeader } from "./screen-header"
import { TaskForm } from "./task-form"

function TaskCreateScreen() {
  const router = useRouter()
  const addTask = useTaskStore((state) => state.addTask)

  return (
    <ScreenContainer>
      <ScreenHeader title="New task" backHref="/" />
      <TaskForm
        mode="create"
        cancelHref="/"
        onSubmit={(values) => {
          addTask(values)
          router.push("/")
        }}
      />
    </ScreenContainer>
  )
}

export { TaskCreateScreen }
