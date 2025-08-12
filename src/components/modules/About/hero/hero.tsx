"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutHero() {
  return (
    <header className="relative overflow-hidden border-b ">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 to-white"
      />
      <div className="md:px-6 max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-8 py-12 sm:py-16 lg:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-900">
              Since April 2011
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              About the Institute of Healthcare Development (IHD)
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              IHD is the first affiliated International Training Center (ITC) of
              the American Heart Association (AHA) in Bangladesh, providing AHA
              courses for Physicians, Nurses, and other Healthcare Providers
              since April 2011.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/courses">Explore AHA Courses</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              American Heart Association and AHA are registered trademarks of
              the American Heart Association, Inc.
            </p>
          </div>
          <div className="relative">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[680px] overflow-hidden rounded-xl border bg-white shadow-sm">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSSvagjyQ0TGHmMmpqCDY6Q0KjYUO6Nqnbhw&s"
                alt="Healthcare providers participating in an AHA training session"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
