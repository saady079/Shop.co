"use client";
import { SearchField } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import close from "../../../public/images/close.png";
import { usePathname } from "next/navigation";

export default function Menu() {
  const links = [
    { href: "/", label: "Shop" },
    { href: "/on-sale", label: "On Sale" },
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/brands", label: "Brands" },
  ];

  const proLink = links[0].label.includes("Shop");
  const activePath = usePathname();
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-black">
        <div className="relative flex justify-center items-center py-3 text-[14px]">
          <p className="text-white text-center">
            Sign up and get 20% off to your first order.
            <Link
              href=""
              className="underline underline-offset-4 decoration-1 ml-1"
            >
              Sign Up Now
            </Link>
          </p>
          <div className="absolute right-10">
            <Image src={close} alt="close" width={20} height={20}/>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-3 bg-white border border-b-gray-200">
        <Link href="/" className="mr-10">
          <Image
            src="/images/SHOP.CO.png"
            alt="Logo"
            width={120}
            height={20}
            priority
          />
        </Link>
        <nav className="flex text-sm font-bold opacity-75">
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
        </nav>
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
        <div className="flex">
          <i className="fas fa-shopping-cart text-xl mr-3"></i>
          <i className="far fa-user-circle text-xl"></i>
        </div>
      </div>
    </header>
  );
}
