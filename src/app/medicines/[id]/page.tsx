import { notFound } from "next/navigation";
import { getSingleMedicine } from "@/services/medicine";
import MedicineDetails from "@/components/medicines/MedicineDetails";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SingleMedicinePage({ params }: PageProps) {
  const { id } = await params;

  const response = await getSingleMedicine(id);

  if (!response?.data) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <MedicineDetails medicine={response.data} />
    </div>
  );
}
