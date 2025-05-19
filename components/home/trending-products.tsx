"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for trending products
const trendingProducts = {
  All: [
    {
      id: "p1",
      name: "Minimalist Daily Planner",
      price: 24.99,
      image:
        "https://images.pexels.com/photos/733852/pexels-photo-733852.jpeg?auto=compress&cs=tinysrgb&w=1600",
      category: "Lifestyle",
      creator: {
        name: "Emma Lewis",
        handle: "emmacreates",
        image:
          "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      rating: 4.8,
      reviewCount: 124,
      trending: true,
      discount: null,
    },
    {
      id: "p2",
      name: "Wireless Noise-Cancelling Headphones",
      price: 149.99,
      image:
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1600",
      category: "Tech",
      creator: {
        name: "Alex Rivera",
        handle: "techwithalex",
        image:
          "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      rating: 4.9,
      reviewCount: 302,
      trending: true,
      discount: 15,
    },
    {
      id: "p3",
      name: "Sustainable Cotton Tote Bag",
      price: 19.99,
      image:
        "https://images.pexels.com/photos/5632379/pexels-photo-5632379.jpeg?auto=compress&cs=tinysrgb&w=1600",
      category: "Fashion",
      creator: {
        name: "Sophia Chen",
        handle: "sophiadesigns",
        image:
          "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      rating: 4.7,
      reviewCount: 89,
      trending: true,
      discount: null,
    },
    {
      id: "p4",
      name: "Premium Fitness Resistance Bands",
      price: 29.99,
      image:
        "https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=1600",
      category: "Fitness",
      creator: {
        name: "Maya Johnson",
        handle: "mayafitlife",
        image:
          "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      rating: 4.6,
      reviewCount: 156,
      trending: true,
      discount: 20,
    },
  ],
  Fashion: [
    {
      id: "p3",
      name: "Sustainable Cotton Tote Bag",
      price: 19.99,
      image:
        "https://images.pexels.com/photos/5632379/pexels-photo-5632379.jpeg?auto=compress&cs=tinysrgb&w=1600",
      category: "Fashion",
      creator: {
        name: "Sophia Chen",
        handle: "sophiadesigns",
        image:
          "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      rating: 4.7,
      reviewCount: 89,
      trending: true,
      discount: null,
    },
    {
      id: "p5",
      name: "Limited Edition Graphic Tee",
      price: 34.99,
      image:
        "https://images.pexels.com/photos/5709665/pexels-photo-5709665.jpeg?auto=compress&cs=tinysrgb&w=1600",
      category: "Fashion",
      creator: {
        name: "Sophia Chen",
        handle: "sophiadesigns",
        image:
          "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      rating: 4.5,
      reviewCount: 64,
      trending: true,
      discount: null,
    },
  ],
  Tech: [
    {
      id: "p2",
      name: "Wireless Noise-Cancelling Headphones",
      price: 149.99,
      image:
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1600",
      category: "Tech",
      creator: {
        name: "Alex Rivera",
        handle: "techwithalex",
        image:
          "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      rating: 4.9,
      reviewCount: 302,
      trending: true,
      discount: 15,
    },
    {
      id: "p6",
      name: "Portable Smartphone Gimbal",
      price: 89.99,
      image:
        "https://images.pexels.com/photos/4047971/pexels-photo-4047971.jpeg?auto=compress&cs=tinysrgb&w=1600",
      category: "Tech",
      creator: {
        name: "Alex Rivera",
        handle: "techwithalex",
        image:
          "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      rating: 4.8,
      reviewCount: 117,
      trending: true,
      discount: null,
    },
  ],
  Fitness: [
    {
      id: "p4",
      name: "Premium Fitness Resistance Bands",
      price: 29.99,
      image:
        "https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=1600",
      category: "Fitness",
      creator: {
        name: "Maya Johnson",
        handle: "mayafitlife",
        image:
          "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      rating: 4.6,
      reviewCount: 156,
      trending: true,
      discount: 20,
    },
    {
      id: "p7",
      name: "Eco-Friendly Yoga Mat",
      price: 59.99,
      image:
        "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1600",
      category: "Fitness",
      creator: {
        name: "Maya Johnson",
        handle: "mayafitlife",
        image:
          "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      rating: 4.7,
      reviewCount: 93,
      trending: true,
      discount: null,
    },
  ],
  Lifestyle: [
    {
      id: "p1",
      name: "Minimalist Daily Planner",
      price: 24.99,
      image:
        "https://images.pexels.com/photos/733852/pexels-photo-733852.jpeg?auto=compress&cs=tinysrgb&w=1600",
      category: "Lifestyle",
      creator: {
        name: "Emma Lewis",
        handle: "emmacreates",
        image:
          "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      rating: 4.8,
      reviewCount: 124,
      trending: true,
      discount: null,
    },
    {
      id: "p8",
      name: "Artisanal Ceramic Mug Set",
      price: 39.99,
      image:
        "https://images.pexels.com/photos/3690502/pexels-photo-3690502.jpeg?auto=compress&cs=tinysrgb&w=1600",
      category: "Lifestyle",
      creator: {
        name: "Emma Lewis",
        handle: "emmacreates",
        image:
          "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      rating: 4.5,
      reviewCount: 78,
      trending: true,
      discount: 10,
    },
  ],
};

const categories = ["All", "Fashion", "Tech", "Fitness", "Lifestyle"];

export default function TrendingProducts() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoverStates, setHoverStates] = useState<Record<string, boolean>>({});

  const handleProductHover = (productId: string, isHovered: boolean) => {
    setHoverStates((prev) => ({
      ...prev,
      [productId]: isHovered,
    }));
  };

  return (
    <Tabs defaultValue="All" onValueChange={setActiveCategory}>
      <div className="flex justify-between items-center mb-8 w-full overflow-x-auto scrollbar-hide">
        <TabsList className="bg-muted/50 h-auto p-1.5 space-x-2 flex-nowrap whitespace-nowrap">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className={cn(
                "py-2.5 px-4 data-[state=active]:bg-background",
                "data-[state=active]:shadow-sm transition-all text-base flex-shrink-0"
              )}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <Link
          href={`/trending/${activeCategory.toLowerCase()}`}
          className="hidden md:flex items-center text-base text-muted-foreground hover:text-primary transition-colors flex-shrink-0 ml-4"
        >
          <TrendingUp className="mr-2 h-5 w-5" />
          See all trending
        </Link>
      </div>

      {categories.map((category) => (
        <TabsContent key={category} value={category} className="m-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
            {trendingProducts[category as keyof typeof trendingProducts].map(
              (product) => (
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
                          src={product.image}
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

                        <div
                          className={cn(
                            "absolute bottom-4 right-4 transition-opacity duration-300",
                            hoverStates[product.id]
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        >
                          <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-full shadow-sm mr-2 h-12 w-12"
                          >
                            <Heart className="h-5 w-5" />
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
                                {(
                                  product.price *
                                  (1 - product.discount / 100)
                                ).toFixed(2)}
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
              )
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
