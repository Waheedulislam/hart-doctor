"use client";
import Link from "next/link";
import { Clock, ChevronRight, CalendarDays, UserRound } from "lucide-react";
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
import { BlogPost } from "@/types/BlogPost";

// Default posts
const defaultPosts: BlogPost[] = [
  {
    id: 1,
    title: "Hands-only CPR: Learn the basics in 2 minutes",
    excerpt:
      "The first 2 minutes are critical when the heart stops. Here are guideline-based, hands-on tips you can apply immediately.",
    date: "2025-08-01",
    readTime: "4 min",
    author: "Dr. Ayesha Rahman",
    category: "Basics",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuS0uEluNre4mVdeItbCeyEy5J5Z9JeJUNQ2r0nd4U98WWB_19GPjKmdL3cIJvfE_zObI&usqp=CAU",
    href: "#",
  },
  {
    id: 2,
    title: "Common CPR mistakes and how to avoid them",
    excerpt:
      "Compression depth, rate, and hand position—these are where most errors happen. Learn simple fixes that improve outcomes.",
    date: "2025-07-24",
    readTime: "5 min",
    author: "Nurse S. Chowdhury",
    category: "Tips",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkukDIv6t3-WxXISEm26kWxy5MI0wxXFyb2Q&s",
    href: "#",
  },
  {
    id: 3,
    title: "CPR differences: infants, children, and adults",
    excerpt:
      "Technique varies across ages. See what to adjust depending on the situation to stay safe and effective.",
    date: "2025-06-30",
    readTime: "6 min",
    author: "Paramedic R. Khan",
    category: "Pediatrics",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8FkCxeovqEj1FuapVexgUXY8AxTUSUNF9dQnbGigRi6wRKUTBQKwpzLDMSQ9TELfFXTQ&usqp=CAU",
    href: "#",
  },
  {
    id: 4,
    title: "CPR differences: infants, children, and adults",
    excerpt:
      "Technique varies across ages. See what to adjust depending on the situation to stay safe and effective.",
    date: "2025-06-30",
    readTime: "6 min",
    author: "Paramedic R. Khan",
    category: "Pediatrics",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7jLWHDm6tb-dKsIDDsXyMttgWzsTo9sqSeQ&s",
    href: "#",
  },
];

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group relative overflow-hidden border-0 bg-white shadow-sm ring-1 ring-neutral-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 dark:bg-neutral-900 dark:ring-neutral-800">
      {/* Image */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={`Article image for ${post.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute left-3 top-3">
          <Badge className=" bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            #{post.category}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-4 text-xs text-white">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>
      </div>

      {/* Content */}
      <CardHeader className="p-5 pb-3">
        <CardTitle className="line-clamp-2 text-lg font-semibold">
          {post.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {post.excerpt}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 pt-0">
        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          <UserRound className="h-4 w-4" />
          <span>{post.author}</span>
        </div>
      </CardContent>

      <CardFooter className="px-5 pt-3 pb-5">
        <Button
          asChild
          variant="ghost"
          className="group/button ml-auto gap-1 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
        >
          <Link href={post.href}>
            Read more
            <ChevronRight className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function BlogSection({
  title = "CPR Blog",
  subtitle = "Right action at the right time—learn, share, and save lives.",
  posts = defaultPosts,
  ctaHref = "#",
}) {
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
            <Link href="/blog">View all posts</Link>
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
          spaceBetween={30} // increased gap
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
          className="[--swiper-navigation-color:theme(colors.emerald.600)] [--swiper-pagination-color:theme(colors.teal.500)] bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id}>
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
