"use client";

import { useEffect, useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getAllReview } from "@/services/Review/Review";
import { TReview } from "@/types/Review";

export default function Testimonials() {
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(reviews);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReview();
        if (data instanceof Error) {
          setError(data.message);
        } else {
          setReviews(data.data.result);
        }
      } catch (err) {
        setError("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;
  if (reviews.length === 0)
    return <p className="text-center">No reviews found.</p>;

  return (
    <div className="relative max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-6xl font-medium text-[#10B981] text-center mb-10">
        Testimonials
      </h2>

      <div className="mb-6 flex items-center justify-end gap-2">
        <Button
          ref={prevRef}
          variant="outline"
          size="icon"
          aria-label="Previous testimonial"
          className="h-10 w-10 rounded-full border-zinc-200 bg-white/80 backdrop-blur hover:bg-white dark:border-zinc-800 dark:bg-zinc-900"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          ref={nextRef}
          variant="outline"
          size="icon"
          aria-label="Next testimonial"
          className="h-10 w-10 rounded-full border-zinc-200 bg-white/80 backdrop-blur hover:bg-white dark:border-zinc-800 dark:bg-zinc-900"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation, A11y]}
        a11y={{ enabled: true }}
        aria-label="Testimonials carousel"
        spaceBetween={24}
        loop
        autoHeight
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        onBeforeInit={(swiper) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const nav = swiper.params.navigation as any;
          nav.prevEl = prevRef.current;
          nav.nextEl = nextRef.current;
        }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        breakpoints={{
          0: { slidesPerView: 1 },
          900: { slidesPerView: 2 },
        }}
        className="!pb-10"
      >
        {reviews.map((review, idx) => (
          <SwiperSlide key={idx}>
            <TestimonialCard {...review} />
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullets {
          bottom: 0.25rem;
        }
        .swiper-pagination-bullet {
          background: rgb(16 185 129 / 0.35);
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .swiper-pagination-bullet-active {
          background: rgb(16 185 129);
          transform: scale(1.1);
        }
        .swiper-button-disabled {
          opacity: 0.35;
        }
      `}</style>
    </div>
  );
}

function TestimonialCard({
  title,
  name,
  role,
  avatar,
  description,
  rating = 5,
}: TReview) {
  return (
    <Card className="h-full overflow-hidden rounded-2xl border-zinc-200/70 bg-white/90 shadow-sm ring-1 ring-black/5 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-900/80">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14 ring-2 ring-emerald-500/30">
          <AvatarImage
            src={avatar || "/placeholder.svg"}
            alt={`${name} avatar`}
          />
          <AvatarFallback>{initials(name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </p>
          <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
            {name}
            {role ? ` • ${role}` : ""}
          </p>
          <Stars count={rating} />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-pretty text-zinc-700 dark:text-zinc-300">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="mt-1 flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < count ? "text-emerald-500" : "text-zinc-300 dark:text-zinc-700"
          }`}
          fill={i < count ? "currentColor" : "none"}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">{`${count} out of 5 stars`}</span>
    </div>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return (first + last).toUpperCase();
}
