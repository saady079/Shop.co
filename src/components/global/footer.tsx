import Link from "next/link";
import Image from "next/image";
import Container from "../constant/container";

const logo = [
  { img: "/images/logo-twitter 2.png" },
  { img: "/images/logo-fb.png" },
  { img: "/images/logo-instagram.png" },
  { img: "/images/logo-github.png" },
];

const badge = [
  { img: "/images/Visa.png" },
  { img: "/images/Mastercard.png" },
  { img: "/images/Paypal.png" },
  { img: "/images/pay.png" },
  { img: "/images/G-Pay.png" },
];

const footerCol = [
  {
    title: "Company",
    links: ["About", "Features", "Works", "Career"],
  },
  {
    title: "Help",
    links: [
      "Customer Support",
      "Delivery Details",
      "Terms & Conditions",
      "Privacy Policy",
    ],
  },
  {
    title: "FAQ",
    links: ["Account", "Manage Deliveries", "Orders", "Payments"],
  },
  {
    title: "Resources",
    links: [
      "Free eBooks",
      "Development Tutorial",
      "How to - Blog",
      "Youtube Playlist",
    ],
  },
];
export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#F0F0F0] pb-8 pt-28 lg:pt-36">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] lg:gap-10">
          {/* لوگو و توضیحات */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Image
              src="/images/SHOP.CO.png"
              alt="logo"
              width={167}
              height={23}
              className="h-auto w-36 lg:w-41.75"
            />
            <p className="mb-4 mt-4 w-full max-w-sm text-sm text-black/60 lg:mt-6 lg:w-2/3">
              We have clothes that suits your style and which you&apos;re proud
              to wear. From women to men.
            </p>
            <div className="mt-6 flex gap-3 lg:mt-9">
              {logo.map(({ img }, i) => (
                <span
                  key={i}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/20 text-xs ${
                    i == 1 ? "bg-black" : "bg-white"
                  }`}
                >
                  <Image src={img} alt="logo" width={10} height={10}/>
                </span>
              ))}
            </div>
          </div>

          {/* ستون‌های لینک */}
          {footerCol.map((column) => (
            <div key={column.title} className="min-w-0">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest lg:mb-6">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-3 lg:gap-4">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-black/60 transition-colors hover:text-black"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* کپی‌رایت و پرداخت */}
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-black/10 pt-6 md:flex-row md:justify-between lg:mt-12">
          <p className="text-center text-sm text-black/60">
            Shop.co © 2000-2023, All Rights Reserved
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {badge.map(({ img }, i) => (
              <span
                key={i}
                className="flex items-center justify-center rounded bg-white px-2 py-1 text-xs"
              >
                <Image src={img} alt="badge" height={10} width={32} />
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
