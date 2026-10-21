import { Button } from "@/components/ui/button"

import { getTaskErrorMessage } from "../api/tasks-api"
import { TaskEmptyState } from "./task-empty-state"

type TaskRequestErrorProps = {
  error: unknown
  onRetry: () => void
  title?: string
}

function TaskRequestError({
  error,
  onRetry,
  title = "Unable to load tasks",
}: TaskRequestErrorProps) {
  return (
    <TaskEmptyState
      title={title}
      description={getTaskErrorMessage(error)}
    >
      <Button type="button" variant="accent" size="form" onClick={onRetry}>
        Try again
      </Button>
    </TaskEmptyState>
  )
}

export { TaskRequestError }
