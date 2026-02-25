export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  customer: {
    name: string;
  };
}

export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  category: {
    name: string;
  };
  seller: {
    name: string;
  };
  reviews: Review[];
}

export interface SingleMedicineResponse {
  success: boolean;
  data: Medicine;
}


// Existing types...

export interface OrderItem {
  quantity: number;
  price: number;
  medicine: {
    id: string;
    name: string;
    price: number;
    // Add more fields if backend returns them later
  };
}

export interface Order {
  id: string;
  totalAmount: number;
  status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingZip: string;
  createdAt: string;
  items: OrderItem[];  // ← use this instead of inline type
}