"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRef } from "react";
import { heroContent } from "@/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const autoplay = useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));

  return (
    <section className="bg-[url(/hero/hero-bg.svg)] bg-cover py-0">
      <div className="wrapper">
        <Carousel
          plugins={[autoplay.current]}
          opts={{ loop: true }}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={() => autoplay.current.play()}
        >
          <CarouselContent>
            {heroContent.map(({ subtitle, title, price, image }) => (
              <CarouselItem
                key={image.src}
                className="py-8 md:h-[520px] lg:h-[700px]"
              >
                <div className="grid h-full sm:grid-cols-2">
                  <div className="flex flex-col items-start justify-center py-4">
                    <p className="font-semibold uppercase lg:text-base">
                      {subtitle}
                    </p>
                    <h1 className="mt-2 text-4xl font-medium lg:mt-3 lg:text-6xl">
                      {title}
                    </h1>
                    <p className="mt-4 lg:mt-7 lg:text-lg">
                      Start at <span>{price}</span>
                    </p>
                    <Button asChild size="lg" className="mt-6 lg:mt-8">
                      <Link href="/products">Shop Now</Link>
                    </Button>
                  </div>
                  <div className="order-first mx-auto flex max-w-md items-center sm:order-last">
                    <Image src={image} alt="Hero image" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots />
        </Carousel>
      </div>
    </section>
  );
};

export default Hero;
