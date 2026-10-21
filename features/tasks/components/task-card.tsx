import Link from "next/link"
import { cn } from "cn"

import { Card } from "@/components/ui/card"

import type { Task } from "../types/task-types"
import { TaskStatusBadge } from "./task-status-badge"

function TaskCard({ task }: { task: Task }) {
  const isDone = task.status === "DONE"

  return (
    <Link
      href={`/tasks/${task.id}`}
      className="group block rounded-card outline-none focus-visible:ring-3 focus-visible:ring-task-accent/40"
    >
      <Card
        variant="note"
        className="gap-3 p-5 transition-colors group-hover:border-task-accent/40"
      >
        <h2
          className={cn(
            "text-base leading-snug font-semibold break-words text-foreground",
            isDone && "text-muted-foreground line-through"
          )}
        >
          {task.title}
        </h2>
        {task.description ? (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {task.description}
          </p>
        ) : null}
        <TaskStatusBadge status={task.status} className="self-start" />
      </Card>
    </Link>
  )
}

export { TaskCard }
