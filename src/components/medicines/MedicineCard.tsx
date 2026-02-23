import { Medicine } from "@/types/medicine.type";
import { FaCapsules, FaIndustry } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface Props {
  medicine: Medicine;
}

export default function MedicineCard({ medicine }: Props) {
  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden border border-secondary/30 hover:shadow-xl hover:border-secondary transition-all duration-300">
      {/* Image placeholder */}
      <div className="h-48 bg-linear-to-br from-primary/5 to-secondary/10 flex items-center justify-center">
        <FaCapsules className="text-8xl text-primary/20" />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors line-clamp-2">
          {medicine.name}
        </h3>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {medicine.description}
        </p>

        <div className="mt-4 space-y-2 text-sm">
          <p className="flex items-center gap-2 text-gray-700">
            <FaIndustry className="text-primary" />
            {medicine.manufacturer}
          </p>

          <p className="flex items-center gap-2 text-gray-700">
            <MdCategory className="text-primary" />
            {medicine.category.name}
          </p>

          <p className="font-bold text-xl text-primary mt-3">
            ৳{medicine.price.toFixed(2)}
          </p>

          <p className={`text-sm font-medium ${
            medicine.stock > 0 ? "text-green-600" : "text-red-600"
          }`}>
            {medicine.stock > 0 ? `In Stock (${medicine.stock})` : "Out of Stock"}
          </p>
        </div>

        <Link
          href={`/medicines/${medicine.id}`}
          className="mt-4 inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition"
        >
          View Details <FaArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}