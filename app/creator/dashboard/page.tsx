"use client";

import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package2, Users, DollarSign, Star, ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CreatorDashboard() {
  const { user } = useAuth();

  if (!user || user.role !== "creator") {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-8">
            Please log in as a creator to view this page.
          </p>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  const recentProducts = [
    {
      id: "1",
      name: "Handcrafted Wood Cutting Board",
      price: 65.00,
      image: "https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg",
      soldCount: 12
    },
    {
      id: "2",
      name: "Ceramic Coffee Mug Set",
      price: 36.00,
      image: "https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg",
      soldCount: 8
    },
    {
      id: "3",
      name: "Digital Illustration Art Print",
      price: 45.00,
      image: "https://images.pexels.com/photos/3705944/pexels-photo-3705944.jpeg",
      soldCount: 15
    }
  ];

  const recentOrders = [
    {
      id: "ORD-3942",
      date: "Jun 12, 2025",
      customer: "Alex Johnson",
      amount: 129.99,
      status: "Shipped"
    },
    {
      id: "ORD-3941",
      date: "Jun 11, 2025",
      customer: "Sarah Williams",
      amount: 65.00,
      status: "Processing"
    },
    {
      id: "ORD-3940",
      date: "Jun 10, 2025",
      customer: "Michael Brown",
      amount: 24.99,
      status: "Delivered"
    },
    {
      id: "ORD-3939",
      date: "Jun 9, 2025",
      customer: "Emma Davis",
      amount: 72.50,
      status: "Delivered"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link href="/creator/profile">
              Edit Profile
            </Link>
          </Button>
          <Button asChild>
            <Link href="/creator/products/new">
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Package2 className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm text-emerald-600 flex items-center">
                +12% <ArrowUpRight className="h-4 w-4 ml-1" />
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Orders</p>
            <h2 className="text-3xl font-bold">24</h2>
            <p className="text-sm text-muted-foreground mt-1">vs. last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm text-emerald-600 flex items-center">
                +18% <ArrowUpRight className="h-4 w-4 ml-1" />
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Revenue</p>
            <h2 className="text-3xl font-bold">$1,280</h2>
            <p className="text-sm text-muted-foreground mt-1">vs. last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm text-emerald-600 flex items-center">
                +5% <ArrowUpRight className="h-4 w-4 ml-1" />
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Followers</p>
            <h2 className="text-3xl font-bold">345</h2>
            <p className="text-sm text-muted-foreground mt-1">vs. last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm text-emerald-600 flex items-center">
                +0.2 <ArrowUpRight className="h-4 w-4 ml-1" />
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Avg. Rating</p>
            <h2 className="text-3xl font-bold">4.8</h2>
            <p className="text-sm text-muted-foreground mt-1">vs. last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Products</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm" asChild>
              <Link href="/creator/products">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{product.soldCount}</p>
                    <p className="text-sm text-muted-foreground">sold</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm" asChild>
              <Link href="/creator/orders">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium">{order.id}</h3>
                      <span className="text-xs text-muted-foreground">{order.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${order.amount.toFixed(2)}</p>
                    <p className={`text-xs ${
                      order.status === "Delivered" ? "text-green-600" :
                      order.status === "Shipped" ? "text-blue-600" :
                      "text-orange-600"
                    }`}>{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}