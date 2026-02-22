"use client";

import Link from "next/link";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/useAuth"; // ← import hook
import { Avatar,AvatarBadge, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const { user, loading, logout } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);

  // Role-based links
  const getLinks = () => {
    if (!user) {
      return [
        { href: "/", label: "Home" },
        { href: "/medicines", label: "Medicines" },
      ];
    }

    if (user.role === "CUSTOMER") {
      return [
        { href: "/", label: "Home" },
        { href: "/medicines", label: "Medicines" },
        { href: "/orders", label: "My Orders" },
        { href: "/cart", label: "Cart" },
      ];
    }

    if (user.role === "SELLER") {
      return [
        { href: "/", label: "Home" },
        { href: "/medicines", label: "Medicines" },
        { href: "/medicines/my-medicines", label: "My Medicines" },
        { href: "/orders", label: "My Orders" },
      ];
    }

    // Admin
    return [
      { href: "/", label: "Home" },
      { href: "/medicines", label: "Medicines" },
      { href: "/orders", label: "All Orders" },
      { href: "/users", label: "All Users" },
    ];
  };

  const links = getLinks();

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            MediStore
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-secondary transition"
              >
                {link.label}
              </Link>
            ))}

            {/* Profile / Auth */}
            {loading ? (
              <span>Loading...</span>
            ) : user ? (
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-secondary text-primary font-medium">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <AvatarBadge className="bg-secondary text-primary text-xs">
                  {user.role}
                </AvatarBadge>
                <button
                  onClick={logout}
                  className="hover:text-secondary transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="hover:text-secondary transition">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Hamburger icon */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md hover:bg-secondary/20"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {loading ? (
              <span className="block px-3 py-2">Loading...</span>
            ) : user ? (
              <>
                <div className="px-3 py-2 flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-secondary text-primary">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <AvatarBadge className="bg-secondary text-primary text-xs">
                    {user.role}
                  </AvatarBadge>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="cursor-pointer block w-full text-left px-3 py-2 rounded-md hover:bg-secondary/20"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="block px-3 py-2 rounded-md hover:bg-secondary/20"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}