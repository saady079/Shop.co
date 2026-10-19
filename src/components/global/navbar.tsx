"use client";
import Image from "next/image";
import Link from "next/link";
import close from "../../../public/images/close.png";
import { MouseEventHandler, useState } from "react";
import NavbarOrg from "./navbarOrg";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose: MouseEventHandler<HTMLButtonElement> = () => {
    setIsVisible(false);
  };

  return (
    <header className="z-50 sticky top-0">
      {isVisible ? (
        <>
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
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close container"
                  className="border border-white cursor-pointer"
                >
                  <Image src={close} alt="close" width={15} height={15} />
                </button>
              </div>
            </div>
          </div>
          <NavbarOrg />
        </>
      ) : (
        <NavbarOrg />
      )}
    </header>
  );
}
