import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/context/auth-context";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Medi Store",
  description: "Online medical store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000, // how long toasts stay
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
            success: {
              style: {
                background: "#503217",
                color: "white",
              },
            },
            error: {
              style: {
                background: "#EF4444", // red for error
                color: "white",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
