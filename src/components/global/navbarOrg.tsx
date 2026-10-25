"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchField } from "@heroui/react";
import Container from "../constant/container";

export default function NavbarOrg() {
  const links = [
    { href: "/shop", label: "Shop" },
    { href: "/on-sale", label: "On Sale" },
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/brands", label: "Brands" },
  ];

  const proLink = links[0].label.includes("Shop");
  const activePath = usePathname();
  return (
      <nav className="flex items-center justify-between bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60 shadow-sm border border-gray-100 rounded-xl lg:rounded-2xl py-3 px-3 sm:px-4">
        <Link href="/" className="mr-10">
          <Image src="/images/SHOP.CO.png" alt="Logo" width={120} height={20} />
        </Link>
        <div className="flex text-sm font-bold opacity-75">
          {links.map(({ href, label }, i) => {
            return (
              <Link
                key={i}
                href={href}
                className={`mx-3 ${activePath === href ? "text-fuchsia-950" : ""}`}
              >
                {label}
                {proLink && label === "Shop" && (
                  <i className="fas fa-caret-down text-xs ml-1"></i>
                )}
              </Link>
            );
          })}
        </div>
        <SearchField
          className="w-full max-w-64 mx-3.5"
          name="docs"
          variant="secondary"
        >
          <SearchField.Group className="rounded-xl bg-mauve-100">
            <SearchField.SearchIcon className="text-muted" />
            <SearchField.Input
              className="placeholder:text-muted"
              placeholder="Search for products..."
            />
            <SearchField.ClearButton className="text-muted" />
          </SearchField.Group>
        </SearchField>
        <div className="flex text-xl">
          <i className="fas fa-shopping-cart mr-3"></i>
          <i className="far fa-user-circle"></i>
        </div>
      </nav>
  );
}
