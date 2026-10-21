"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"

import { TASK_STATUS_CONFIG } from "../constants/task-status"
import { useTaskStore } from "../store/task-store"
import type { TaskFilter } from "../types/task-types"
import { ScreenContainer } from "./screen-container"
import { TaskCard } from "./task-card"
import { TaskEmptyState } from "./task-empty-state"
import { TaskFilterBar } from "./task-filter-bar"

function TaskListScreen() {
  const tasks = useTaskStore((state) => state.tasks)
  const [filter, setFilter] = useState<TaskFilter>("ALL")

  const visibleTasks =
    filter === "ALL" ? tasks : tasks.filter((task) => task.status === filter)
  const doneCount = tasks.filter((task) => task.status === "DONE").length
  const hasTasks = tasks.length > 0

  return (
    <ScreenContainer>
      <header className="flex flex-col gap-1 px-5 pt-10 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          My Tasks
        </h1>
        <p className="text-sm text-muted-foreground">
          {hasTasks
            ? `${tasks.length - doneCount} to do · ${doneCount} done`
            : "A fresh start"}
        </p>
      </header>

      {hasTasks ? (
        <>
          <div className="px-5 pb-5">
            <TaskFilterBar value={filter} onChange={setFilter} />
          </div>

          {visibleTasks.length > 0 ? (
            <ul className="flex flex-col gap-3 px-5 pb-6">
              {visibleTasks.map((task) => (
                <li key={task.id}>
                  <TaskCard task={task} />
                </li>
              ))}
            </ul>
          ) : (
            <TaskEmptyState
              title="No tasks found"
              description={`You have no tasks marked “${
                filter === "ALL" ? "All" : TASK_STATUS_CONFIG[filter].label
              }” right now.`}
            />
          )}

          <div className="pointer-events-none sticky bottom-0 mt-auto flex justify-end px-5 pt-4 pb-6">
            <Link
              href="/tasks/new"
              aria-label="Create task"
              className={buttonVariants({
                variant: "accent",
                size: "fab",
                className: "pointer-events-auto",
              })}
            >
              <Plus aria-hidden="true" />
            </Link>
          </div>
        </>
      ) : (
        <TaskEmptyState
          title="No tasks yet"
          description="Add your first task and start getting things done."
        >
          <Link
            href="/tasks/new"
            className={buttonVariants({ variant: "accent", size: "form" })}
          >
            <Plus aria-hidden="true" />
            Create your first task
          </Link>
        </TaskEmptyState>
      )}
    </ScreenContainer>
  )
}

export { TaskListScreen }
