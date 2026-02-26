import { AdminMedicinesResponse } from "@/types/admin/medicine-admin";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/medicines`;

// Seller: Get only their own medicines
export async function getMyMedicines(page = 1, limit = 10): Promise<AdminMedicinesResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await fetch(`${BASE_URL}/my-medicines?${params.toString()}`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch your medicines");

  const json: AdminMedicinesResponse = await res.json();
  if (!json.success) throw new Error("Invalid response");

  return json;
}

// Reuse admin's create/update/delete (backend restricts by seller)
export { createMedicine, updateMedicine, deleteMedicine } from "@/services/admin/medicine";

// Seller can also use getMedicine for edit (backend restricts)
export { getMedicine } from "@/services/admin/medicine";