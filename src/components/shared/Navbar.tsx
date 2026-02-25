"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export default function Navbar() {
  // const { user, loading, logout } = useCurrentUser();
  const { user, loading, logout } = useAuth();
  const { cartCount } = useCart();
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
        { href: "/my-orders", label: "My Orders" },
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
      { href: "/admin/categories", label: "Manage Categories" },
      { href: "/admin/medicines", label: "Manage Medicines" },
      { href: "/admin/orders", label: "All Orders" },
      { href: "/admin/users", label: "All Users" },
    ];
  };

  const links = getLinks();

  return (
    <nav className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-3xl tracking-wide">MediStore</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-secondary transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Auth / Profile / Cart */}
            {loading ? (
              <div className="h-8 w-8 bg-secondary/30 rounded-full animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-4">
                {/* Cart Icon with Badge */}
                {user.role === "CUSTOMER" && (
                  <Link
                    href="/cart"
                    className="relative hover:text-secondary transition"
                  >
                    <ShoppingCart className="h-6 w-6" />
                    {cartCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-red-500 text-white"
                      >
                        {cartCount}
                      </Badge>
                    )}
                  </Link>
                )}

                {/* Profile Avatar + Role */}
                <div className="flex items-center gap-3">
                  <Link href="/profile">
                    <Avatar className="h-9 w-9 border-2 border-secondary/50 cursor-pointer">
                      <AvatarFallback className="bg-secondary text-primary font-semibold">
                        {user.name?.[0]?.toUpperCase() ||
                          user.email?.[0]?.toUpperCase() ||
                          "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <Badge
                    variant="outline"
                    className="text-xs bg-secondary/20 text-secondary border-secondary/40"
                  >
                    {user.role}
                  </Badge>
                </div>

                <button
                  onClick={logout}
                  className="hover:text-secondary transition font-medium cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hover:text-secondary transition font-medium"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-secondary/20">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 rounded-lg hover:bg-secondary/20 transition"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {loading ? (
              <div className="px-4 py-3 text-center text-gray-300">
                Loading...
              </div>
            ) : user ? (
              <>
                {/* Cart in mobile */}
                {user.role === "CUSTOMER" && (
                  <Link
                    href="/cart"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/20 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Cart</span>
                    {cartCount > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        {cartCount}
                      </Badge>
                    )}
                  </Link>
                )}

                {/* Profile in mobile */}
                <div className="px-4 py-3 flex items-center gap-3 border-t border-secondary/20 mt-2 pt-4">
                  <Link href="/profile">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-secondary text-primary font-semibold">
                        {user.name?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <p className="font-medium">{user.name || user.email}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {user.role}
                    </Badge>
                  </div>
                </div>

                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-secondary/20 transition text-red-400 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="block px-4 py-3 rounded-lg hover:bg-secondary/20 transition font-medium"
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
