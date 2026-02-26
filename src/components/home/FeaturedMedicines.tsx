"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getMedicines } from "@/services/medicine"; // or wherever your fetch is
import { Medicine } from "@/types/medicine.type";
import MedicineCard from "../medicines/MedicineCard";

export default function FeaturedMedicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // Fetch only 3 medicines (you can add ?limit=3 or slice later)
        const res = await getMedicines(1, 3); // limit = 3
        setMedicines(res.data.slice(0, 3)); // just in case
      } catch (err) {
        console.error("Failed to load featured medicines", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Featured Medicines
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover some of our most popular and trusted medicines
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : medicines.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            No featured medicines available at the moment
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicines.map((medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="cursor-pointer"
          >
            <Link href="/medicines">View All Medicines →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
