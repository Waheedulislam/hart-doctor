"use client";

import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUYZcKhkPv7HzpOuNw0gZoUMzSGcrlnm8LJA&s",
    alt: "Slide 1",
  },
  {
    id: 2,
    src: "https://assets.telegraphindia.com/telegraph/2022/Jul/1656670434_doctor-1.jpg",
    alt: "Slide 2",
  },
  {
    id: 3,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSSvagjyQ0TGHmMmpqCDY6Q0KjYUO6Nqnbhw&s",
    alt: "Slide 3",
  },
];

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Auto Slide Effect
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
              <div className="absolute inset-0 bg-black/40" />
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

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Our Platform
        </h1>
        <p className="max-w-2xl text-lg md:text-xl mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ea ex,
          voluptatibus delectus.
        </p>
        <div className="flex gap-4">
          <Link href="/courses">
            <Button size="lg" variant="default" className="cursor-pointer">
              Get Started
            </Button>
          </Link>
          <Link href="/about">
            <Button
              size="lg"
              variant="outline"
              className="text-black border-white cursor-pointer"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
