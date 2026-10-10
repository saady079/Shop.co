import React from "react";
import Menu from "./menu";
import NewsLetter from "./newsLetter";
import Footer from "./footer";


export default function StaticLayout({ children }: {children:React.ReactNode}) {
  return (
    <div>
      <Menu />
      {children}
      <NewsLetter/>
      <Footer/>
    </div>
  );
}