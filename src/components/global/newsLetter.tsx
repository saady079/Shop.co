import Btn from "../ui/button";
import Image from "next/image";
import Container from "../ui/container";

export default function NewsLetter() {
  return (
    <Container>
      <div className="relative z-10 -mb-20 lg:-mb-24">
        <div className="flex flex-col gap-6 rounded-3xl bg-black px-6 py-8 md:flex-row md:items-center md:justify-between md:px-16 md:py-12">
          <p className="max-w-md font-integ text-3xl uppercase leading-tight text-white md:text-3xl lg:text-5xl">
            Stay upto date about our latest offers
          </p>

          <div className="flex w-full flex-col gap-3 md:w-80 md:shrink-0">
            <div className="relative">
              <Image
                src="/images/email.png"
                alt="email"
                width={24}
                height={24}
                className="absolute left-4 top-1/2 -translate-y-1/2"
              />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-full bg-white py-3 pl-12 pr-4 outline-none"
              />
            </div>
            <Btn variant="light" className="w-full sm:w-full">
              Subscribe to Newsletter
            </Btn>
          </div>
        </div>
      </div>
    </Container>
  );
}
