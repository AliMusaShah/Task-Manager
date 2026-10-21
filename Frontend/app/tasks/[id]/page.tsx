import { Suspense } from "react"

import { TaskDetailScreen, TaskScreenFallback } from "@/features/tasks"

export default function TaskDetailPage({ params }: PageProps<"/tasks/[id]">) {
  return (
    <Suspense fallback={<TaskScreenFallback />}>
      {params.then(({ id }) => (
        <TaskDetailScreen taskId={id} />
      ))}
    </Suspense>
  )
}
