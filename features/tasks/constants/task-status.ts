import type { TaskFilter, TaskStatus } from "../types/task-types"

type TaskStatusConfig = {
  label: string
  /** Badge / pill colors (background + text). */
  badgeClassName: string
  /** Colors applied to a selected option in the status selector. */
  selectedClassName: string
}

export const TASK_STATUS_CONFIG: Record<TaskStatus, TaskStatusConfig> = {
  OPEN: {
    label: "Open",
    badgeClassName: "bg-status-open text-status-open-foreground",
    selectedClassName:
      "peer-checked:border-status-open-foreground/40 peer-checked:bg-status-open peer-checked:text-status-open-foreground",
  },
  IN_PROGRESS: {
    label: "In progress",
    badgeClassName: "bg-status-in-progress text-status-in-progress-foreground",
    selectedClassName:
      "peer-checked:border-status-in-progress-foreground/40 peer-checked:bg-status-in-progress peer-checked:text-status-in-progress-foreground",
  },
  DONE: {
    label: "Done",
    badgeClassName: "bg-status-done text-status-done-foreground",
    selectedClassName:
      "peer-checked:border-status-done-foreground/40 peer-checked:bg-status-done peer-checked:text-status-done-foreground",
  },
}

export const TASK_STATUS_ORDER: TaskStatus[] = ["OPEN", "IN_PROGRESS", "DONE"]

export const TASK_FILTER_OPTIONS: { value: TaskFilter; label: string }[] = [
  { value: "ALL", label: "All" },
  ...TASK_STATUS_ORDER.map((status) => ({
    value: status,
    label: TASK_STATUS_CONFIG[status].label,
  })),
]
