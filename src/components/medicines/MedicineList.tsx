"use client";

import { useState } from "react";
import { MedicineResponse } from "@/types/medicine.type";
import MedicineCard from "./MedicineCard";
import { getMedicines } from "@/services/medicine";
import MedicineSkeletonCard from "./MedicineSkeletonCard";

interface Props {
  initialData: MedicineResponse;
}

export default function MedicineList({ initialData }: Props) {
  const [data, setData] = useState(initialData);

  const [loading, setLoading] = useState(false);

  const handlePageChange = async (page: number) => {
    setLoading(true);

    const newData = await getMedicines(page, 6);

    setData(newData);
    setLoading(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <MedicineSkeletonCard key={index} />
            ))
          : data.data.map((medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={!data.meta.hasPrevPage}
          onClick={() => handlePageChange(data.meta.page - 1)}
          className="px-4 py-2 bg-secondary rounded disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>

        <span className="px-4 py-2 text-primary font-medium">
          Page {data.meta.page} of {data.meta.totalPages}
        </span>

        <button
          disabled={!data.meta.hasNextPage}
          onClick={() => handlePageChange(data.meta.page + 1)}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
