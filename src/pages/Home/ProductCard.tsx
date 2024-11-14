"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Product } from "@/types";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

interface Props {
  product: Product;
}

export default function ProductCard(props: Props) {
  const { product } = props;
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const inStock = product.availabilityStatus === "In Stock";

  return (
    <Card className="max-w-sm overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative w-full aspect-[4/3] mb-4 flex justify-center">
          <img src={product.thumbnail} alt={product.title} />
          <Badge variant="secondary" className="absolute top-3 right-3">
            {product.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-2xl font-bold">{product.title}</div>
          <div className="flex items-center mt-2 gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`size-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating})
            </span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-3xl font-bold">
            ${product.price.toFixed(2)}
          </span>
          <Badge variant={inStock ? "outline" : "destructive"}>
            {inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-20"
          />
          <Button className="flex-grow">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
        </Button>
        <Button variant="link">View Details</Button>
      </CardFooter>
    </Card>
  );
}
