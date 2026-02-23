import { MedicineResponse } from "@/types/medicine.type";

export async function getMedicines(
  page = 1,
  limit = 6,
  search = "",
  minPrice = 0,
  maxPrice = 1000,
  manufacturer = ""
): Promise<MedicineResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search.trim()) params.set("search", search.trim());
  if (minPrice > 0) params.set("minPrice", minPrice.toString());
  if (maxPrice < 1000) params.set("maxPrice", maxPrice.toString());
  if (manufacturer.trim()) params.set("manufacturer", manufacturer.trim());

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/medicines?${params.toString()}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch medicines");
  }

  return res.json();
}