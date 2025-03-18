import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { HttpTypes } from "@medusajs/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type CountrySelectProps = {
  name: string;
  autoComplete?: string;
  region?: HttpTypes.StoreRegion;
  value?: string;
  required?: boolean;
  onChange: (e: { target: { name: string; value: string } }) => void;
  "data-testid"?: string;
};

const CountrySelect = forwardRef<HTMLButtonElement, CountrySelectProps>(
  ({ name, region, value, onChange, required, ...props }, ref) => {
    const innerRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(
      ref,
      () => innerRef.current,
    );

    const countryOptions = useMemo(() => {
      if (!region) {
        return [];
      }

      return region.countries?.map((country) => ({
        value: country.iso_2,
        label: country.display_name,
      }));
    }, [region]);

    const handleValueChange = (newValue: string) => {
      // Select komponentinin değeri değiştiğinde formData'yı güncellemek için onChange çağrısı
      onChange({ target: { name, value: newValue } });
    };

    return (
      <>
        <Label htmlFor={name}>
          Ülke {required && <span className="text-destructive">*</span>}
        </Label>
        <Select defaultValue={value} onValueChange={handleValueChange}>
          <SelectTrigger ref={innerRef} id={name} className="w-full">
            <SelectValue placeholder="Ülke seçiniz" />
          </SelectTrigger>
          <SelectContent>
            {countryOptions?.map(({ value: optionValue, label }) => (
              <SelectItem key={optionValue} value={optionValue || ""}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </>
    );
  },
);

CountrySelect.displayName = "CountrySelect";

export default CountrySelect;
