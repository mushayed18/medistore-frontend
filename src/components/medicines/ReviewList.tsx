import { Review } from "@/types/medicine";

interface Props {
  reviews: Review[];
}

export default function ReviewList({ reviews }: Props) {
  if (!reviews?.length) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4 text-[#503217]">
        Reviews
      </h2>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-lg p-4 bg-[#e8e6de]/40"
          >
            <p className="font-medium">{review.customer.name}</p>
            <p className="text-sm text-yellow-600">
              ⭐ {review.rating}
            </p>
            <p className="text-gray-600 mt-2">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
