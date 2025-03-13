"use client";

import FilterRadioGroup from "@modules/common/components/filter-radio-group";

export type SortOptions = "price_asc" | "price_desc" | "created_at";

type SortProductsProps = {
  sortBy: SortOptions;
  setQueryParams: (name: string, value: SortOptions) => void;
  "data-testid"?: string;
};

const sortOptions: Array<{
  value: SortOptions;
  label: string;
}> = [
  {
    value: "created_at",
    label: "En Yeni Ürünler",
  },
  {
    value: "price_asc",
    label: "Fiyat: Artan",
  },
  {
    value: "price_desc",
    label: "Fiyat: Azalan",
  },
];

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value);
  };

  return (
    <FilterRadioGroup<SortOptions>
      title="Sırala"
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  );
};

export default SortProducts;
