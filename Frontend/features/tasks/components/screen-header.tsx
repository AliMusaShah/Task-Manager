import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"

type ScreenHeaderProps = {
  title: string
  backHref: string
}

function ScreenHeader({ title, backHref }: ScreenHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-5 pt-6 pb-6">
      <Link
        href={backHref}
        aria-label="Back"
        className={buttonVariants({ variant: "outline", size: "icon-lg" })}
      >
        <ArrowLeft aria-hidden="true" />
      </Link>
      <h1 className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
    </header>
  )
}

export { ScreenHeader }
