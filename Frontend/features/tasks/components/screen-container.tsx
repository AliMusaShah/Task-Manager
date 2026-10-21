import { cn } from "cn"

type ScreenContainerProps = React.ComponentProps<"main">

/** Mobile-width column, centered on larger screens. */
function ScreenContainer({ className, ...props }: ScreenContainerProps) {
  return (
    <div className="min-h-svh bg-board">
      <main
        className={cn(
          "relative mx-auto flex min-h-svh w-full max-w-md flex-col bg-background sm:border-x sm:border-border",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { ScreenContainer }
