import { AdminMedicine, AdminMedicinesResponse, AdminSingleMedicineResponse } from "@/types/admin/medicine-admin";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/medicines`;

// List medicines (admin sees all)
export async function getMedicines(page = 1, limit = 10, search = ""): Promise<AdminMedicinesResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search.trim()) params.set("search", search.trim());

  const res = await fetch(`${BASE_URL}?${params.toString()}`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch medicines");

  const json: AdminMedicinesResponse = await res.json();
  if (!json.success) throw new Error("Invalid response");

  return json;
}

// Get single medicine
export async function getMedicine(id: string): Promise<AdminMedicine> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch medicine");

  const json: AdminSingleMedicineResponse = await res.json();
  if (!json.success || !json.data) throw new Error("Medicine not found");

  return json.data;
}

// Create medicine
export async function createMedicine(data: {
  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer?: string;
  categoryId: string;
}): Promise<AdminMedicine> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create medicine");
  }

  const json: AdminSingleMedicineResponse = await res.json();
  if (!json.success) throw new Error("Creation failed");

  return json.data;
}

// Update medicine
export async function updateMedicine(id: string, data: Partial<{
  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  categoryId: string;
}>): Promise<AdminMedicine> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update medicine");
  }

  const json: AdminSingleMedicineResponse = await res.json();
  if (!json.success) throw new Error("Update failed");

  return json.data;
}

// Delete medicine
export async function deleteMedicine(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete medicine");
  }
}