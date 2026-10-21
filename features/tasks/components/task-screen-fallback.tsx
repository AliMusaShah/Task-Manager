import { ScreenContainer } from "./screen-container"

function TaskScreenFallback() {
  return (
    <ScreenContainer aria-busy="true">
      <div className="flex flex-col gap-4 px-5 pt-6" aria-hidden="true">
        <div className="size-11 animate-pulse rounded-card bg-muted" />
        <div className="h-40 animate-pulse rounded-card bg-muted" />
        <div className="h-24 animate-pulse rounded-card bg-muted" />
      </div>
    </ScreenContainer>
  )
}

export { TaskScreenFallback }
