import { Shirt, Dumbbell, Laptop, ShoppingBasket, Camera, Briefcase, Music as MusicNote, ShoppingBag } from "lucide-react";
import type { Creator, Product } from "./types";

export const categories = [
  {
    name: "Fashion",
    icon: Shirt,
    color: "bg-red-500",
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1",
    slug: "fashion"
  },
  {
    name: "Fitness",
    icon: Dumbbell,
    color: "bg-blue-500",
    image: "https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1",
    slug: "fitness"
  },
  {
    name: "Tech",
    icon: Laptop,
    color: "bg-purple-500",
    image: "https://images.pexels.com/photos/3739418/pexels-photo-3739418.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1",
    slug: "tech"
  },
  {
    name: "Beauty",
    icon: ShoppingBasket,
    color: "bg-pink-500",
    image: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1",
    slug: "beauty"
  },
  {
    name: "Photography",
    icon: Camera,
    color: "bg-amber-500",
    image: "https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1",
    slug: "photography"
  },
  {
    name: "Business",
    icon: Briefcase,
    color: "bg-green-500",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1",
    slug: "business"
  },
  {
    name: "Music",
    icon: MusicNote,
    color: "bg-orange-500",
    image: "https://images.pexels.com/photos/4571219/pexels-photo-4571219.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1",
    slug: "music"
  },
  {
    name: "All Categories",
    icon: ShoppingBag,
    color: "bg-gray-500",
    image: "https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1",
    slug: "all"
  }
];

export const featuredCreators: Creator[] = [
  {
    id: "1",
    name: "Sophia Chen",
    handle: "sophiadesigns",
    profileImage: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Fashion",
    followers: "1.2M",
    socialsCount: { instagram: "820K", youtube: "450K", tiktok: "1.2M" },
    verified: true,
    description: "Fashion designer and stylist creating sustainable, trendy pieces for the modern woman.",
    productCount: 28
  },
  {
    id: "2",
    name: "Alex Rivera",
    handle: "techwithalex",
    profileImage: "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Tech",
    followers: "875K",
    socialsCount: { youtube: "875K", instagram: "340K", tiktok: "590K" },
    verified: true,
    description: "Tech reviewer and gadget enthusiast bringing you honest opinions on the latest innovations.",
    productCount: 15
  },
  {
    id: "3",
    name: "Maya Johnson",
    handle: "mayafitlife",
    profileImage: "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Fitness",
    followers: "650K",
    socialsCount: { instagram: "650K", youtube: "220K", tiktok: "780K" },
    verified: true,
    description: "Certified personal trainer helping you achieve your fitness goals with effective workouts and nutrition tips.",
    productCount: 32
  },
  {
    id: "4",
    name: "Raj Patel",
    handle: "rajcooking",
    profileImage: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Business",
    followers: "920K",
    socialsCount: { youtube: "920K", instagram: "540K", tiktok: "1.1M" },
    verified: true,
    description: "Chef and culinary expert sharing authentic recipes and kitchen gadgets for home cooks of all levels.",
    productCount: 21
  },
  {
    id: "5",
    name: "Emma Lewis",
    handle: "emmacreates",
    profileImage: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Photography",
    followers: "780K",
    socialsCount: { instagram: "780K", youtube: "320K", tiktok: "550K" },
    verified: true,
    description: "Digital artist and illustrator designing custom artwork and sharing creative tutorials.",
    productCount: 17
  }
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Minimalist Daily Planner",
    price: 24.99,
    image: "https://images.pexels.com/photos/733852/pexels-photo-733852.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Lifestyle",
    creator: {
      name: "Emma Lewis",
      handle: "emmacreates",
      image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    rating: 4.8,
    reviewCount: 124,
    trending: true,
    discount: null
  },
  {
    id: "p2",
    name: "Wireless Noise-Cancelling Headphones",
    price: 149.99,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Tech",
    creator: {
      name: "Alex Rivera",
      handle: "techwithalex",
      image: "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    rating: 4.9,
    reviewCount: 302,
    trending: true,
    discount: 15
  },
  {
    id: "p3",
    name: "Sustainable Cotton Tote Bag",
    price: 19.99,
    image: "https://images.pexels.com/photos/5632379/pexels-photo-5632379.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Fashion",
    creator: {
      name: "Sophia Chen",
      handle: "sophiadesigns",
      image: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    rating: 4.7,
    reviewCount: 89,
    trending: true,
    discount: null
  },
  {
    id: "p4",
    name: "Premium Fitness Resistance Bands",
    price: 29.99,
    image: "https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=1600",
    category: "Fitness",
    creator: {
      name: "Maya Johnson",
      handle: "mayafitlife",
      image: "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    rating: 4.6,
    reviewCount: 156,
    trending: true,
    discount: 20
  }
];