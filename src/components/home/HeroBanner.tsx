import Image from "next/image";
import Link from "next/link";
import { IoBagHandleOutline } from "react-icons/io5";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-secondary w-full">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 lg:flex-row lg:px-8">
        {/* Left content */}
        <div className="flex flex-1 flex-col justify-center py-16 lg:py-24">
          <h1 className="max-w-md font-serif text-5xl leading-tight tracking-tight text-primary md:text-6xl lg:text-[68px] lg:leading-[1.1]">
            Your trusted care now and always
          </h1>
          <p className="mt-6 max-w-75 text-sm leading-relaxed text-primary/70">
            For the best results, align your health needs with your medication
            plan.
          </p>
          <div className="mt-8">
            <Link
              href="/medicines"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <IoBagHandleOutline className="h-4 w-4" />
              Shop now
            </Link>
          </div>
        </div>

        {/* Right image */}
        <div className="relative flex flex-1 items-end justify-center">
          {/* Background arc/circle */}
          <div className="absolute bottom-0 left-1/2 h-105 w-105 -translate-x-1/2 rounded-full bg-primary/4 md:h-120 md:w-120" />
          <Image
            src="/HomeBanner.png"
            alt="Medicine bottles and capsules"
            width={600}
            height={500}
            className="relative z-10 h-auto w-full max-w-130 object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
