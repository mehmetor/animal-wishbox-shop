import { Label } from "@medusajs/ui"
import React, { useEffect, useImperativeHandle, useState } from "react"
import { Input as ShadcnInput } from "@/components/ui/input"

import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, topLabel, className = "", ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="flex flex-col w-full">
        {topLabel && (
          <Label className="mb-2">{topLabel}</Label>
        )}
        <div className="relative">
          <Label htmlFor={name} className="mb-2">
            {label}
            {required && <span className="text-destructive">*</span>}
          </Label>
          <div className="relative">
            <ShadcnInput
              type={inputType}
              name={name}
              id={name}
              required={required}
              className={className}
              {...props}
              ref={inputRef}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground focus:outline-none"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
