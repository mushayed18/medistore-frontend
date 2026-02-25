"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { toggleUserStatus } from "@/services/user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface Props {
  userId: string;
  currentStatus: "ACTIVE" | "BANNED";
  onToggle: () => void;
}

export default function UserStatusToggle({
  userId,
  currentStatus,
  onToggle,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const nextStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";
  const actionText = currentStatus === "ACTIVE" ? "Ban" : "Activate";

  const handleToggle = async () => {
    setLoading(true);
    try {
      await toggleUserStatus(userId, nextStatus);
      toast.success(`User ${nextStatus.toLowerCase()} successfully`);
      onToggle();
      setShowConfirm(false);
    } catch (err) {
      toast.error(
        (err as Error).message || `Failed to ${actionText.toLowerCase()} user`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-end gap-3">
        <Button
          variant={currentStatus === "ACTIVE" ? "destructive" : "default"}
          size="sm"
          onClick={() => setShowConfirm(true)}
          disabled={loading}
          className="min-w-25 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : currentStatus === "ACTIVE" ? (
            "Ban User"
          ) : (
            "Activate User"
          )}
        </Button>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {currentStatus === "ACTIVE" ? (
                <span className="text-red-600">Ban User?</span>
              ) : (
                <span className="text-green-600">Activate User?</span>
              )}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {actionText.toLowerCase()} this user?
              This will change their account status to{" "}
              <strong>{nextStatus}</strong>.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-3 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
              disabled={loading}
              className="cursor-pointer mr-2"
            >
              Cancel
            </Button>
            <Button
              variant={currentStatus === "ACTIVE" ? "destructive" : "default"}
              onClick={handleToggle}
              disabled={loading}
              className="cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {actionText}ing...
                </>
              ) : (
                actionText
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
