import Image from "next/image";
import poster from "../../../public/images/poster.jpg";
import Btn from "../constant/button";

const status = [
  { number: "200+", label: "International Brands" },
  { number: "2,000+", label: "High-Quality Products" },
  { number: "30,000+", label: "Happy Customers" },
];

const brands = [
  { src: "/images/brand1.png", width: 120, height: 25 },
  { src: "/images/brand2.png", width: 75, height: 25 },
  { src: "/images/brand3.png", width: 110, height: 25 },
  { src: "/images/brand4.png", width: 133, height: 23 },
  { src: "/images/brand5.png", width: 150, height: 25 },
];

export default function Head() {
  return (
    <>
      <section className="flex flex-col md:flex-row px-4 pt-15 lg:px-10 bg-[#F3F0F1]">
        {/* Text content */}
        <div className="flex md:w-1/2 justify-center items-center pt-13 sm:pt-10 md:pt-0">
          <div className="w-full max-w-lg">
            <h1 className="font-integ font-black text-4xl sm:text-5xl lg:text-6xl line-clamp-3">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p className="text-sm sm:text-base text-justify opacity-75 my-4">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <Btn variant="dark" className="active:bg-zinc-900">
              Show Now
            </Btn>
            {/* StatItem */}
            <div className="grid grid-cols-2 sm:grid-cols-3 sm:divide-x sm:divide-[#661066] last:divide-x-0 gap-4 sm:gap-3 mt-8">
              {status.map(({ number, label }) => (
                <div key={label} className="flex flex-col items-start sm:pr-3">
                  <span className="text-xl sm:text-xl lg:text-2xl font-bold">
                    {number}
                  </span>
                  <span className="text-xs lg:text-sm opacity-90 font-light mt-1">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Poster */}
        <div className="flex justify-center md:w-1/2">
          <Image
            src={poster}
            alt="Fashion collection poster"
            width={450}
            height={500}
            sizes="(max-width: 767px) 100vw,
              (max-width: 1023px) 50vw, 450px"
            className="w-full max-w-112.5 h-auto object-cover"
          />
        </div>
      </section>

      {/* Brand logos */}
      <div className="flex flex-wrap justify-center items-center gap-7 sm:gap-x-10 lg:gap-x-14 bg-black px-4 py-8">
        {brands.map(({ src, width, height }, i) => (
          <Image key={i} alt="Brand" src={src} width={width} height={height} />
        ))}
      </div>
    </>
  );
}
