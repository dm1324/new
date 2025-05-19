"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Youtube,
  BookText as TikTok,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for featured creators
const featuredCreators = [
  {
    id: "1",
    name: "Sophia Chen",
    handle: "sophiadesigns",
    profileImage:
      "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Fashion",
    followers: "1.2M",
    socialsCount: { instagram: "820K", youtube: "450K", tiktok: "1.2M" },
    verified: true,
    description:
      "Fashion designer and stylist creating sustainable, trendy pieces for the modern woman.",
    productCount: 28,
  },
  {
    id: "2",
    name: "Alex Rivera",
    handle: "techwithalex",
    profileImage:
      "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Tech",
    followers: "875K",
    socialsCount: { youtube: "875K", instagram: "340K", tiktok: "590K" },
    verified: true,
    description:
      "Tech reviewer and gadget enthusiast bringing you honest opinions on the latest innovations.",
    productCount: 15,
  },
  {
    id: "3",
    name: "Maya Johnson",
    handle: "mayafitlife",
    profileImage:
      "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Fitness",
    followers: "650K",
    socialsCount: { instagram: "650K", youtube: "220K", tiktok: "780K" },
    verified: true,
    description:
      "Certified personal trainer helping you achieve your fitness goals with effective workouts and nutrition tips.",
    productCount: 32,
  },
  {
    id: "4",
    name: "Raj Patel",
    handle: "rajcooking",
    profileImage:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Cooking",
    followers: "920K",
    socialsCount: { youtube: "920K", instagram: "540K", tiktok: "1.1M" },
    verified: true,
    description:
      "Chef and culinary expert sharing authentic recipes and kitchen gadgets for home cooks of all levels.",
    productCount: 21,
  },
  {
    id: "5",
    name: "Emma Lewis",
    handle: "emmacreates",
    profileImage:
      "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Art & Design",
    followers: "780K",
    socialsCount: { instagram: "780K", youtube: "320K", tiktok: "550K" },
    verified: true,
    description:
      "Digital artist and illustrator designing custom artwork and sharing creative tutorials.",
    productCount: 17,
  },
];

export default function CreatorHighlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const isManualScrolling = useRef(false);

  // Modified to avoid auto-scrolling when the component mounts
  useEffect(() => {
    // Disable browser scroll restoration
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Set up the auto-scroll interval only after a delay
    const initialDelay = setTimeout(() => {
      autoScrollRef.current = setInterval(() => {
        if (!isManualScrolling.current) {
          const nextIndex = (activeIndex + 1) % featuredCreators.length;
          updateActiveIndex(nextIndex);
        }
      }, 8000);
    }, 1000);

    return () => {
      clearTimeout(initialDelay);
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [activeIndex]);

  // Separate function to update active index without forcing scroll
  const updateActiveIndex = (index: number) => {
    setActiveIndex(index);
  };

  // Scroll only when manually triggered
  // In creator-highlight.tsx
  const scrollToCreator = (index: number) => {
    setActiveIndex(index);
    if (scrollContainerRef.current) {
      const cards =
        scrollContainerRef.current.querySelectorAll(".creator-card");
      if (cards[index]) {
        // Add behavior: 'auto' to prevent smooth scrolling that might affect the page
        cards[index].scrollIntoView({
          behavior: "auto", // Changed from 'smooth' to 'auto'
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  const nextCreator = () => {
    const nextIndex = (activeIndex + 1) % featuredCreators.length;
    scrollToCreator(nextIndex);
  };

  const prevCreator = () => {
    const prevIndex =
      (activeIndex - 1 + featuredCreators.length) % featuredCreators.length;
    scrollToCreator(prevIndex);
  };

  // Handle container scroll events to update active index based on visible cards
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current || isManualScrolling.current) return;

      const container = scrollContainerRef.current;
      const containerCenter = container.offsetLeft + container.offsetWidth / 2;
      const cards = container.querySelectorAll(".creator-card");

      let closestCard = 0;
      let minDistance = Infinity;

      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        const cardCenter = cardElement.offsetLeft + cardElement.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestCard = index;
        }
      });

      if (closestCard !== activeIndex) {
        updateActiveIndex(closestCard);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [activeIndex]);

  return (
    <div className="relative w-full">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-6">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-md bg-background h-12 w-12 hidden md:flex"
          onClick={prevCreator}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-6">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-md bg-background h-12 w-12 hidden md:flex"
          onClick={nextCreator}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory w-full px-4 md:px-0"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollSnapType: "x mandatory",
        }}
      >
        {featuredCreators.map((creator, index) => (
          <div
            key={creator.id}
            className={cn(
              "creator-card flex-shrink-0 snap-center px-2 w-[85vw] md:w-1/2 lg:w-1/3 transition-opacity duration-300",
              index === activeIndex
                ? "opacity-100"
                : "opacity-50 hover:opacity-80"
            )}
            onClick={() => scrollToCreator(index)}
            style={{ scrollSnapAlign: "center" }}
          >
            <Card className="overflow-hidden border-border/50 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
              <CardContent className="p-0">
                <div className="relative aspect-[16/7] bg-muted">
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
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-16 pb-8 px-8 text-center">
                  <h3 className="font-bold text-2xl mb-1">{creator.name}</h3>
                  <p className="text-muted-foreground text-lg">
                    @{creator.handle}
                  </p>

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
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-2 mt-6 md:hidden">
        {featuredCreators.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCreator(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === activeIndex ? "bg-primary w-8" : "bg-primary/30"
            )}
            aria-label={`View creator ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
