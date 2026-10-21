"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Trash2 } from "lucide-react"
import { cn } from "cn"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { getTaskErrorMessage, isTaskNotFoundError } from "../api/tasks-api"
import { useDeleteTask, useTask, useUpdateTask } from "../hooks/use-tasks"
import type { TaskStatus } from "../types/task-types"
import { DeleteTaskDialog } from "./delete-task-dialog"
import { ScreenContainer } from "./screen-container"
import { ScreenHeader } from "./screen-header"
import { TaskNotFound } from "./task-not-found"
import { TaskStatusBadge } from "./task-status-badge"
import { TaskStatusSelector } from "./task-status-selector"
import { TaskRequestError } from "./task-request-error"
import { TaskScreenFallback } from "./task-screen-fallback"

function TaskDetailScreen({ taskId }: { taskId: string }) {
  const router = useRouter()
  const { data: task, error, isPending, refetch } = useTask(taskId)
  const updateTask = useUpdateTask()
  const deleteTask = useDeleteTask()

  const [confirmOpen, setConfirmOpen] = useState(false)

  if (isPending) return <TaskScreenFallback />
  if (isTaskNotFoundError(error)) return <TaskNotFound />
  if (error) {
    return (
      <ScreenContainer>
        <ScreenHeader title="Task details" backHref="/" />
        <TaskRequestError
          title="Unable to load task"
          error={error}
          onRetry={() => void refetch()}
        />
      </ScreenContainer>
    )
  }
  if (!task) return <TaskNotFound />

  async function handleDelete() {
    try {
      await deleteTask.mutateAsync(taskId)
      router.replace("/")
    } catch {
      // The dialog renders the mutation error and keeps the task visible.
    }
  }

  async function handleStatusChange(status: TaskStatus) {
    try {
      await updateTask.mutateAsync({ id: taskId, values: { status } })
    } catch {
      // The selector keeps the server value; the error is shown below it.
    }
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
            onChange={(status) => void handleStatusChange(status)}
            disabled={updateTask.isPending || deleteTask.isPending}
          />
          {updateTask.error ? (
            <p role="alert" className="text-sm text-destructive">
              {getTaskErrorMessage(updateTask.error)}
            </p>
          ) : null}
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
        isDeleting={deleteTask.isPending}
        errorMessage={
          deleteTask.error ? getTaskErrorMessage(deleteTask.error) : undefined
        }
      />
    </ScreenContainer>
  )
}

export { TaskDetailScreen }
