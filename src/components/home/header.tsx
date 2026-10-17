import Image from "next/image";
import poster from "../../../public/images/poster.jpg";
import Btn from "../button";

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
      <section className="flex px-10 bg-[#F3F0F1] h-150">
        <div className="flex flex-col justify-center items-center w-1/2">
          <div className="w-lg">
            <span className="text-6xl font-integ w-[60%] font-[1000]">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </span>
            <p className="text-justify opacity-75 my-3">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <Btn variant="dark" className="active:bg-zinc-900">
              Show Now
            </Btn>
            <div className="flex gap-12 mt-10 divide-x divide-fuchsia-950">
              {status.map(({ number, label }, i) => (
                <div key={i} className="flex flex-col items-start pr-6">
                  <span className="text-4xl font-bold">{number}</span>
                  <span className="text-base opacity-80 font-light mt-1">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center w-1/2">
          <Image
            src={poster}
            alt="poster"
            width={388}
            height={150}
            className="object-cover"
            priority
          />
        </div>
      </section>
      <div className="flex justify-evenly items-center w-full text-white bg-black py-10">
        {brands.map(({ src, width, height }, i) => (
          <Image key={i} alt="brand" src={src} width={width} height={height} />
        ))}
      </div>
    </>
  );
}
