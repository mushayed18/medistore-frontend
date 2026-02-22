export type User = {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
  status: "ACTIVE" | "BANNED";
} | null;