"use client"

import { useId } from "react"
import { cn } from "cn"

import { TASK_STATUS_CONFIG, TASK_STATUS_ORDER } from "../constants/task-status"
import type { TaskStatus } from "../types/task-types"
import { fieldLabelClassName } from "./task-field-styles"

type TaskStatusSelectorProps = {
  value: TaskStatus
  onChange: (status: TaskStatus) => void
  label?: string
}

function TaskStatusSelector({
  value,
  onChange,
  label = "Status",
}: TaskStatusSelectorProps) {
  const id = useId()
  const labelId = `${id}-label`

  return (
    <div className="flex flex-col gap-2">
      <span id={labelId} className={fieldLabelClassName}>
        {label}
      </span>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        className="grid grid-cols-3 gap-2"
      >
        {TASK_STATUS_ORDER.map((status) => {
          const config = TASK_STATUS_CONFIG[status]

          return (
            <label key={status} className="relative block cursor-pointer">
              <input
                type="radio"
                name={id}
                value={status}
                checked={value === status}
                onChange={() => onChange(status)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex h-11 items-center justify-center rounded-card border border-border bg-background px-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted peer-checked:font-semibold peer-focus-visible:ring-3 peer-focus-visible:ring-task-accent/40",
                  config.selectedClassName
                )}
              >
                {config.label}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export { TaskStatusSelector }
