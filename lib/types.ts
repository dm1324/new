export interface Creator {
  id: string;
  name: string;
  handle: string;
  profileImage: string;
  coverImage?: string;
  category: string;
  followers: string;
  socialsCount: {
    instagram: string;
    youtube: string;
    tiktok: string;
  };
  verified: boolean;
  description: string;
  productCount: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  creator: {
    name: string;
    handle: string;
    image: string;
  };
  rating: number;
  reviewCount: number;
  trending: boolean;
  discount: number | null;
  description?: string;
  specifications?: {
    [key: string]: string;
  };
  tags?: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface Address {
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "creator";
  avatar?: string;
  addresses?: Address[];
  creatorProfile?: {
    handle: string;
    bio: string;
    followers: number;
    categories: string[];
    coverImage?: string;
    storeLayout?: "default" | "minimal" | "grid" | "magazine";
  };
}