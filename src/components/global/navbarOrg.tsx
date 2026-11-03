"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchField } from "@heroui/react";
import { useState } from "react";

const links = [
  { href: "/shop", label: "Shop", hasMenu: true },
  { href: "/on-sale", label: "On Sale" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/brands", label: "Brands" },
];

function Search({ className = "" }: { className?: string }) {
  return (
    <SearchField className={className} name="docs" variant="secondary">
      <SearchField.Group className="rounded-xl bg-mauve-100">
        <SearchField.SearchIcon className="text-muted" />
        <SearchField.Input
          className="placeholder:text-muted"
          placeholder="Search for products..."
        />
        <SearchField.ClearButton className="text-muted" />
      </SearchField.Group>
    </SearchField>
  );
}

export default function NavbarOrg() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = (href: string) =>
    pathname === href ? "text-fuchsia-950" : "hover:text-fuchsia-950";

  return (
    <nav className="relative flex w-full justify-between items-center gap-2 rounded-xl border border-gray-100 bg-white/80 px-3 py-3 shadow-sm backdrop-blur sm:gap-4 sm:px-4 lg:rounded-2xl">
      {/* Hamburger (mobile only) */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        className="shrink-0 rounded-md border border-gray-300 p-1.5 hover:bg-gray-100 md:hidden"
      >
        <span className="flex w-4 flex-col gap-1.5">
          <span className="h-0.5 bg-gray-800" />
          <span className="h-0.5 bg-gray-800" />
          <span className="h-0.5 bg-gray-800" />
        </span>
      </button>

      <Link href="/" className="shrink-0">
        <Image
          src="/images/SHOP.CO.png"
          alt="Logo"
          width={120}
          height={20}
          priority
          className="h-auto w-20 sm:w-24 lg:w-32"
        />
      </Link>

      {/* Desktop links */}
      <div className="hidden items-center gap-4 text-xs lg:text-[15px] font-bold opacity-75 md:flex sm:gap-3 lg:gap-5">
        {links.map(({ href, label, hasMenu }) => (
          <Link
            key={href}
            href={href}
            className={`whitespace-nowrap ${linkClass(href)}`}
          >
            {label}
            {hasMenu && <i className="fas fa-caret-down ml-1 text-xs" />}
          </Link>
        ))}
      </div>

      {/* Desktop search (hidden on mobile) */}
      <Search className="hidden min-w-0 max-w-64 flex-1  md:block" />

      <div className="flex shrink-0 gap-3 text-xl">
        <Link href="/cart">
          <i className="fas fa-shopping-cart" />
        </Link>
        <Link href="#">
          <i className="far fa-user-circle" />
        </Link>
      </div>

      {/* Mobile menu */}
      <aside
        aria-hidden={!isOpen}
        className={`absolute inset-x-0 top-full z-40 mt-2 rounded-xl bg-black/95 p-6 text-gray-100 shadow-lg transition duration-300 md:hidden ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <div className="mb-5 flex items-center justify-between border-b border-gray-700 pb-4">
          <span className="text-lg font-bold">Menu</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
            className="size-7 rounded-full ring-1 ring-gray-600 hover:bg-gray-800"
          >
            ✕
          </button>
        </div>

        <Search className="mb-5 w-full" />

        <div className="flex flex-col gap-5">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={pathname === href ? "text-fuchsia-950" : ""}
            >
              {label}
            </Link>
          ))}
        </div>
      </aside>
    </nav>
  );
}
