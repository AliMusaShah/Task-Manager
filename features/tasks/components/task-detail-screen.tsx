"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Trash2 } from "lucide-react"
import { cn } from "cn"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { useTaskStore } from "../store/task-store"
import { DeleteTaskDialog } from "./delete-task-dialog"
import { ScreenContainer } from "./screen-container"
import { ScreenHeader } from "./screen-header"
import { TaskNotFound } from "./task-not-found"
import { TaskStatusBadge } from "./task-status-badge"
import { TaskStatusSelector } from "./task-status-selector"

function TaskDetailScreen({ taskId }: { taskId: string }) {
  const router = useRouter()
  const task = useTaskStore((state) =>
    state.tasks.find((item) => item.id === taskId)
  )
  const setTaskStatus = useTaskStore((state) => state.setTaskStatus)
  const deleteTask = useTaskStore((state) => state.deleteTask)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  if (isDeleted) return null
  if (!task) return <TaskNotFound />

  function handleDelete() {
    setConfirmOpen(false)
    setIsDeleted(true)
    deleteTask(taskId)
    router.replace("/")
  }

  return (
    <ScreenContainer>
      <ScreenHeader title="Task details" backHref="/" />

      <div className="flex flex-1 flex-col gap-4 px-5 pb-8">
        <Card variant="note" className="gap-4 p-5">
          <TaskStatusBadge status={task.status} className="self-start" />
          <h2 className="text-2xl leading-tight font-semibold tracking-tight break-words text-foreground">
            {task.title}
          </h2>
          <p
            className={cn(
              "text-base leading-relaxed whitespace-pre-line",
              task.description
                ? "text-foreground/80"
                : "text-muted-foreground italic"
            )}
          >
            {task.description ?? "No description added."}
          </p>
        </Card>

        <Card variant="note" className="p-5">
          <TaskStatusSelector
            label="Change status"
            value={task.status}
            onChange={(status) => setTaskStatus(task.id, status)}
          />
        </Card>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
          <Link
            href={`/tasks/${task.id}/edit`}
            className={buttonVariants({ variant: "accent", size: "form" })}
          >
            <Pencil aria-hidden="true" />
            Edit
          </Link>
          <Button
            variant="dangerOutline"
            size="form"
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2 aria-hidden="true" />
            Delete
          </Button>
        </div>
      </div>

      <DeleteTaskDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleDelete}
        taskTitle={task.title}
      />
    </ScreenContainer>
  )
}

export { TaskDetailScreen }
