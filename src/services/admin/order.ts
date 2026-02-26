import { OrdersResponse, SingleOrderResponse, Order } from "@/types/order";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders`;

// List all orders (paginated)
export async function getOrders(page = 1, limit = 10): Promise<OrdersResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await fetch(`${BASE_URL}?${params.toString()}`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch orders");

  const json: OrdersResponse = await res.json();
  if (!json.success) throw new Error("Invalid response");

  return json;
}

// Get single order
export async function getOrder(id: string): Promise<Order> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch order");

  const json: SingleOrderResponse = await res.json();
  if (!json.success || !json.data) throw new Error("Order not found");

  return json.data;
}

// Update order status
export async function updateOrderStatus(id: string, status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED"): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update order status");
  }
}