import { Checkbox } from "@/components/ui/checkbox"; // Example ShadCN checkbox component
import { Slider } from "@/components/ui/slider"; // Example ShadCN slider component
import React from "react";
import { Separator } from "./ui/separator";

interface FilterPanelProps {
  categories?: string[];
  brands?: string[];
  selectedCategory: string;
  selectedBrand: string;
  priceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  priceRange,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
}) => {
  return (
    <aside className="w-64 p-4  border-r">
      {/* Category Filter */}
      {categories && (
        <div className="mt-4 grid gap-2">
          <h4 className="text-sm">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedCategory === category}
                  onCheckedChange={() => onCategoryChange(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      <Separator className="my-4" />

      {/* Brand Filter */}
      {brands && (
        <div className="mt-4 grid gap-2">
          <h4 className="text-sm">Brand</h4>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedBrand === brand}
                  onCheckedChange={() => onBrandChange(brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      <Separator className="my-4" />

      {/* Price Range Filter */}
      <div className="mt-4 grid gap-4">
        <h4 className="text-sm">Price Range</h4>
        <Slider
          value={priceRange}
          onValueChange={(value) =>
            onPriceRangeChange([value[0], value[1]] as [number, number])
          }
          max={500}
          step={1}
        />
        <div className="flex justify-between text-sm mt-1">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </aside>
  );
};

export default FilterPanel;
