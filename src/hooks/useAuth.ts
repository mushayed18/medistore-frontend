"use client";

import { User } from "@/types/user.type";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useCurrentUser() {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simple way: fetch /api/auth/session (Better Auth default)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/get-session`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/sign-out`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    toast.success("Logged out successfully!");
    window.location.href = "/";
  };

  return { user, loading, logout };
}