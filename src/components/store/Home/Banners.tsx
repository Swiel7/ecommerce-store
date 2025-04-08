import { Button } from "@/components/ui/button";
import { bannerContent } from "@/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Banners = () => {
  return (
    <section>
      <div className="wrapper">
        <div className="grid gap-6 md:grid-cols-2">
          {bannerContent.map(({ title, subtitle, image }, i) => (
            <div
              key={i}
              className={cn(
                "bg-muted relative flex flex-col gap-3 rounded-lg pt-6 before:absolute before:inset-0 before:bg-[url(/banners/banner-bg.svg)] before:bg-cover before:content-[''] lg:pt-7",
                i == 1 && "before:rotate-y-180",
              )}
            >
              <div
                className={cn(
                  "z-0 mb-6 px-6 text-center lg:mb-7 lg:px-8",
                  i == 1 && "order-1",
                )}
              >
                <h2 className="section-title pb-0">{title}</h2>
                <p className="text-muted-foreground mt-4 text-lg">{subtitle}</p>
                <Button asChild size="lg" className="mt-8">
                  <Link href="/products">Shop Now</Link>
                </Button>
              </div>
              <div className="relative aspect-video grow">
                <Image
                  src={image}
                  alt="Banner image"
                  placeholder="blur"
                  loading="lazy"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banners;
