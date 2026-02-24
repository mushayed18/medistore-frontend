"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/user.type";
import toast from "react-hot-toast";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/get-session`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/sign-out`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    setUser(null);
    toast.success("Logged out successfully!");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
