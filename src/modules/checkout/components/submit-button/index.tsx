"use client"

import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  variant = "default",
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | null
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      className={className}
      type="submit"
      disabled={pending}
      variant={variant || "default"}
      data-testid={dataTestId}
    >
      {pending ? <Loader className="h-4 w-4 animate-spin" /> : children}
    </Button>
  )
}
