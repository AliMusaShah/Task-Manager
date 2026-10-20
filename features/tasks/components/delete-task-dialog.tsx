"use client"

import { AlertDialog } from "@base-ui/react/alert-dialog"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

type DeleteTaskDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  taskTitle: string
}

function DeleteTaskDialog({
  open,
  onOpenChange,
  onConfirm,
  taskTitle,
}: DeleteTaskDialogProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 z-50 bg-black/40 transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2.5rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-card border border-border bg-background p-6 shadow-ds-300 outline-none transition-[opacity,scale] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          <div className="flex flex-col items-center gap-4 text-center">
            <span
              aria-hidden="true"
              className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive"
            >
              <Trash2 className="size-6" />
            </span>
            <div className="flex flex-col gap-2">
              <AlertDialog.Title className="text-xl font-semibold tracking-tight text-foreground">
                Delete this task?
              </AlertDialog.Title>
              <AlertDialog.Description className="text-sm leading-relaxed text-muted-foreground">
                “{taskTitle}” will be permanently removed. This can’t be undone.
              </AlertDialog.Description>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <AlertDialog.Close
              render={<Button variant="outline" size="form" />}
            >
              Cancel
            </AlertDialog.Close>
            <Button variant="danger" size="form" onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export { DeleteTaskDialog }
