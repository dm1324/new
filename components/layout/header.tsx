"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import CartSheet from "@/components/cart/cart-sheet";
import { useAuth } from "@/lib/auth-context";
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const dashboardLink =
    user?.role === "creator" ? "/creator/dashboard" : "/account/dashboard";

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
        <div className="flex h-16 items-center justify-between lg:justify-around">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold text-xl lg:text-2xl">
              CreatorMarket
            </Link>
          </div>

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
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative w-60">
              <Input
                type="text"
                placeholder="Search products..."
                className="pr-8 h-9"
              />
              <Search className="absolute right-2.5 top-2 h-5 w-5 text-muted-foreground" />
            </div>

            <CartSheet />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={dashboardLink}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/addresses">Saved Addresses</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" asChild>
                <Link href="/login">Get Started</Link>
              </Button>
            )}

            <ModeToggle />
          </div>

          <div className="flex lg:hidden items-center space-x-2">
            <CartSheet />

            {user ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex items-center justify-between pt-4 px-1">
                    <SheetTitle>Menu</SheetTitle>
                    <ModeToggle />
                  </div>

                  <div className="mt-8 space-y-4">
                    <Link href={dashboardLink}>
                      <Button variant="ghost" className="w-full justify-start">
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/account/orders">
                      <Button variant="ghost" className="w-full justify-start">
                        Orders
                      </Button>
                    </Link>
                    <Link href="/account/wishlist">
                      <Button variant="ghost" className="w-full justify-start">
                        Wishlist
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      Log Out
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <Button variant="default" size="sm" asChild>
                <Link href="/login">Get Started</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="lg:hidden border-t">
        <div className="container mx-auto px-4 py-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="pr-8 h-9"
            />
            <Search className="absolute right-2.5 top-2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
