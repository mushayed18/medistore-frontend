import { UsersResponse } from "@/types/user";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/users";

// Get all users (admin only)
export async function getUsers(page = 1, limit = 10): Promise<UsersResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await fetch(`${BASE_URL}?${params.toString()}`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch users");

  return res.json();
}

// Toggle user status (ban / activate)
export async function toggleUserStatus(id: string, status: "ACTIVE" | "BANNED"): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update user status");
  }
}