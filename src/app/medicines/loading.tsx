import MedicineSkeletonCard from "@/components/medicines/MedicineSkeletonCard";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary text-center mb-8">
        All Medicines
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <MedicineSkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}
