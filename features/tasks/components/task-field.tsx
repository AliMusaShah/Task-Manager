import { CircleAlert } from "lucide-react"

import { fieldLabelClassName } from "./task-field-styles"

type TaskFieldProps = {
  /** Must match the `id` of the control rendered as `children`. */
  id: string
  label: string
  required?: boolean
  optional?: boolean
  /** Inline validation message. The control should set `aria-describedby={`${id}-error`}`. */
  error?: string
  children: React.ReactNode
}

function TaskField({
  id,
  label,
  required,
  optional,
  error,
  children,
}: TaskFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={fieldLabelClassName}>
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-destructive">
            *
          </span>
        ) : null}
        {optional ? (
          <span className="ml-1.5 font-normal text-muted-foreground">
            Optional
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-sm font-medium text-destructive"
        >
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  )
}

export { TaskField }
