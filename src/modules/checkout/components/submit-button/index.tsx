"use client"

import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import React, { useState, useEffect } from "react"
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
  const [wasSubmitted, setWasSubmitted] = useState(false)

  // pending true olduğunda wasSubmitted'ı true yap
  useEffect(() => {
    if (pending) {
      setWasSubmitted(true)
    }
  }, [pending])

  // pending false olduktan sonra da bir süre loading göster
  const isLoading = pending || wasSubmitted

  return (
    <Button
      className={className}
      type="submit"
      disabled={isLoading}
      variant={variant || "default"}
      data-testid={dataTestId}
    >
      {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : children}
    </Button>
  )
}
