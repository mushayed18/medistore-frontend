import { Medicine } from "@/types/medicine.type";
import { FaCapsules, FaIndustry } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

interface Props {
  medicine: Medicine;
}

export default function MedicineCard({ medicine }: Props) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-secondary hover:shadow-lg transition">
      
      <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
        <FaCapsules />
        {medicine.name}
      </h2>

      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
        {medicine.description}
      </p>

      <div className="mt-4 space-y-1 text-sm">
        <p className="flex items-center gap-2">
          <FaIndustry className="text-primary" />
          {medicine.manufacturer}
        </p>

        <p className="flex items-center gap-2">
          <MdCategory className="text-primary" />
          {medicine.category.name}
        </p>

        <p className="font-semibold text-primary mt-2">
          ${medicine.price}
        </p>

        <p className={`text-xs ${medicine.stock > 0 ? "text-green-600" : "text-red-600"}`}>
          {medicine.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>
      </div>
    </div>
  );
}
