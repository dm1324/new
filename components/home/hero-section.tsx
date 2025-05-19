"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ShoppingBag, Users } from "lucide-react";

const heroBackgrounds = [
  {
    imageSrc:
      "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Fashion",
    title: "Fashion Forward",
    description:
      "Shop the latest trends curated by your favorite fashion creators",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Fitness",
    title: "Power Your Passion",
    description: "Premium fitness gear recommended by top fitness influencers",
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/3739418/pexels-photo-3739418.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Tech",
    title: "Tech That Inspires",
    description: "Discover cutting-edge gadgets trusted by tech experts",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  // Auto-rotate backgrounds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroBackgrounds.length);
        setIsChanging(false);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentHero = heroBackgrounds[current];

  return (
    <section className="relative h-[80vh] min-h-[400px] max-h-[800px] overflow-hidden">
      {/* Background image */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-1000",
          isChanging ? "opacity-0" : "opacity-100"
        )}
        style={{
          backgroundImage: `url(${currentHero.imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent dark:from-background dark:via-background/80" />

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-16 md:pb-24">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">
            {currentHero.category}
          </span>
          <h1
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-500",
              isChanging
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            )}
          >
            {currentHero.title}
          </h1>
          <p
            className={cn(
              "text-lg md:text-xl text-muted-foreground mb-8 max-w-xl transition-all duration-500 delay-100",
              isChanging
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            )}
          >
            {currentHero.description}
          </p>
          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 transition-all duration-500 delay-200",
              isChanging
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            )}
          >
            <Button size="lg" asChild>
              <Link href="/categories">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop by Category
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/creators">
                <Users className="mr-2 h-5 w-5" />
                Explore Creators
              </Link>
            </Button>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroBackgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsChanging(true);
                setTimeout(() => {
                  setCurrent(index);
                  setIsChanging(false);
                }, 500);
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                current === index
                  ? "bg-primary w-8"
                  : "bg-primary/30 hover:bg-primary/50"
              )}
              aria-label={`View ${heroBackgrounds[index].category} hero section`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
