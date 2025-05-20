// components/products/product-grid.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Star, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Product } from "@/lib/types";
import { useState } from "react";
import { useWishlistStore } from "@/lib/store/wishlist";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [hoverStates, setHoverStates] = useState<Record<string, boolean>>({});
  const { addItem, removeItem, isInWishlist } = useWishlistStore();

  const handleProductHover = (productId: string, isHovered: boolean) => {
    setHoverStates((prev) => ({
      ...prev,
      [productId]: isHovered,
    }));
  };

  const handleWishlistClick = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(productId)) {
      removeItem(productId);
    } else {
      addItem(productId);
    }
  };

  const getTagStyle = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "self made":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "promotional":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "resale":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "limited edition":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "new arrival":
        return "bg-teal-100 text-teal-800 hover:bg-teal-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {products.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg group border-border/50 h-full flex flex-col"
          onMouseEnter={() => handleProductHover(product.id, true)}
          onMouseLeave={() => handleProductHover(product.id, false)}
        >
          <CardContent className="p-0">
            <Link href={`/products/${product.id}`} className="block">
              <div className="relative aspect-square bg-muted overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-500",
                    hoverStates[product.id] ? "scale-105" : "scale-100"
                  )}
                />

                {product.discount && (
                  <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-sm py-1.5">
                    {product.discount}% OFF
                  </Badge>
                )}

                <Badge
                  variant="outline"
                  className={cn(
                    "absolute top-4 right-4 bg-background/80 backdrop-blur-sm border-none",
                    "text-sm py-1.5"
                  )}
                >
                  <Link
                    href={`/categories/${product.category.toLowerCase()}`}
                    className="hover:underline"
                  >
                    {product.category}
                  </Link>
                </Badge>

                {product.tags && product.tags.length > 0 && (
                  <div
                    className={cn(
                      "absolute bottom-16 left-4 flex flex-wrap gap-2 transition-opacity duration-300",
                      hoverStates[product.id] ? "opacity-100" : "opacity-80"
                    )}
                  >
                    {product.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className={cn(
                          "rounded-full text-sm py-0.5 px-2 flex items-center gap-1.5",
                          getTagStyle(tag)
                        )}
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div
                  className={cn(
                    "absolute bottom-4 right-4 transition-opacity duration-300",
                    hoverStates[product.id] ? "opacity-100" : "opacity-0"
                  )}
                >
                  <Button
                    size="icon"
                    variant={isInWishlist(product.id) ? "default" : "secondary"}
                    className="rounded-full shadow-sm mr-2 h-12 w-12"
                    onClick={(e) => handleWishlistClick(product.id, e)}
                  >
                    <Heart
                      className="h-5 w-5"
                      fill={isInWishlist(product.id) ? "currentColor" : "none"}
                    />
                  </Button>
                  <Button
                    size="icon"
                    variant="default"
                    className="rounded-full shadow-sm h-12 w-12"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Link>

            <div className="p-6">
              <Link
                href={`/products/${product.id}`}
                className="block group-hover:text-primary transition-colors"
              >
                <h3 className="font-medium text-xl line-clamp-1">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center mt-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1.5 text-base font-medium">
                    {product.rating}
                  </span>
                </div>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-base text-muted-foreground">
                  {product.reviewCount} reviews
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  {product.discount ? (
                    <div className="flex items-center">
                      <span className="font-bold text-xl">
                        $
                        {(product.price * (1 - product.discount / 100)).toFixed(
                          2
                        )}
                      </span>
                      <span className="ml-2 text-base text-muted-foreground line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold text-xl">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>

                <Link
                  href={`/creators/${product.creator.handle}`}
                  className="relative flex items-center"
                >
                  <div className="h-8 w-8 rounded-full overflow-hidden border border-border">
                    <Image
                      src={product.creator.image}
                      alt={product.creator.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    @{product.creator.handle}
                  </span>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
