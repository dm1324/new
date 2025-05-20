// app/products/[id]/page.tsx
"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  ShoppingCart,
  Heart,
  ChevronLeft,
  ChevronRight,
  Tag,
} from "lucide-react";
import { products } from "@/lib/data";
import { useCartStore } from "@/lib/store";
import { useWishlistStore } from "@/lib/store/wishlist";
import ProductGrid from "@/components/products/product-grid";
import { cn } from "@/lib/utils";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  const { addItem: addToCart } = useCartStore();
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const specifications = {
    Category: product.category,
    Brand: "Premium Collection",
    "Made by": `@${product.creator.handle}`,
    Rating: `${product.rating} (${product.reviewCount} reviews)`,
    ...(product.specifications || {}),
  };

  const nextImage = () => {
    setIsImageTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      setIsImageTransitioning(false);
    }, 300);
  };

  const prevImage = () => {
    setIsImageTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
      setIsImageTransitioning(false);
    }, 300);
  };

  const handleWishlistClick = () => {
    if (isInWishlist(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product.id);
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
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <Image
              src={product.images[currentImageIndex]}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-opacity duration-300",
                isImageTransitioning ? "opacity-0" : "opacity-100"
              )}
            />

            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {product.tags && product.tags.length > 0 && (
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className={cn(
                      "text-sm py-1 px-3 rounded-full flex items-center gap-1.5 transition-colors",
                      getTagStyle(tag)
                    )}
                  >
                    <Tag className="h-3.5 w-3.5" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={cn(
                  "relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2",
                  currentImageIndex === index
                    ? "border-primary"
                    : "border-transparent"
                )}
                onClick={() => {
                  setIsImageTransitioning(true);
                  setTimeout(() => {
                    setCurrentImageIndex(index);
                    setIsImageTransitioning(false);
                  }, 300);
                }}
              >
                <Image
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="secondary">{product.category}</Badge>
            {product.discount && (
              <Badge variant="destructive">{product.discount}% OFF</Badge>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {product.tags.map((tag) => (
                <Badge
                  key={tag}
                  className={cn(
                    "text-sm py-1 px-3 flex items-center gap-1.5 transition-colors",
                    getTagStyle(tag)
                  )}
                >
                  <Tag className="h-3.5 w-3.5" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-1.5 font-medium">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">
              {product.reviewCount} reviews
            </span>
          </div>

          <div className="mb-8">
            {product.discount ? (
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex gap-4 mb-12">
            <Button
              size="lg"
              className="flex-1"
              onClick={() => addToCart(product.id)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant={isInWishlist(product.id) ? "default" : "outline"}
              onClick={handleWishlistClick}
            >
              <Heart
                className="h-5 w-5 mr-2"
                fill={isInWishlist(product.id) ? "currentColor" : "none"}
              />
              {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
            </Button>
          </div>

          <Tabs defaultValue="description" className="space-y-8">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="text-muted-foreground">
              {product.description || "No description available."}
            </TabsContent>

            <TabsContent value="specifications">
              <dl className="space-y-4">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex border-b pb-4">
                    <dt className="w-1/3 font-medium">{key}</dt>
                    <dd className="w-2/3 text-muted-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </TabsContent>

            <TabsContent
              value="shipping"
              className="space-y-4 text-muted-foreground"
            >
              <p>Free shipping on orders over $50</p>
              <p>Standard delivery: 3-5 business days</p>
              <p>Express delivery: 1-2 business days</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-2xl font-bold mb-8">Related Products</h2>
        <ProductGrid products={relatedProducts} />
      </div>
    </div>
  );
}
