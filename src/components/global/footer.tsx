import Link from "next/link";
import Image from "next/image";

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
    <footer className="bg-[#0000001A] border-t border-black/10 pt-35 pb-8">
      <div className="w-5/6 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-8 ">
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/images/SHOP.CO.png"
              alt="logo"
              width={167}
              height={23}
            />
            <p className="text-black/60 text-sm mb-4 mt-6 w-2/3">
              We have clothes that suits your style and which you&apos;re proud
              to wear. From women to men.
            </p>
            <div className="flex gap-3 mt-9">
              {logo.map(({ img }, i) => (
                <span
                  key={i}
                  className={`w-8 h-8 rounded-full border border-black/20 flex items-center justify-center text-xs 
               ${i === 1 ? "bg-black" : "bg-white"}`}
                >
                  <Image src={img} alt="logo" width={10} height={11} />
                </span>
              ))}
            </div>
          </div>

          {footerCol.map(({ links, title }, i) => (
            <div key={i}>
              <h4 className="font-semibold uppercase text-sm mb-4 tracking-wide">
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-black/60 text-sm hover:text-black transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-black/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="opacity-65 text-sm">
            Shop.co © 2000-2023, All Rights Reserved
          </p>
          <div className="flex gap-2">
            {badge.map(({ img }, i) => (
              <span
                key={i}
                className="text-xs bg-white rounded px-2 py-1 flex items-center justify-center"
              >
                <Image src={img} alt="badge" height={10} width={32} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
