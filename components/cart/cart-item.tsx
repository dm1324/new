"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/lib/types";

interface CartItemProps {
  product: Product;
  quantity: number;
}

export default function CartItem({ product, quantity }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  
  const price = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;
  
  const total = price * quantity;

  return (
    <div className="flex gap-4 py-4">
      <div className="relative h-24 w-24 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="flex-1">
        <Link
          href={`/products/${product.id}`}
          className="font-medium hover:text-primary transition-colors"
        >
          {product.name}
        </Link>
        
        <div className="text-sm text-muted-foreground mt-1">
          <Link
            href={`/creators/${product.creator.handle}`}
            className="hover:text-foreground transition-colors"
          >
            @{product.creator.handle}
          </Link>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-medium">${total.toFixed(2)}</div>
              {product.discount && (
                <div className="text-sm text-muted-foreground line-through">
                  ${(product.price * quantity).toFixed(2)}
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => removeItem(product.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}