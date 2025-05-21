"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Instagram, Youtube, BookText as TikTok, Heart, Share2, ArrowLeft } from "lucide-react";
import ProductGrid from "@/components/products/product-grid";
import { featuredCreators, products } from "@/lib/data";
import Link from "next/link";

export default function CreatorShopPage({
  params,
}: {
  params: { handle: string };
}) {
  const creator = featuredCreators.find((c) => c.handle === params.handle);

  if (!creator) {
    notFound();
  }

  const creatorProducts = products.filter(
    (product) => product.creator.handle === creator.handle
  );

  const filterTags = ["Self Made", "Resale", "Limited Edition", "Sponsored", "Luxury", "Sustainable"];

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <div className="relative h-[400px] w-full">
        <Image
          src={creator.coverImage || creator.profileImage}
          alt={creator.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-4 left-4">
          <Button variant="ghost" className="text-white hover:text-white/80" asChild>
            <Link href="/creators">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Storefronts
            </Link>
          </Button>
        </div>
      </div>

      {/* Creator Info */}
      <div className="max-w-6xl mx-auto px-4 -mt-32 relative z-10">
        <div className="bg-background rounded-xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-background">
              <Image
                src={creator.profileImage}
                alt={creator.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start mb-4">
                <Badge variant="secondary" className="text-sm py-1.5">
                  {creator.category}
                </Badge>
                {creator.verified && (
                  <Badge variant="default" className="text-sm py-1.5">
                    Verified Creator
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-serif font-bold mb-2">{creator.name}</h1>
              <p className="text-xl text-muted-foreground">@{creator.handle}</p>

              <div className="mt-6 flex flex-wrap gap-8 justify-center md:justify-start text-muted-foreground">
                <div>
                  <span className="text-2xl font-serif font-semibold">{creator.followers}</span>
                  <p className="text-sm">Followers</p>
                </div>
                <div>
                  <span className="text-2xl font-serif font-semibold">{creator.socialsCount.instagram}</span>
                  <p className="text-sm">Instagram</p>
                </div>
                <div>
                  <span className="text-2xl font-serif font-semibold">{creator.socialsCount.youtube}</span>
                  <p className="text-sm">YouTube</p>
                </div>
                <div>
                  <span className="text-2xl font-serif font-semibold">{creator.socialsCount.tiktok}</span>
                  <p className="text-sm">TikTok</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Tabs defaultValue="shop" className="space-y-8">
          <TabsList className="border-b w-full justify-center space-x-8 bg-transparent h-auto p-0">
            <TabsTrigger 
              value="shop" 
              className="font-serif text-lg border-b-2 border-transparent data-[state=active]:border-primary bg-transparent py-4 px-1"
            >
              Shop
            </TabsTrigger>
            <TabsTrigger 
              value="about" 
              className="font-serif text-lg border-b-2 border-transparent data-[state=active]:border-primary bg-transparent py-4 px-1"
            >
              About
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="font-serif text-lg border-b-2 border-transparent data-[state=active]:border-primary bg-transparent py-4 px-1"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shop">
            <div className="flex flex-wrap justify-center gap-4 my-8">
              {filterTags.map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  className="rounded-full font-serif"
                >
                  {tag}
                </Button>
              ))}
            </div>

            <ProductGrid products={creatorProducts} />
          </TabsContent>

          <TabsContent value="about">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-serif font-bold mb-6">About {creator.name}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {creator.description}
              </p>

              <div className="my-8 border-t border-b py-8">
                <h3 className="text-2xl font-serif font-bold mb-4">Social Media</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" className="gap-2">
                    <Instagram className="h-5 w-5" />
                    Instagram
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Youtube className="h-5 w-5" />
                    YouTube
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <TikTok className="h-5 w-5" />
                    TikTok
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="max-w-3xl mx-auto text-center py-12">
              <p className="text-lg text-muted-foreground italic">
                Reviews are coming soon.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}