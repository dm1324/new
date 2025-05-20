// app/account/wishlist/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useCartStore } from "@/lib/store";
import { products } from "@/lib/data";

export default function WishlistPage() {
  const { items, removeItem, moveToCart, clearWishlist, isInWishlist } =
    useWishlistStore();
  const { addItem } = useCartStore();

  const wishlistProducts = products.filter((product) =>
    items.includes(product.id)
  );

  const handleMoveToCart = (productId: string) => {
    addItem(productId);
    removeItem(productId);
  };

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Wishlist</h1>
        {items.length > 0 && (
          <Button variant="outline" onClick={clearWishlist}>
            Clear All
          </Button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Save your favorite items here for later
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden h-full flex flex-col"
            >
              <CardContent className="p-0 relative">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={() => removeItem(product.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4 flex-1">
                <Link
                  href={`/products/${product.id}`}
                  className="font-medium hover:underline mb-2"
                >
                  {product.name}
                </Link>
                <div className="flex items-center justify-between w-full mt-auto">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  <Button
                    size="sm"
                    onClick={() => handleMoveToCart(product.id)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Move to Cart
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
