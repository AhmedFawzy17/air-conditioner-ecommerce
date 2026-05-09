export interface AdminProduct {
  id: string;
  brand: string;
  model: string;
  coolingCapacity: string;
  price: number;
  description: string;
  stockQuantity: number;
  imageUrl: string;
}

export interface Accessory {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Specification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  rating: number;
  reviewCount: number;
  discount?: string;
  image: string;
  images: string[];
  brand: string;
  description: string;
  specifications: Specification[];
  features: string[];
  accessories: Accessory[];
  thumbnails: string[];
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderRequest {
  items: OrderItem[];
  shippingAddress: string;
  phone: string;
  paymentMethod: string;
}

export interface OrderResponse {
  id: string;
  orderNumber: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
}
