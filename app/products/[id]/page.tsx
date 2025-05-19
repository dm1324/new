"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { products } from "@/lib/data";
import { useCartStore } from "@/lib/store";
import ProductGrid from "@/components/products/product-grid";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  const { addItem } = useCartStore();
  
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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="secondary">{product.category}</Badge>
            {product.discount && (
              <Badge variant="destructive">{product.discount}% OFF</Badge>
            )}
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
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
            <Button size="lg" className="flex-1" onClick={() => addItem(product.id)}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-5 w-5" />
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
            
            <TabsContent value="shipping" className="space-y-4 text-muted-foreground">
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