import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Instagram, Youtube, BookText as TikTok } from "lucide-react";
import ProductGrid from "@/components/products/product-grid";
import { featuredCreators, products } from "@/lib/data";

export default function CreatorShopPage({ params }: { params: { handle: string } }) {
  const creator = featuredCreators.find((c) => c.handle === params.handle);
  
  if (!creator) {
    notFound();
  }
  
  const creatorProducts = products.filter(
    (product) => product.creator.handle === creator.handle
  );

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container mx-auto px-4 h-full flex items-end pb-12 relative">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-12">
            <div className="relative h-32 w-32 md:h-48 md:w-48 rounded-xl overflow-hidden border-4 border-background">
              <Image
                src={creator.profileImage}
                alt={creator.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="text-sm py-1.5">
                  {creator.category}
                </Badge>
                {creator.verified && (
                  <Badge variant="default" className="text-sm py-1.5">
                    Verified Creator
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl font-bold mb-2">{creator.name}</h1>
              <p className="text-xl text-muted-foreground mb-6">@{creator.handle}</p>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center text-muted-foreground">
                  <Instagram className="h-5 w-5 mr-2" />
                  <span>{creator.socialsCount.instagram}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Youtube className="h-5 w-5 mr-2" />
                  <span>{creator.socialsCount.youtube}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <TikTok className="h-5 w-5 mr-2" />
                  <span>{creator.socialsCount.tiktok}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="shop" className="space-y-8">
          <TabsList className="bg-muted/50 h-12 p-1 space-x-2">
            <TabsTrigger value="shop" className="text-base px-6">
              Shop
            </TabsTrigger>
            <TabsTrigger value="about" className="text-base px-6">
              About
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="shop" className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted/30 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold mb-1">{creatorProducts.length}</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="bg-muted/30 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold mb-1">4.9</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
              <div className="bg-muted/30 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold mb-1">2.5k+</div>
                <div className="text-sm text-muted-foreground">Orders</div>
              </div>
              <div className="bg-muted/30 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold mb-1">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
            
            <ProductGrid products={creatorProducts} />
          </TabsContent>
          
          <TabsContent value="about">
            <div className="max-w-3xl space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">About {creator.name}</h2>
                <p className="text-lg text-muted-foreground">{creator.description}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Connect with {creator.name}</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Instagram className="h-5 w-5" />
                    Instagram
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2">
                    <Youtube className="h-5 w-5" />
                    YouTube
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2">
                    <TikTok className="h-5 w-5" />
                    TikTok
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}