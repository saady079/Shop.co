import Btn from "../button";
import Image from "next/image";

export default function NewsLetter() {
  return (
    <>
      <div className="-mb-25 mx-auto w-5/6">
        <div className="bg-black rounded-3xl px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white font-integ text-3xl md:text-4xl uppercase max-w-lg ">
            Stay upto date about our latest offers
          </p>

          <div className="flex flex-col gap-3 w-full md:w-auto relative">
            <span>
              <Image
                src="/images/email.png"
                alt="email"
                width={24}
                height={24}
                className=" absolute top-1/5 left-4 "
              />
            </span>
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-white rounded-full pl-12 py-3 outline-none w-full md:w-80"
            />
            <Btn className="w-full md:w-80">
              Subscribe to Newsletter
            </Btn>
          </div>
        </div>
      </div>
    </>
  );
}
