"use client"

import { useId, useRef, useState } from "react"
import Link from "next/link"
import { cn } from "cn"

import { Button, buttonVariants } from "@/components/ui/button"

import type { TaskFormValues } from "../types/task-types"
import { TaskField } from "./task-field"
import { fieldControlClassName } from "./task-field-styles"
import { TaskStatusSelector } from "./task-status-selector"
import { getTaskErrorMessage } from "../api/tasks-api"

type TaskFormProps = {
  mode: "create" | "edit"
  initialValues?: TaskFormValues
  cancelHref: string
  onSubmit: (values: TaskFormValues) => Promise<void>
  isSubmitting?: boolean
}

const EMPTY_VALUES: TaskFormValues = {
  title: "",
  description: "",
  status: "OPEN",
}

function TaskForm({
  mode,
  initialValues = EMPTY_VALUES,
  cancelHref,
  onSubmit,
  isSubmitting = false,
}: TaskFormProps) {
  const id = useId()
  const titleId = `${id}-title`
  const descriptionId = `${id}-description`
  const titleRef = useRef<HTMLInputElement>(null)

  const [values, setValues] = useState<TaskFormValues>(initialValues)
  const [titleError, setTitleError] = useState<string | undefined>()
  const [submitError, setSubmitError] = useState<string | undefined>()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!values.title.trim()) {
      setTitleError("Title is required")
      titleRef.current?.focus()
      return
    }

    setSubmitError(undefined)

    try {
      await onSubmit(values)
    } catch (error) {
      setSubmitError(getTaskErrorMessage(error))
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-1 flex-col gap-6 px-5 pb-8"
    >
      <TaskField id={titleId} label="Title" required error={titleError}>
        <input
          ref={titleRef}
          id={titleId}
          type="text"
          value={values.title}
          placeholder="e.g. Buy groceries"
          autoComplete="off"
          aria-invalid={titleError ? true : undefined}
          aria-describedby={titleError ? `${titleId}-error` : undefined}
          onChange={(event) => {
            setValues((current) => ({ ...current, title: event.target.value }))
            if (titleError && event.target.value.trim()) {
              setTitleError(undefined)
            }
          }}
          className={cn(fieldControlClassName, "h-12")}
        />
      </TaskField>

      <TaskField id={descriptionId} label="Description" optional>
        <textarea
          id={descriptionId}
          rows={5}
          value={values.description}
          placeholder="Add some details about this task"
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              description: event.target.value,
            }))
          }
          className={cn(fieldControlClassName, "min-h-32 resize-none py-3")}
        />
      </TaskField>

      {mode === "edit" ? (
        <TaskStatusSelector
          value={values.status}
          onChange={(status) =>
            setValues((current) => ({ ...current, status }))
          }
          disabled={isSubmitting}
        />
      ) : null}

      {submitError ? (
        <p role="alert" className="text-sm text-destructive">
          {submitError}
        </p>
      ) : null}

      <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
        <Link
          href={cancelHref}
          className={buttonVariants({ variant: "outline", size: "form" })}
        >
          Cancel
        </Link>
        <Button
          type="submit"
          variant="accent"
          size="form"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? mode === "create"
              ? "Creating…"
              : "Saving…"
            : mode === "create"
              ? "Create"
              : "Save changes"}
        </Button>
      </div>
    </form>
  )
}

export { TaskForm }
