"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { categories } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

export default function CategorySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">
      {categories.map((category, index) => (
        <Link
          key={category.name}
          href={`/categories/${category.slug}`}
          className="relative block"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Card className="h-full overflow-hidden border-none group">
            <CardContent className="p-0 relative h-56 lg:h-64">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center justify-center text-white",
                  "transform transition-transform duration-300 group-hover:-translate-y-2"
                )}
              >
                {hoveredIndex === index ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-lg">Explore</span>
                    <ShoppingBag className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <div
                    className={cn(
                      "h-12 w-12 rounded-full flex items-center justify-center mb-3",
                      category.color
                    )}
                  >
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                )}
                <h3 className="font-semibold text-xl">{category.name}</h3>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
