"use client";

import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    shippingName: "",
    shippingPhone: "",
    shippingAddress: "",
    shippingCity: "",
    shippingZip: "",
    orderNotes: "",
  });

  const [loading, setLoading] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Add some medicines to your cart before proceeding to checkout.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-10">
            <Link href="/medicines">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const shipping = 50;
  const total = subtotal + tax + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.shippingName || !formData.shippingPhone || !formData.shippingAddress || !formData.shippingCity || !formData.shippingZip) {
      toast.error("Please fill all required shipping details");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          items: cart.map((item) => ({
            medicineId: item.id,
            quantity: item.quantity,
          })),
          shippingName: formData.shippingName,
          shippingPhone: formData.shippingPhone,
          shippingAddress: formData.shippingAddress,
          shippingCity: formData.shippingCity,
          shippingZip: formData.shippingZip,
          orderNotes: formData.orderNotes.trim() || undefined,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to place order");
      }

      toast.success("Order placed successfully! Thank you.", {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#10B981",
          color: "white",
          borderRadius: "12px",
        },
      });

      clearCart();
      router.push("/orders"); // or "/thank-you" or "/orders/success"
    } catch (err) {
      toast.error((err as Error).message || "Something went wrong. Please try again.", {
        duration: 6000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-[#503217] mb-4 text-center">
          Checkout
        </h1>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Please review your order and enter shipping details to complete your purchase
        </p>

        <div className="grid md:grid-cols-5 gap-10 lg:gap-12">
          {/* Left: Order Items (read-only) */}
          <div className="md:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-linear-to-r from-[#503217]/5 to-[#e8e6de]/30 px-6 py-5 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-[#503217]">
                  Order Items ({cart.length})
                </h2>
              </div>

              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={item.id} className="p-6 flex items-center gap-6 hover:bg-gray-50 transition">
                    {/* Image */}
                    <div className="w-20 h-20 bg-linear-to-br from-primary/5 to-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-4xl opacity-40">💊</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Unit price: ৳{item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#503217]">
                        ৳{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Summary + Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-10">
              <h2 className="text-2xl font-bold text-[#503217] mb-6">Order Summary</h2>

              <div className="space-y-5 text-gray-700">
                <div className="flex justify-between text-base">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-medium">৳{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base">
                  <span>Shipping</span>
                  <span className="font-medium">৳{shipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base">
                  <span>Tax (5%)</span>
                  <span className="font-medium">৳{tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-5 mt-3">
                  <div className="flex justify-between text-xl font-bold text-[#503217]">
                    <span>Total</span>
                    <span>৳{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Form */}
              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div>
                  <Label htmlFor="shippingName" className="text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="shippingName"
                    name="shippingName"
                    value={formData.shippingName}
                    onChange={handleInputChange}
                    required
                    className="mt-1.5 h-11"
                    placeholder="Bob the builder"
                  />
                </div>

                <div>
                  <Label htmlFor="shippingPhone" className="text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="shippingPhone"
                    name="shippingPhone"
                    value={formData.shippingPhone}
                    onChange={handleInputChange}
                    required
                    className="mt-1.5 h-11"
                    placeholder="01912345678"
                  />
                </div>

                <div>
                  <Label htmlFor="shippingAddress" className="text-gray-700">
                    Full Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="shippingAddress"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    required
                    className="mt-1.5 h-11"
                    placeholder="House 12, Road 5, Dhanmondi"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shippingCity" className="text-gray-700">
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="shippingCity"
                      name="shippingCity"
                      value={formData.shippingCity}
                      onChange={handleInputChange}
                      required
                      className="mt-1.5 h-11"
                      placeholder="Dhaka"
                    />
                  </div>

                  <div>
                    <Label htmlFor="shippingZip" className="text-gray-700">
                      ZIP Code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="shippingZip"
                      name="shippingZip"
                      value={formData.shippingZip}
                      onChange={handleInputChange}
                      required
                      className="mt-1.5 h-11"
                      placeholder="1205"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="orderNotes" className="text-gray-700">
                    Order Notes (optional)
                  </Label>
                  <Textarea
                    id="orderNotes"
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions..."
                    className="mt-1.5 min-h-25"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#503217] hover:bg-[#503217]/90 text-white text-lg py-7 rounded-xl mt-6 shadow-md transition cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      Place Order • ৳{total.toFixed(2)}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}