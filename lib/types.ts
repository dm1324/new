export interface Creator {
  id: string;
  name: string;
  handle: string;
  profileImage: string;
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
  image: string;
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
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}