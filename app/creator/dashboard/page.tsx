"use client";

import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package2, Users, DollarSign, TrendingUp, Settings } from "lucide-react";
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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
          <div className="w-full md:w-1/3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image
                      src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">@{user.creatorProfile?.handle}</p>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <Button className="w-full" asChild>
                    <Link href="/creator/profile">
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/creators/${user.creatorProfile?.handle}`}>
                      View Shop
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Package2 className="mr-2 h-5 w-5 text-primary" />
                    Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Active listings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Followers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{user.creatorProfile?.followers || 0}</p>
                  <p className="text-sm text-muted-foreground">Total followers</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <DollarSign className="mr-2 h-5 w-5 text-primary" />
                    Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$0.00</p>
                  <p className="text-sm text-muted-foreground">Total earnings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                    Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Total orders</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>No recent activity</p>
                  <Button className="mt-4" asChild>
                    <Link href="/creator/products/new">Add Your First Product</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}