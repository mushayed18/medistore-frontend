"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MedicineResponse } from "@/types/medicine.type";
import { getMedicines } from "@/services/medicine";
import MedicineCard from "./MedicineCard";
import MedicineSkeletonCard from "./MedicineSkeletonCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function MedicineList({ initialData }: { initialData: MedicineResponse }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [data, setData] = useState<MedicineResponse>(initialData);
  const [loading, setLoading] = useState(false);

  // Filter states synced from URL
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [manufacturer, setManufacturer] = useState(searchParams.get("manufacturer") || "");
  const [minPrice, setMinPrice] = useState(Number(searchParams.get("minPrice")) || 0);
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get("maxPrice")) || 1000);
  const page = Number(searchParams.get("page")) || 1;

  const fetchAndUpdate = async () => {
    setLoading(true);
    try {
      const newData = await getMedicines(page, 6, search, minPrice, maxPrice, manufacturer);
      setData(newData);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch whenever page or ANY filter changes
  useEffect(() => {
    fetchAndUpdate();
  }, [page, search, manufacturer, minPrice, maxPrice]);

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm mb-1 text-gray-700">Search</label>
            <Input
              placeholder="Medicine name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700">Manufacturer</label>
            <Input
              placeholder="Beximco, Square..."
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1 text-gray-700">
              Price (৳{minPrice} – ৳{maxPrice})
            </label>
            <Slider
              min={0}
              max={1000}
              step={5}
              value={[minPrice, maxPrice]}
              onValueChange={([min, max]) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <MedicineSkeletonCard key={i} />
          ))}
        </div>
      ) : data.data.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-xl">No medicines found</p>
          <p className="mt-2">Try different filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {data.meta.totalPages > 1 && (
        <div className="flex justify-center gap-6 mt-10">
          <Button
            variant="outline"
            disabled={!data.meta.hasPrevPage || loading}
            onClick={() => router.push(`/medicines?page=${data.meta.page - 1}`)}
            className="bg-primary text-secondary cursor-pointer"
          >
            Previous
          </Button>

          <span className="px-4 text-lg font-medium">
            Page {data.meta.page} / {data.meta.totalPages}
          </span>

          <Button
            variant="outline"
            disabled={!data.meta.hasNextPage || loading}
            onClick={() => router.push(`/medicines?page=${data.meta.page + 1}`)}
            className="bg-primary text-secondary cursor-pointer"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}