"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { updateOrderStatus } from "@/services/admin/order";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  currentStatus: string;
  onSuccess: () => void;
}

export default function OrderStatusModal({
  open,
  onOpenChange,
  orderId,
  currentStatus,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [newStatus, setNewStatus] = useState("PENDING");

  const possibleStatuses = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];
  
  const handleUpdate = async () => {
    setLoading(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await updateOrderStatus(orderId, newStatus as any);
      toast.success(`Order status updated to ${newStatus}`);
      onSuccess();
      onOpenChange(false);
    } catch (err) {
      toast.error((err as Error).message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Change Order Status</DialogTitle>
          <DialogDescription>
            Current status: <strong>{currentStatus}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Label>Select new status</Label>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="flex h-10 w-full mt-2 rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {possibleStatuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-primary hover:bg-primary/90"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Status"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}