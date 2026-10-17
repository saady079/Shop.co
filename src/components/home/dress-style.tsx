import Image from "next/image";
import Link from "next/link";

const frame = [
  { type: "Casual", img: "/images/casual.png", css: "col-span-2" },
  { type: "Formal", img: "/images/formal.png", css: "col-span-3" },
  { type: "Party", img: "/images/party.png", css: "col-span-3" },
  { type: "Gym", img: "/images/gym.png", css: "col-span-2" },
];

export default function DressStyle() {
  return (
    <section className="flex justify-center items-center py-9">
      <div className="w-250.75 bg-[#F0F0F0] py-10 rounded-4xl">
        <h1 className="font-[1000] font-integ text-4xl uppercase text-center">
          browse by dress style
        </h1>
        <div className="w-[90%] m-auto grid grid-cols-1 md:grid-cols-5 gap-3 mt-10">
          {frame.map(({ img, type, css }) => (
            <Link href={"/"} key={type} className={`relative ${css} h-48 md:h-72 w-full rounded-2xl overflow-hidden`}>
              <h1 className="absolute top-6 left-6 md:top-8 md:left-9 text-xl md:text-2xl font-bold z-9">{type}</h1>
              <Image
                src={img}
                alt={type}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top-right hover:scale-104 transition-transform duration-200"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
