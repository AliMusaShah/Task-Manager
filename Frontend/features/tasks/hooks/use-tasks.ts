"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../api/tasks-api"
import type { Task, TaskFormValues } from "../types/task-types"

export const taskQueryKeys = {
  all: ["tasks"] as const,
  list: () => [...taskQueryKeys.all, "list"] as const,
  detail: (id: string) => [...taskQueryKeys.all, "detail", id] as const,
}

export function useTasks() {
  return useQuery({
    queryKey: taskQueryKeys.list(),
    queryFn: getTasks,
  })
}

export function useTask(id: string) {
  return useQuery({
    queryKey: taskQueryKeys.detail(id),
    queryFn: () => getTask(id),
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTask,
    onSuccess: (task) => {
      queryClient.setQueryData(taskQueryKeys.detail(task.id), task)
      return queryClient.invalidateQueries({ queryKey: taskQueryKeys.list() })
    },
  })
}

type UpdateTaskVariables = {
  id: string
  values: Partial<Pick<TaskFormValues, "title" | "description" | "status">>
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, values }: UpdateTaskVariables) => updateTask(id, values),
    onSuccess: (task) => {
      queryClient.setQueryData<Task>(taskQueryKeys.detail(task.id), task)
      return queryClient.invalidateQueries({ queryKey: taskQueryKeys.list() })
    },
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: taskQueryKeys.detail(id) })
      return queryClient.invalidateQueries({ queryKey: taskQueryKeys.list() })
    },
  })
}
