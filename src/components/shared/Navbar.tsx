"use client"; // needed for interactive parts (menu toggle)

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            MediStore
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-secondary transition">
              Home
            </Link>
            <Link href="/medicines" className="hover:text-secondary transition">
              Medicines
            </Link>
            <Link href="/cart" className="hover:text-secondary transition">
              Cart
            </Link>
            <Link href="/profile" className="hover:text-secondary transition">
              Profile
            </Link>
            <button className="hover:text-secondary transition">
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="h-6 w-6"
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
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md hover:bg-secondary/20"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/medicines"
              className="block px-3 py-2 rounded-md hover:bg-secondary/20"
              onClick={() => setIsOpen(false)}
            >
              Medicines
            </Link>
            <Link
              href="/cart"
              className="block px-3 py-2 rounded-md hover:bg-secondary/20"
              onClick={() => setIsOpen(false)}
            >
              Cart
            </Link>
            <Link
              href="/profile"
              className="block px-3 py-2 rounded-md hover:bg-secondary/20"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
            <button className="block w-full text-left px-3 py-2 rounded-md hover:bg-secondary/20">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}