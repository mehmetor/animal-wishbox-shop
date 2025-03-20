import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
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
  onChange?: (e: { target: { name: string; value: string } }) => void;
  "data-testid"?: string;
};

const CountrySelect = forwardRef<HTMLButtonElement, CountrySelectProps>(
  ({ name, region, value, onChange, required, ...props }, ref) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    // Seçilen ülke için iç state
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    // İlk render kontrolü için
    const initialRenderRef = useRef(true);

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

    // Component yüklendiğinde region/countries değiştiğinde sadece
    // local state'i günceller, onChange çağırmaz
    useEffect(() => {
      let newCountryValue = "";
      
      // Gelen value değerini kullan
      if (value && value.trim() !== "") {
        newCountryValue = value;
      }
      // veya region'da tek ülke varsa onu kullan
      else if (region?.countries && region.countries.length > 0) {
        newCountryValue = region.countries[0].iso_2 || "";
      }

      // Sadece state'i güncelle, onChange çağırma
      if (newCountryValue) {
        setSelectedCountry(newCountryValue);
        console.log("CountrySelect - Default ülke ayarlandı:", newCountryValue);
      }
    }, [region]);

    // Sadece selectedCountry değiştiğinde onChange çağırılır
    // ve ilk render'da çağrılmaz
    useEffect(() => {
      // İlk render'da çalışmasını engelle
      if (initialRenderRef.current) {
        initialRenderRef.current = false;
        return;
      }

      // Sadece kullanıcı seçim değişikliği yaptığında çağrılır
      if (selectedCountry) {
        console.log("CountrySelect - onChange çağrılıyor:", selectedCountry);
        onChange?.({ target: { name, value: selectedCountry } });
      }
    }, [selectedCountry]);

    const handleValueChange = (newValue: string) => {
      if (newValue !== selectedCountry) {
        setSelectedCountry(newValue);
      }
    };

    return (
      <>
        <Label htmlFor={name}>
          Ülke {required && <span className="text-destructive">*</span>}
        </Label>
        
        {/* Hidden input form submission için */}
        <input 
          type="hidden" 
          name={name} 
          value={selectedCountry} 
        />
        
        <Select 
          value={selectedCountry} 
          onValueChange={handleValueChange}
          disabled={region?.countries?.length === 1} // Tek ülke varsa devre dışı bırak
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
              ) : null
            )}
          </SelectContent>
        </Select>
      </>
    );
  },
);

CountrySelect.displayName = "CountrySelect";

export default CountrySelect;
