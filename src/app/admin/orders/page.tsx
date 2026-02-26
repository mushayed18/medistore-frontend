"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderTable from "@/components/admin/orders/OrderTable";
import { getOrders } from "@/services/admin/order";
import { OrdersResponse, Order } from "@/types/order";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [meta, setMeta] = useState<OrdersResponse["meta"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = async (page = currentPage) => {
    setLoading(true);
    setError("");

    try {
      const res = await getOrders(page, 10);
      setOrders(res.data || []);
      setMeta(res.meta || null);
    } catch (err) {
      setError((err as Error).message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = () => {
    fetchOrders(currentPage);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchOrders(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-center items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-primary">Manage Orders</h1>
            <p className="text-gray-600 mt-2">View and update all customer orders</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">
            <p className="text-xl font-medium">{error}</p>
            <Button
              onClick={() => fetchOrders(currentPage)}
              className="mt-6 bg-primary hover:bg-primary/90 text-white cursor-pointer"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <OrderTable orders={orders} onRefresh={handleStatusChange} />

            {meta && meta.totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-12">
                <Button
                  variant="outline"
                  disabled={meta.page === 1}
                  onClick={() => handlePageChange(meta.page - 1)}
                  className="cursor-pointer"
                >
                  Previous
                </Button>

                <span className="text-lg font-medium text-primary">
                  Page {meta.page} of {meta.totalPages}
                </span>

                <Button
                  variant="outline"
                  disabled={!meta.hasNextPage}
                  onClick={() => handlePageChange(meta.page + 1)}
                  className="cursor-pointer"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}