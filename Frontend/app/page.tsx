import { Suspense } from "react"

import { TaskListScreen, TaskScreenFallback } from "@/features/tasks"

export default function HomePage() {
  return (
    <Suspense fallback={<TaskScreenFallback />}>
      <TaskListScreen />
    </Suspense>
  )
}
