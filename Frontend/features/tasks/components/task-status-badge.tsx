import { cn } from "cn"

import { TASK_STATUS_CONFIG } from "../constants/task-status"
import type { TaskStatus } from "../types/task-types"

type TaskStatusBadgeProps = {
  status: TaskStatus
  className?: string
}

function TaskStatusBadge({ status, className }: TaskStatusBadgeProps) {
  const config = TASK_STATUS_CONFIG[status]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
        config.badgeClassName,
        className
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  )
}

export { TaskStatusBadge }
