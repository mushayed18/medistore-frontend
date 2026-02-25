"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import OrderItem from "./OrderItem";

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

interface Props {
  order: Order;
  onCancel?: (orderId: string) => void;  // ← new callback to refresh parent list
}

export default function OrderCard({ order, onCancel }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const statusColor = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
    SHIPPED: "bg-blue-100 text-blue-800 border-blue-300",
    DELIVERED: "bg-green-100 text-green-800 border-green-300",
    CANCELLED: "bg-red-100 text-red-800 border-red-300",
  }[order.status] || "bg-gray-100 text-gray-800 border-gray-300";

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCancel = async () => {
    setCancelling(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders/${order.id}/cancel`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to cancel order");
      }

      toast.success("Order cancelled successfully", {
        style: { background: "#503217", color: "white" },
      });

      setShowConfirm(false);
      if (onCancel) onCancel(order.id); // tell parent to refresh
    } catch (err) {
      toast.error((err as Error).message || "Failed to cancel order");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="bg-linear-to-r from-primary/5 to-secondary/10 px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm text-gray-600">
              Order ID: <span className="font-mono text-primary">{order.id.slice(0, 8)}...</span>
            </p>
            <p className="text-lg font-semibold text-primary mt-1">
              ৳{order.totalAmount.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Badge className={`${statusColor} px-4 py-1 text-sm font-medium`}>
              {order.status}
            </Badge>

            {order.status === "PENDING" && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowConfirm(true)}
                className="bg-primary hover:bg-red-700 cursor-pointer"
              >
                Cancel Order
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:bg-primary/10"
            >
              {isExpanded ? "Hide Details" : "View Details"}
              {isExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/30">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Shipping Details</h4>
                <div className="space-y-1.5 text-sm text-gray-600">
                  <p><strong>Name:</strong> {order.shippingName}</p>
                  <p><strong>Phone:</strong> {order.shippingPhone}</p>
                  <p><strong>Address:</strong> {order.shippingAddress}</p>
                  <p><strong>City, ZIP:</strong> {order.shippingCity}, {order.shippingZip}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Order Date</h4>
                <p className="text-sm text-gray-600">
                  {formatDate(order.createdAt)}
                </p>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-primary mb-4">Items</h4>
            <div className="space-y-4">
              {order.items.map((item) => (
                <OrderItem key={item.medicine.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="h-6 w-6" />
              Cancel Order?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this order? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-3 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
              disabled={cancelling}
              className="cursor-pointer mr-2"
            >
              No, Keep Order
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={cancelling}
              className="bg-primary hover:bg-red-700 cursor-pointer"
            >
              {cancelling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Yes, Cancel Order"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}