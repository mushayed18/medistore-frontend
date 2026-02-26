"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import OrderStatusModal from "./OrderStatusModal";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/types/order";

interface Props {
  orders: Order[];
  onRefresh: () => void;
}

export default function OrderTable({ orders, onRefresh }: Props) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const handleStatusChange = () => {
    onRefresh();
    setStatusModalOpen(false);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow
                  key={order.id}
                  className="hover:bg-gray-50 transition"
                >
                  <TableCell className="font-medium">
                    {order.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>৳{order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      className={`px-3 py-1 text-sm ${
                        order.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "SHIPPED"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "DELIVERED"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedOrder(order);
                          setDetailModalOpen(true);
                        }}
                        className="text-primary hover:text-primary/80 hover:bg-primary/10 cursor-pointer"
                      >
                        <Eye size={18} />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedOrder(order);
                          setStatusModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer"
                      >
                        <Edit size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Status Change Modal */}
      {selectedOrder && (
        <OrderStatusModal
          open={statusModalOpen}
          onOpenChange={setStatusModalOpen}
          orderId={selectedOrder.id}
          currentStatus={selectedOrder.status}
          onSuccess={handleStatusChange}
        />
      )}

      {/* Detail Modal (optional – can expand later) */}
      {selectedOrder && detailModalOpen && (
        <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="border-b pb-4 mb-6">
              <DialogTitle className="text-2xl font-bold text-primary">
                Order Details
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                Placed on {formatDate(selectedOrder.createdAt)}
              </p>
            </DialogHeader>

            <div className="grid md:grid-cols-1 gap-8">
              {/* Left: Customer & Shipping */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    Customer Information
                  </h3>
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <p className="font-medium">{selectedOrder.customer.name}</p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.customer.email}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    Shipping Details
                  </h3>
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 space-y-2 text-sm">
                    <p>
                      <strong>Name:</strong> {selectedOrder.shippingName}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedOrder.shippingPhone}
                    </p>
                    <p>
                      <strong>Address:</strong> {selectedOrder.shippingAddress}
                    </p>
                    <p>
                      <strong>City, ZIP:</strong> {selectedOrder.shippingCity},{" "}
                      {selectedOrder.shippingZip}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    Order Summary
                  </h3>
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Amount:</span>
                      <span className="font-bold text-primary">
                        ৳{selectedOrder.totalAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge
                        className={`px-3 py-1 text-sm ${
                          selectedOrder.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : selectedOrder.status === "SHIPPED"
                              ? "bg-blue-100 text-blue-800"
                              : selectedOrder.status === "DELIVERED"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedOrder.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span>{formatDate(selectedOrder.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Items Table */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Order Items ({selectedOrder.items.length})
                </h3>
                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-100">
                      <TableRow>
                        <TableHead>Medicine</TableHead>
                        <TableHead className="text-center">Qty</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.medicine.name}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            ৳{item.price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ৳{(item.quantity * item.price).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-bold border-t">
                        <TableCell colSpan={3} className="text-right">
                          Total
                        </TableCell>
                        <TableCell className="text-right text-primary">
                          ৳{selectedOrder.totalAmount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-8">
              <Button
                variant="outline"
                onClick={() => setDetailModalOpen(false)}
                className="cursor-pointer"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
