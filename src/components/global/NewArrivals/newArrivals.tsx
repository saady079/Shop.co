import "./newArrivals.css";
import Image from "next/image";
import NewArrivalsSkeleton from "./newArrivalsSkeleton";
import { Suspense } from "react";
import Btn from "../../button";
import getProducts from "@/lib/getProducts";

export default async function NewArrivals({title}:{title:string}) {
  const data = await getProducts();
  const newProducts = data.filter((pro) => pro.isNew === true);

  return (
    <Suspense fallback={<NewArrivalsSkeleton />}>
      <section className="h-lvh bg-[#ffffff]">
        <div className=" px-5 py-8">
          <h1 className="font-integ font-[950] text-3xl md:text-5xl text-center mt-9">
            {title}
          </h1>
          <div className="flex items-center gap-x-5 justify-center h-100 my-10">
            {newProducts.map((pro) => {
              console.log(pro.image);
              return (
                <div
                  key={pro._id}
                  className="cursor-pointer w-55.5 h-3/4 relative rounded-xl shadow-md"
                >
                  <Image
                    src={pro?.image}
                    alt={pro.title}
                    width={100}
                    height={100}
                    style={{ objectFit: "cover" }}
                    className="w-full h-full rounded-xl"
                    unoptimized
                  />
                  <div className="card w-full bottom-0 relative">
                    <h2 className={`innerText`}>{pro.title}</h2>
                    <p className={`innerText`}>${pro.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-5">
            <Btn variant="light">View All</Btn>
          </div>
          <hr className="w-2/3 m-auto font-black" />
        </div>
      </section>
    </Suspense>
  );
}
