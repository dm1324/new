"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import CartSheet from "@/components/cart/cart-sheet";
import {
  User,
  Heart,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const categories = [
  { name: "Fashion", href: "/categories/fashion" },
  { name: "Tech", href: "/categories/tech" },
  { name: "Fitness", href: "/categories/fitness" },
  { name: "Beauty", href: "/categories/beauty" },
  { name: "Photography", href: "/categories/photography" },
  { name: "Business", href: "/categories/business" },
  { name: "Music", href: "/categories/music" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for logged in status
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check if user is logged in
    const checkLoginStatus = () => {
      // Replace this with your actual auth logic
      const token = localStorage.getItem("auth-token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200 ease-in-out",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center space-x-4 md:space-x-8">
            <Link
              href="/"
              className="flex items-center font-bold text-xl md:text-2xl"
            >
              CreatorMarket
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-base">
                    Categories
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.name} asChild>
                      <Link href={category.href}>{category.name}</Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/categories">View All Categories</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" className="text-base" asChild>
                <Link href="/creators">Creators</Link>
              </Button>
              <Button variant="ghost" className="text-base" asChild>
                <Link href="/trending">Trending</Link>
              </Button>
              <Button variant="ghost" className="text-base" asChild>
                <Link href="/deals">Deals</Link>
              </Button>
            </nav>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative w-60">
              <Input
                type="text"
                placeholder="Search products..."
                className="pr-8 h-9 w-full"
              />
              <Search className="absolute right-2.5 top-2 h-5 w-5 text-muted-foreground" />
            </div>

            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Heart className="h-5 w-5" />
            </Button>

            <CartSheet />

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      localStorage.removeItem("auth-token");
                      setIsLoggedIn(false);
                    }}
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            )}

            <ModeToggle />
          </div>

          <div className="flex items-center space-x-2 lg:hidden">
            {!isLoggedIn && (
              <Button variant="default" size="sm" asChild className="mr-1">
                <Link href="/signup">Get Started</Link>
              </Button>
            )}
            <CartSheet />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-b w-full">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="pr-8 h-10 w-full"
              />
              <Search className="absolute right-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>

            <nav className="grid gap-4">
              <Collapsible
                open={categoryOpen}
                onOpenChange={setCategoryOpen}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-between w-full h-12 text-base"
                  >
                    Categories
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        categoryOpen ? "rotate-180" : ""
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2 pl-4">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="py-2 border-t first:border-t-0"
                    >
                      <Link
                        href={category.href}
                        className="flex items-center text-sm hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <ChevronRight className="mr-2 h-4 w-4" />
                        {category.name}
                      </Link>
                    </div>
                  ))}
                  <div className="py-2 border-t">
                    <Link
                      href="/categories"
                      className="flex items-center text-sm font-medium hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View All Categories
                    </Link>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Button
                variant="outline"
                className="justify-start h-12 text-base"
                asChild
              >
                <Link href="/creators">Creators</Link>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-12 text-base"
                asChild
              >
                <Link href="/trending">Trending</Link>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-12 text-base"
                asChild
              >
                <Link href="/deals">Deals</Link>
              </Button>
            </nav>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 flex-1 mr-2"
              >
                <Heart className="h-5 w-5" />
              </Button>
              {isLoggedIn && (
                <Link href="/account/dashboard" className="flex-1 mr-2">
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}
              <div className="h-12 w-12 flex-1 flex items-center justify-center">
                <ModeToggle />
              </div>
            </div>

            {!isLoggedIn && (
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" size="lg" className="h-12" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button variant="secondary" size="lg" className="h-12" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
            {isLoggedIn && (
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  setIsLoggedIn(false);
                }}
              >
                Log Out
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
