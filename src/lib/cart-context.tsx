"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import toast from "react-hot-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string; // optional
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  cartCount: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Load from localStorage on mount
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("medistore-cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("medistore-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);

      if (existing) {
        // Update quantity if already exists
        const updated = prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
        toast.success(`Added ${newItem.quantity} more of ${newItem.name}`);
        return updated;
      }

      // Add new item
      toast.success(`Added ${newItem.name} to cart`);
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) toast.success(`Removed ${item.name} from cart`);
      return prev.filter((item) => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}