export async function getMedicines(page = 1, limit = 6) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/medicines?page=${page}&limit=${limit}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch medicines");
  }

  return res.json();
}
