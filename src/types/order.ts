export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  orderId: string;
  medicineId: string;
  medicine: {
    id: string;
    name: string;
    price: number;
  };
}

export interface Customer {
  id: string;
  name: string;
  email: string;
}

export interface Order {
  id: string;
  customerId: string;
  totalAmount: number;
  status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingZip: string;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  items: OrderItem[];
}

export interface OrdersResponse {
  success: boolean;
  data: Order[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface SingleOrderResponse {
  success: boolean;
  data: Order;
}