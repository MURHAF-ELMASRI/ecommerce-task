import { queryKeys } from "@/services/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilterState = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || null
  );
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || null
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const allSearchParams = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  const handleSelectCategory = (category: string | null) => {
    if (!category) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { category, ...reset } = allSearchParams;
      setSearchParams(reset);
    } else {
      setSearchParams({ ...allSearchParams, category });
    }

    setSelectedCategory(category);

    queryClient.invalidateQueries({
      queryKey: queryKeys.infinityProducts(),
    });
  };

  const handleSelectBrand = (brand: string | null) => {
    if (!brand) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { brand, ...reset } = allSearchParams;

      setSearchParams(reset);
    } else {
      setSearchParams({ ...allSearchParams, brand });
    }

    setSelectedBrand(brand);
    queryClient.invalidateQueries({
      queryKey: queryKeys.infinityProducts(),
    });
  };

  const handleSelectPriceRange = (priceRange: [number, number]) => {
    setSearchParams({
      ...allSearchParams,
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
    });
    setPriceRange(priceRange);
    queryClient.invalidateQueries({ queryKey: queryKeys.infinityProducts() });
  };

  return {
    handleSelectCategory,
    handleSelectPriceRange,
    handleSelectBrand,
    selectedBrand,
    priceRange,
    selectedCategory,
  };
};
