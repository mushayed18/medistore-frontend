"use client";

import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const router = useRouter();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.05; // 5% tax
  const shipping = subtotal > 0 ? 50 : 0; // fixed shipping
  const total = subtotal + tax + shipping;

  const handleQuantityChange = (id: string, newQty: number) => {
    if (newQty < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQty);
    }
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added anything yet. Start shopping now!
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Link href="/medicines">Browse Medicines</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-primary mb-10 text-center md:text-left">
          Your Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
        </h1>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition"
              >
                {/* Image Placeholder */}
                <div className="w-full sm:w-32 h-32 bg-linear-to-br from-primary/5 to-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-5xl opacity-30">💊</span>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-semibold text-primary line-clamp-2">
                    {item.name}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {/* Optional description snippet */}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-primary">
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                          toast.success(`${item.name} removed`);
                        }}
                        className="text-red-500 hover:text-red-700 transition cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end mt-6">
              <Button
                variant="outline"
                onClick={handleClearCart}
                className="text-red-600 hover:bg-red-50 border-red-200"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 h-fit sticky top-10">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items)</span>
                <span>৳{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>৳{tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>৳{shipping.toFixed(2)}</span>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-xl font-bold text-primary">
                  <span>Total</span>
                  <span>৳{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => router.push("/cart/checkout")}
              className="w-full mt-8 bg-primary hover:bg-primary/90 text-white text-lg py-7 rounded-xl cursor-pointer"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
