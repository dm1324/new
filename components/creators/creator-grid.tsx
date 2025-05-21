import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingBag,
  Instagram,
  Youtube,
  BookText as TikTok,
} from "lucide-react";
import { type Creator } from "@/lib/types";

interface CreatorGridProps {
  creators: Creator[];
}

export default function CreatorGrid({ creators }: CreatorGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {creators.map((creator) => (
        <Card
          key={creator.id}
          className="overflow-hidden border-border/50 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
        >
          <CardContent className="p-0">
            <div className="relative aspect-[16/7] bg-muted">
              {/* Added cover image here */}
              <Image
                src={creator.coverImage || creator.profileImage}
                alt={`${creator.name} banner`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10" />
              <div className="absolute top-6 left-6 z-20 flex items-center space-x-3">
                <Badge
                  variant="secondary"
                  className="bg-background/80 backdrop-blur-sm text-sm py-1.5"
                >
                  {creator.category}
                </Badge>
                {creator.verified && (
                  <Badge
                    variant="outline"
                    className="bg-primary text-primary-foreground border-none text-sm py-1.5"
                  >
                    Verified
                  </Badge>
                )}
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
                <div className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-background">
                  <Image
                    src={creator.profileImage}
                    alt={creator.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="pt-16 pb-8 px-8 text-center">
              <h3 className="font-bold text-2xl mb-1">{creator.name}</h3>
              <p className="text-muted-foreground text-lg">@{creator.handle}</p>

              <div className="flex justify-center space-x-8 mt-4">
                <div className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">
                    {creator.socialsCount.instagram}
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <Youtube className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">
                    {creator.socialsCount.youtube}
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <TikTok className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">
                    {creator.socialsCount.tiktok}
                  </span>
                </div>
              </div>

              <p className="mt-6 text-base text-muted-foreground line-clamp-2 mb-6">
                {creator.description}
              </p>

              <div className="mt-6">
                <Button size="lg" asChild className="w-full">
                  <Link href={`/creators/${creator.handle}`}>
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Visit Shop ({creator.productCount} Products)
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
