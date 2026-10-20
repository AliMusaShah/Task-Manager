import { cn } from "cn"

import { TASK_FILTER_OPTIONS } from "../constants/task-status"
import type { TaskFilter } from "../types/task-types"

type TaskFilterBarProps = {
  value: TaskFilter
  onChange: (value: TaskFilter) => void
}

function TaskFilterBar({ value, onChange }: TaskFilterBarProps) {
  return (
    <div
      role="group"
      aria-label="Filter tasks by status"
      className="flex flex-wrap gap-2"
    >
      {TASK_FILTER_OPTIONS.map((option) => {
        const isActive = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              "h-9 rounded-full border px-4 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-task-accent/40",
              isActive
                ? "border-task-accent bg-task-accent text-task-accent-foreground"
                : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export { TaskFilterBar }
