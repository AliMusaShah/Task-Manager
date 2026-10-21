import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

import { ScreenContainer } from "./screen-container"
import { ScreenHeader } from "./screen-header"
import { TaskEmptyState } from "./task-empty-state"

function TaskNotFound() {
  return (
    <ScreenContainer>
      <ScreenHeader title="Task" backHref="/" />
      <TaskEmptyState
        title="Task not found"
        description="This task may have been deleted or the link is incorrect."
      >
        <Link
          href="/"
          className={buttonVariants({ variant: "accent", size: "form" })}
        >
          Back to tasks
        </Link>
      </TaskEmptyState>
    </ScreenContainer>
  )
}

export { TaskNotFound }
