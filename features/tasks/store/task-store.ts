import { create } from "zustand"

import { MOCK_TASKS } from "../data/mock-tasks"
import type { Task, TaskFormValues, TaskStatus } from "../types/task-types"

type TaskState = {
  tasks: Task[]
  addTask: (values: Pick<TaskFormValues, "title" | "description">) => void
  updateTask: (id: string, values: TaskFormValues) => void
  setTaskStatus: (id: string, status: TaskStatus) => void
  deleteTask: (id: string) => void
}

/**
 * In-memory mock store so every screen is interactive without a backend.
 * Swap these actions for your API calls when integrating.
 */
export const useTaskStore = create<TaskState>()((set) => ({
  tasks: MOCK_TASKS,
  addTask: ({ title, description }) =>
    set((state) => ({
      tasks: [
        {
          id: crypto.randomUUID(),
          title: title.trim(),
          description: description.trim() || undefined,
          status: "OPEN",
        },
        ...state.tasks,
      ],
    })),
  updateTask: (id, { title, description, status }) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: title.trim(),
              description: description.trim() || undefined,
              status,
            }
          : task
      ),
    })),
  setTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
}))
