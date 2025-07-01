import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react"
import { HttpTypes } from "@medusajs/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type CountrySelectProps = {
  name: string
  autoComplete?: string
  region?: HttpTypes.StoreRegion
  value?: string
  required?: boolean
  onChange?: (e: { target: { name: string; value: string } }) => void
  "data-testid"?: string
}

const CountrySelect = forwardRef<HTMLButtonElement, CountrySelectProps>(
  ({ name, region, value, onChange, required, ...props }, ref) => {
    const innerRef = useRef<HTMLButtonElement>(null)

    useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(
      ref,
      () => innerRef.current,
    )

    const countryOptions = useMemo(() => {
      if (!region?.countries) {
        return []
      }

      return region.countries.map((country) => ({
        value: country.iso_2,
        label: country.display_name,
      }))
    }, [region])

    const selectedValue = useMemo(() => {
      // `value` prop'u varsa ve seçenekler arasında geçerliyse onu kullan
      if (value && countryOptions.some((o) => o.value === value)) {
        return value
      }

      // Tek bir ülke seçeneği varsa, onu seçili değer yap
      if (countryOptions.length === 1) {
        return countryOptions[0].value
      }

      // Aksi halde boş bırak
      return ""
    }, [countryOptions, value])

    // Tek bir ülke varsa ve seçili değerden farklıysa formu güncelle
    useEffect(() => {
      if (
        countryOptions.length === 1 &&
        selectedValue &&
        selectedValue !== value
      ) {
        onChange?.({ target: { name, value: selectedValue } })
      }
    }, [selectedValue, value, countryOptions.length, name, onChange])

    return (
      <>
        <Label htmlFor={name}>
          Ülke {required && <span className="text-destructive">*</span>}
        </Label>

        {/* Hidden input form submission için */}
        <input type="hidden" name={name} value={selectedValue} />

        <Select
          value={selectedValue}
          onValueChange={(newValue) => {
            onChange?.({ target: { name, value: newValue } })
          }}
          disabled={countryOptions.length === 1} // Tek ülke varsa devre dışı bırak
        >
          <SelectTrigger ref={innerRef} id={name} className="w-full">
            <SelectValue placeholder="Ülke seçiniz" />
          </SelectTrigger>
          <SelectContent>
            {countryOptions?.map(({ value: optionValue, label }) =>
              optionValue ? (
                <SelectItem key={optionValue} value={optionValue}>
                  {label}
                </SelectItem>
              ) : null,
            )}
          </SelectContent>
        </Select>
      </>
    )
  },
)

CountrySelect.displayName = "CountrySelect"

export default CountrySelect
