"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <Card className="max-w-sm overflow-hidden w-full">
      <CardHeader className="p-0">
        <div className="relative w-full aspect-[4/3] mb-4 p-8">
          <Skeleton className="h-full w-full rounded-xl" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-[250px] mb-4" />
        <Skeleton className="h-4 w-[200px]" />
      </CardContent>
      <CardFooter className="grid gap-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </CardFooter>
    </Card>
  );
}
