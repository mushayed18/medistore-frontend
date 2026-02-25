import { Category, CategoryResponse, SingleCategoryResponse } from "@/types/category";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/categories";

// Get all categories (public)
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch categories");

  const json: CategoryResponse = await res.json();
  if (!json.success) throw new Error("Invalid response");

  return json.data;
}

// Get single category (for edit)
export async function getCategory(id: string): Promise<Category> {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch category");

  const json: SingleCategoryResponse = await res.json();
  if (!json.success || !json.data) throw new Error("Category not found");

  return json.data;
}

// Create category (admin only)
export async function createCategory(name: string, description?: string): Promise<Category> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name, description }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create category");
  }

  const json: SingleCategoryResponse = await res.json();
  if (!json.success) throw new Error("Creation failed");

  return json.data;
}

// Update category (admin only)
export async function updateCategory(id: string, name: string, description?: string): Promise<Category> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name, description }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update category");
  }

  const json: SingleCategoryResponse = await res.json();
  if (!json.success) throw new Error("Update failed");

  return json.data;
}

// Delete category (admin only)
export async function deleteCategory(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete category");
  }
}