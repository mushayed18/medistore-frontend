"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast"; // for nice toasts
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/sign-in/email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
          credentials: "include", // crucial — sends cookies/session
        },
      );

      const data = await res.json();

      if(data.user.status === "BANNED") {
        setError("Your account has been banned. Please contact support.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      setUser(data.user);

      // Success toast
      toast.success("Login successful! Redirecting...");

      // Redirect based on role (you can customize)
      if (data.user.role === "ADMIN") {
        router.push("/");
      } else if (data.user.role === "SELLER") {
        router.push("/");
      } else {
        router.push("/"); // home or /medicines for customer
      }

      router.refresh();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(
        "Something went wrong. Please try again. Error: " + errorMessage,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-primary">
          Login
        </h2>

        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:ring-primary text-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:ring-primary text-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 disabled:opacity-50 cursor-pointer transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
