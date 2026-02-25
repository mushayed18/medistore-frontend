"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import OrderCard from "@/components/orders/OrderCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Order {
  id: string;
  totalAmount: number;
  status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingZip: string;
  createdAt: string;
  items: {
    quantity: number;
    price: number;
    medicine: {
      id: string;
      name: string;
      price: number;
    };
  }[];
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface OrdersResponse {
  success: boolean;
  data: Order[];
  meta: Meta;
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async (page = 1) => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders/my-orders?${params.toString()}`,
        { credentials: "include" },
      );

      if (!res.ok) throw new Error("Failed to fetch orders");

      const json: OrdersResponse = await res.json();
      setOrders(json.data || []);
      setMeta(json.meta || null);
    } catch (err) {
      setError((err as Error).message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-center">
          My Orders
        </h1>
        <p className="text-center text-gray-600 text-lg mb-12">
          View and track all your recent orders
        </p>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">
            <p className="text-xl font-medium">{error}</p>
            <Button
              onClick={() => {
                setError("");
                fetchOrders();
              }}
              className="mt-6 bg-primary hover:bg-primary/90 text-white"
            >
              Try Again
            </Button>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-2xl font-medium">No orders found</p>
            <p className="mt-4 text-lg">
              Start shopping to place your first order!
            </p>
            <Button
              asChild
              className="mt-8 bg-primary hover:bg-primary/90 text-white px-10"
            >
              <Link href="/medicines">Browse Medicines</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onCancel={(cancelledId) => {
                  // OLD: remove from list
                  // setOrders((prev) => prev.filter((o) => o.id !== cancelledId));

                  // NEW: update status to CANCELLED
                  setOrders((prev) =>
                    prev.map((o) =>
                      o.id === cancelledId
                        ? { ...o, status: "CANCELLED" as const }
                        : o,
                    ),
                  );
                }}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {meta && meta.totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-12">
            <Button
              variant="outline"
              disabled={meta.page === 1}
              onClick={() => fetchOrders(meta.page - 1)}
            >
              Previous
            </Button>

            <span className="text-lg font-medium text-primary">
              Page {meta.page} of {meta.totalPages}
            </span>

            <Button
              variant="outline"
              disabled={!meta.hasNextPage}
              onClick={() => fetchOrders(meta.page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
