import { Check, ClipboardList } from "lucide-react"

type TaskEmptyStateProps = {
  title: string
  description: string
  children?: React.ReactNode
}

function TaskEmptyState({ title, description, children }: TaskEmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-12 text-center">
      <div aria-hidden="true" className="relative">
        <div className="flex size-36 items-center justify-center rounded-full bg-task-accent-soft">
          <div className="flex size-20 -rotate-6 items-center justify-center rounded-card border border-border bg-background shadow-ds-200">
            <ClipboardList className="size-10 text-task-accent" />
          </div>
        </div>
        <span className="absolute top-3 right-4 size-3 rounded-full bg-task-accent/30" />
        <span className="absolute bottom-6 left-1 size-2 rounded-full bg-task-accent/40" />
        <span className="absolute right-1 bottom-4 flex size-9 items-center justify-center rounded-full border-2 border-background bg-status-done text-status-done-foreground">
          <Check className="size-5" />
        </span>
      </div>
      <div className="flex max-w-64 flex-col gap-2">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      {children}
    </div>
  )
}

export { TaskEmptyState }
