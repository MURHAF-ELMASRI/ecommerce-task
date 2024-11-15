import FilterPanel from "@/components/FilterPanel";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useBrands from "@/services/brand/useBrands";
import useCategories from "@/services/category/useCategories";
import { useInfiniteProducts } from "@/services/products/useInfiniteProducts";
import { Product } from "@/types";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Fragment } from "react/jsx-runtime";
import ProductCard from "./ProductCard";
import { useFilterState } from "./useFilterState";

export function HomePage() {
  const {
    selectedCategory,
    selectedBrand,
    priceRange,
    handleSelectBrand,
    handleSelectCategory,
    handleSelectPriceRange,
  } = useFilterState();

  const infiniteProducts = useInfiniteProducts({ pageLimit: 3 });
  const { ref: inViewRef, inView } = useInView();

  const categoriesQuery = useCategories();
  const brandsQuery = useBrands();

  useEffect(() => {
    if (inView) {
      infiniteProducts.fetchNextPage();
    }
  }, [inView, infiniteProducts]);

  return (
    <div className="container mx-auto mt-8 pb-8 flex gap-4">
      <FilterPanel
        categories={categoriesQuery.data}
        brands={brandsQuery.data}
        selectedCategory={selectedCategory}
        selectedBrand={selectedBrand}
        priceRange={priceRange}
        onCategoryChange={handleSelectCategory}
        onBrandChange={handleSelectBrand}
        onPriceRangeChange={handleSelectPriceRange}
      />
      <div className="contents">
        {infiniteProducts.error instanceof Error && (
          <div>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                An error occurred: {infiniteProducts.error.message}
                <Button
                  variant="destructive"
                  className="ml-2"
                  onClick={() => infiniteProducts.refetch()}
                >
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-center relative">
          {infiniteProducts.isFetching && (
            <div className="absolute w-full h-full bg-slate-800  opacity-50 z-50"></div>
          )}
          {infiniteProducts.isSuccess &&
            infiniteProducts.data.pages.map((page, index) => (
              <Fragment key={index}>
                {page.data.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Fragment>
            ))}

          {(infiniteProducts.hasNextPage || infiniteProducts.isLoading) && (
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <ProductCardSkeleton key={i}></ProductCardSkeleton>
              ))}

              <div ref={inViewRef} className="w-full ">
                <ProductCardSkeleton></ProductCardSkeleton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
