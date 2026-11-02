"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchField } from "@heroui/react";
import { useState } from "react";

export default function NavbarOrg() {
  const links = [
    { href: "/shop", label: "Shop" },
    { href: "/on-sale", label: "On Sale" },
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/brands", label: "Brands" },
  ];

  const proLink = links[0].label.includes("Shop");
  const activePath = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60 shadow-sm border border-gray-100 rounded-xl lg:rounded-2xl py-3 px-3 sm:px-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        className="rounded-md border border-gray-300 p-1.5 mr-2 hover:bg-gray-100 md:hidden"
      >
        <span className="flex w-4 flex-col gap-1.5">
          <span className="h-0.5 w-full bg-gray-800" />
          <span className="h-0.5 w-full bg-gray-800" />
          <span className="h-0.5 w-full bg-gray-800" />
        </span>
      </button>
      <Link href="/" className="mr-10 shrink-0">
        <Image
          src="/images/SHOP.CO.png"
          alt="Logo"
          width={120}
          height={20}
          priority
          className="h-auto w-26 lg:w-32"
        />
      </Link>
      <div className="hidden md:flex gap-x-4.5 text-sm font-bold opacity-75">
        {links.map(({ href, label }, i) => {
          return (
            <Link
              key={i}
              href={href}
              className={`${activePath === href ? "text-fuchsia-950" : ""}`}
            >
              {label}
              {proLink && label === "Shop" && (
                <i className="fas fa-caret-down text-xs ml-1"></i>
              )}
            </Link>
          );
        })}
      </div>
      <aside
        className={`fixed left-0 top-0 z-40 h-lvh w-72 text-gray-100 bg-black/95 p-6 shadow-xl transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="text-lg font-bold">Menu</span>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
            className="rounded-full size-6 ring-1 ring-black ring-offset-1 hover:bg-black"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {links.map(({ href, label }, i) => (
            <Link
              key={i}
              href={href}
              onClick={() => setIsOpen(false)}
              className={activePath === href ? "text-fuchsia-950" : ""}
            >
              {label}
            </Link>
          ))}
        </div>
      </aside>
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
        <Link href={"/cart"}>
          <i className="fas fa-shopping-cart mr-3"></i>
        </Link>
        <Link href={"#"}>
          <i className="far fa-user-circle"></i>
        </Link>
      </div>
    </nav>
  );
}
