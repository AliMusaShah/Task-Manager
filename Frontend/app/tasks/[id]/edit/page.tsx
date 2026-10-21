import { Suspense } from "react"

import { TaskEditScreen, TaskScreenFallback } from "@/features/tasks"

export default function EditTaskPage({
  params,
}: PageProps<"/tasks/[id]/edit">) {
  return (
    <Suspense fallback={<TaskScreenFallback />}>
      {params.then(({ id }) => (
        <TaskEditScreen taskId={id} />
      ))}
    </Suspense>
  )
}
