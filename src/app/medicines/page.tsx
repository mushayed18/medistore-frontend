import { getMedicines } from "@/services/medicine";
import MedicineList from "@/components/medicines/MedicineList";

export default async function MedicinesPage() {
  const initialData = await getMedicines(1, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-primary text-center mb-10">
        All Medicines
      </h1>

      <MedicineList initialData={initialData} />
    </div>
  );
}