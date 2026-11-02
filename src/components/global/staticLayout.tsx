import React from "react";
import Navbar from "./navbar";
import NewsLetter from "./newsLetter";
import Footer from "./footer";
import { CartProvider } from "@/src/context/CartContext";

export default function StaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <NewsLetter />
      <Footer />
    </CartProvider>
  );
}
