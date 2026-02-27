"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/useAuth";

interface Props {
  medicineId: string;
  onReviewSubmitted: () => void; // to refresh reviews list after submit
}

export default function ReviewForm({ medicineId, onReviewSubmitted }: Props) {
  const { user, loading } = useCurrentUser();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Only show form to logged-in CUSTOMER
  if (loading) return null;
  if (!user || user.role !== "CUSTOMER") return null;

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            medicineId,
            rating,
            comment: comment.trim(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data);
        throw new Error(data.message || "Failed to submit review");
      }

      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      onReviewSubmitted(); // refresh parent reviews list
    } catch (err) {
      toast.error((err as Error).message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mt-8">
      <h3 className="text-xl font-semibold text-primary mb-4">
        Write a Review
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Stars */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <Star
                  key={index}
                  className={`h-8 w-8 cursor-pointer transition-colors ${
                    starValue <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                  onClick={() => handleStarClick(starValue)}
                />
              );
            })}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this medicine..."
            rows={4}
            className="resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  );
}