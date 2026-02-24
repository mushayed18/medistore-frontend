import { Medicine } from "@/types/medicine";
import ReviewList from "./ReviewList";
import { Star, Package, Factory, Tags, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  medicine: Medicine;
}

export default function MedicineDetails({ medicine }: Props) {
  const averageRating =
    medicine.reviews.length > 0
      ? medicine.reviews.reduce((sum, r) => sum + r.rating, 0) /
        medicine.reviews.length
      : 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Top Section - Name + Rating + Price */}
      <div className="bg-linear-to-r from-[#503217]/5 to-[#e8e6de]/30 px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#503217] mb-3">
              {medicine.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < Math.floor(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : i < averageRating
                          ? "fill-yellow-400/50 text-yellow-400/50"
                          : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xl font-semibold text-gray-700">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-gray-500 text-sm">
                ({medicine.reviews.length} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600 hidden md:block">Price</p>
              <p className="text-4xl md:text-5xl font-bold text-[#503217]">
                ৳{medicine.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 md:p-10">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Column - Description + Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-[#503217] mb-4 flex items-center gap-3">
                <span>Description</span>
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {medicine.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Package className="text-[#503217] h-6 w-6" />
                  <p className="font-medium text-gray-700">Stock</p>
                </div>
                <p
                  className={`text-2xl font-bold ${
                    medicine.stock > 50
                      ? "text-green-600"
                      : medicine.stock > 10
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {medicine.stock}
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Factory className="text-[#503217] h-6 w-6" />
                  <p className="font-medium text-gray-700">Manufacturer</p>
                </div>
                <p className="text-xl font-semibold">{medicine.manufacturer}</p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Tags className="text-[#503217] h-6 w-6" />
                  <p className="font-medium text-gray-700">Category</p>
                </div>
                <Badge variant="secondary" className="text-base px-4 py-1">
                  {medicine.category.name}
                </Badge>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <User className="text-[#503217] h-6 w-6" />
                  <p className="font-medium text-gray-700">Seller</p>
                </div>
                <p className="text-xl font-semibold text-[#503217]">
                  {medicine.seller.name}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button className="flex-1 bg-[#503217] hover:bg-[#503217]/90 text-white text-lg py-7 rounded-xl shadow-md">
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#503217] text-[#503217] hover:bg-[#503217]/10 text-lg py-7 rounded-xl"
              >
                Buy Now
              </Button>
            </div>
          </div>

          {/* Right Column - Reviews */}
          <div>
            <ReviewList reviews={medicine.reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
