import { queryKeys } from "@/services/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilterState = () => {
  const queryClient = useQueryClient();
  const [, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const handleSelectCategory = (category: string) => {
    setSearchParams({ category });
    setSelectedCategory(category);
    queryClient.invalidateQueries({
      queryKey: queryKeys.infinityProducts(),
      type: "active",
    });
  };

  const handleSelectBrand = (brand: string) => {
    setSearchParams({ brand });
    setSelectedBrand(brand);
    queryClient.invalidateQueries({
      queryKey: queryKeys.infinityProducts(),
      type: "active",
    });
  };

  const handleSelectPriceRange = (priceRange: [number, number]) => {
    setSearchParams({
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
