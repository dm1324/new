"use client";

import { notFound } from "next/navigation";
import { categories, featuredCreators } from "@/lib/data";
import CreatorGrid from "@/components/creators/creator-grid";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }
  
  const categoryCreators = featuredCreators.filter(
    (creator) => creator.category === category.name
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-bold mb-4">{category.name} Creators</h1>
        <p className="text-lg text-muted-foreground">
          Discover talented creators in the {category.name.toLowerCase()} space and shop their curated collections.
        </p>
      </div>
      
      <CreatorGrid creators={categoryCreators} />
    </div>
  );
}