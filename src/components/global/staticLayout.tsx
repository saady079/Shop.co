import React from "react";
import Navbar from "./navbar";
import NewsLetter from "./newsLetter";
import Footer from "./footer";

export default function StaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <NewsLetter />
      <Footer />
    </div>
  );
}