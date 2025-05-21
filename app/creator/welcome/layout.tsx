export const dynamic = "force-dynamic";
export const runtime = "edge";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to CreatorMarket | Creator Portal",
  description:
    "Access your creator dashboard and manage your products on CreatorMarket",
};

// This special layout completely replaces the root layout
export default function CreatorWelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
