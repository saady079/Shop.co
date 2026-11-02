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
    <div>
      <CartProvider>
        <Navbar />
        {children}
        <NewsLetter />
        <Footer />
      </CartProvider>
    </div>
  );
}
