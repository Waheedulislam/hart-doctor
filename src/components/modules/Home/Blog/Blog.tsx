"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, UserRound, TimerOffIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
  A11y,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { IArticle } from "@/types/Article";
import { getAllArticle } from "@/services/Article";

// Blog Card Component
export function BlogCard({ post }: { post: IArticle }) {
  return (
    <Card className="group relative overflow-hidden border-0 bg-white shadow-sm ring-1 ring-neutral-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 dark:bg-neutral-900 dark:ring-neutral-800 rounded-3xl">
      {/* Image */}
      <div className="relative w-full h-56 -mt-10 overflow-hidden rounded-t-3xl">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={`Article image for ${post.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute left-3 top-3">
          <Badge className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            #{post.category}
          </Badge>
        </div>
        {/* Content */}
      </div>

      {/* Content */}
      <CardHeader className="p-5 pb-3">
        <CardTitle className="line-clamp-2 text-lg font-semibold">
          {post.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {post.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 pt-0">
        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          <UserRound className="h-4 w-4" />
          <span>Author : {post.author}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          <TimerOffIcon className="h-4 w-4" />
          <span>Read Time : {post.readTime} min</span>
        </div>
      </CardContent>

      <CardFooter className="px-5 pt-3 pb-5">
        <Button
          asChild
          variant="ghost"
          className="group/button ml-auto gap-1 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
        >
          <Link key={post._id} href={`/article/${post._id}`}>
            Read more
            <ChevronRight className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// Blog Section Component
export default function BlogSection({
  title = "CPR Blog",
  subtitle = "Right action at the right time—learn, share, and save lives.",
  ctaHref = "/blog",
}) {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getAllArticle();
        if (response.success) {
          setArticles(response.data.result);
        } else {
          console.error("Failed to fetch articles:", response.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }
  if (!articles.length)
    return <p className="text-center py-12">No articles found.</p>;

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Header */}
        <header className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent font-medium md:text-4xl">
              {title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
              {subtitle}
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="hidden sm:inline-flex bg-transparent hover:text-white hover:bg-emerald-600"
          >
            <Link href="/article">View all posts</Link>
          </Button>
        </header>

        {/* Swiper */}
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Autoplay,
            Keyboard,
            A11y,
            EffectCoverflow,
          ]}
          spaceBetween={30}
          slidesPerView={1.1}
          grabCursor
          keyboard={{ enabled: true }}
          a11y={{ enabled: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          navigation
          effect="coverflow"
          coverflowEffect={{
            rotate: 6,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 30 },
            768: { slidesPerView: 2.2, spaceBetween: 32 },
            1024: { slidesPerView: 3, spaceBetween: 36 },
          }}
          className="[--swiper-navigation-color:theme(colors.emerald.600)] [--swiper-pagination-color:theme(colors.teal.500)]"
        >
          {articles.map((post) => (
            <SwiperSlide key={post._id}>
              <BlogCard post={post} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile Button */}
        <div className="mt-6 text-center sm:hidden">
          <Button asChild variant="outline">
            <Link href={ctaHref}>View all posts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
