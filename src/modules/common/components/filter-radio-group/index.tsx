import React from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type FilterRadioGroupProps<T extends string> = {
  title: string
  items: Array<{
    value: T
    label: string
  }>
  value: T
  handleChange: (value: T) => void
  "data-testid"?: string
}

const FilterRadioGroup = <T extends string>({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps<T>) => {
  return (
    <div className="flex flex-col space-y-4">
      <p className="text-sm font-medium ">{title}</p>
      <RadioGroup 
        value={value} 
        onValueChange={handleChange}
        data-testid={dataTestId}
      >
        {items?.map((item) => (
          <div
            key={item.value}
            className="flex items-center space-x-2"
          >
            <RadioGroupItem value={item.value} id={item.value} />
            <Label 
              htmlFor={item.value}
              className={`text-sm cursor-pointer transition-colors ${
                item.value === value 
                  ? "text-gray-900 font-medium" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              data-testid="radio-label"
              data-active={item.value === value}
            >
              {item.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
