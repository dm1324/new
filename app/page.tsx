"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import CreatorHighlight from "@/components/home/creator-highlight";
import CategorySection from "@/components/home/category-section";
import TrendingProducts from "@/components/home/trending-products";
import HeroSection from "@/components/home/hero-section";
import Link from "next/link";

export default function Home() {
  // Fix viewport/zoom issues on mobile
  useEffect(() => {
    // Add meta viewport tag programmatically
    const viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    viewportMeta.content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";

    // Check if viewport meta already exists
    const existingViewport = document.querySelector('meta[name="viewport"]');
    if (existingViewport) {
      existingViewport.remove();
    }

    document.head.appendChild(viewportMeta);

    // Disable scroll restoration to prevent auto-scrolling issues
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    return () => {
      // Optional: remove the meta tag when component unmounts
      // In practice, this won't happen for the homepage
    };
  }, []);

  return (
    <div className="flex flex-col w-full max-w-[100vw] overflow-x-hidden">
      <HeroSection />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
          <Link
            href="/categories"
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          >
            View all
            <ChevronsRight className="h-4 w-4" />
          </Link>
        </div>
        <CategorySection />
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16 bg-muted/50">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Creators</h2>
          <Link
            href="/creators"
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          >
            Explore all creators
            <ChevronsRight className="h-4 w-4" />
          </Link>
        </div>
        <CreatorHighlight />
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Trending Products</h2>
          <Link
            href="/products"
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          >
            See all products
            <ChevronsRight className="h-4 w-4" />
          </Link>
        </div>
        <TrendingProducts />
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Are you a creator?
          </h2>
          <p className="mb-6 text-primary-foreground/80">
            Join our platform to create your own shop, connect with your
            audience, and start selling your products with zero hassle.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/creator/info">Become a Creator</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
