"use client";

import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bannerImage from "../../../../../public/bannerImage.png";

const slides = [
  {
    id: 1,
    src: bannerImage, // Local image
    alt: "Slide 1",
  },
  {
    id: 2,
    src: "https://www.shutterstock.com/image-vector/cpr-hands-heartbeat-line-design-600nw-2502974109.jpg", // External image
    alt: "Slide 2",
  },
  {
    id: 3,
    src: "https://www.shutterstock.com/image-photo/world-hypertension-day-adult-holds-600nw-2147317523.jpg", // External image
    alt: "Slide 3",
  },
];

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  // Arrow controls
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Auto slide every 12 seconds
  useEffect(() => {
    if (!emblaApi) return;

    const autoSlide = setInterval(() => {
      emblaApi.scrollNext();
    }, 12000);

    return () => clearInterval(autoSlide);
  }, [emblaApi]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-screen">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex-[0_0_100%] relative w-full h-screen"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority
              />
              {/* Optional overlay */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          ))}
        </div>
      </div>

      {/* Arrow Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 rounded-full hover:bg-black/70"
      >
        <ChevronLeft className="text-white w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 rounded-full hover:bg-black/70"
      >
        <ChevronRight className="text-white w-6 h-6" />
      </button>
    </section>
  );
}
