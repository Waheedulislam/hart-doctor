"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { IArticle } from "@/types/Article";
import NMPageHeader from "@/components/shared/NMPageHader/NMPageHader";
import Link from "next/link";

interface ArticleDetailsProps {
  article: IArticle;
}

export function ArticleDetails({ article }: ArticleDetailsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-red-50 text-gray-900">
      {/* Navigation */}
      <div className="mb-20">
        <NMPageHeader
          title="CPR Awareness & Training"
          backgroundImage="https://images.stockcake.com/public/5/9/b/59b94f87-31fc-47ec-83ac-6e2321aabce8_large/medical-team-discussion-stockcake.jpg"
          breadcrumb={[{ label: "Home", href: "/" }, { label: "CPR Article" }]}
        />
      </div>
      <main className="max-w-6xl mx-auto px-6 py-12">
        <article className="space-y-12">
          {/* Header */}
          <header className="space-y-4">
            <Badge className="px-4 py-1 bg-gradient-to-r from-red-500 to-rose-500 text-white font-medium rounded-full">
              {article.category || "Health & Safety"}
            </Badge>
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
              {article.title || "Learn CPR: Save Lives with Every Beat"}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              {article.description ||
                "Cardiopulmonary resuscitation (CPR) is a life-saving technique that can make the difference in emergencies. Understanding CPR is essential for everyone."}
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-4 mt-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={`/placeholder.svg?height=48&width=48&query=${
                    article.author || "CPR Expert"
                  }`}
                  alt={article.author || "CPR Expert"}
                />
                <AvatarFallback>
                  {(article.author || "CPR Expert")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{article.author || "Jane Doe"}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime || "5 min read"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>2.3k</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>56</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-lg group">
            <Image
              src={
                article.image ||
                "https://images.stockcake.com/public/5/9/b/59b94f87-31fc-47ec-83ac-6e2321aabce8_large/medical-team-discussion-stockcake.jpg"
              }
              alt={article.title || "CPR Training"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-800 space-y-6">
            <p>
              CPR (Cardiopulmonary Resuscitation) is a critical emergency
              procedure that helps maintain blood flow to the brain and heart
              during sudden cardiac arrest. Immediate CPR can dramatically
              increase survival rates.
            </p>

            <blockquote className="border-l-4 border-red-500 pl-6 italic text-gray-700 bg-red-50/50 p-4 rounded-lg">
              Every second counts. Knowing CPR can save a life – it’s more than
              skill, it’s a responsibility.
            </blockquote>

            <h3 className="text-2xl font-bold text-gray-900">
              Steps to Perform CPR
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Check responsiveness and call emergency services immediately.
              </li>
              <li>Open the airway and check for breathing.</li>
              <li>Start chest compressions at a rate of 100–120 per minute.</li>
              <li>Provide rescue breaths if trained and confident.</li>
              <li>
                Continue until help arrives or the person regains consciousness.
              </li>
            </ul>

            <p>
              Regular CPR training ensures you are prepared to act confidently
              in emergencies. Communities with trained individuals see
              significantly higher survival rates in cardiac arrest cases.
            </p>

            <h3 className="text-2xl font-bold text-gray-900">Key Highlights</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>CPR can double or triple a person’s chance of survival.</li>
              <li>Hands-only CPR is effective for untrained bystanders.</li>
              <li>
                Early intervention is critical: call emergency services first.
              </li>
            </ul>
          </div>

          {/* Footer / Call-to-Action */}
          <div className="mt-16 pt-12 border-t border-gray-200 text-center space-y-6">
            <h3 className="text-2xl font-bold">Get Trained Today</h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              Join our CPR courses or workshops to gain practical skills that
              can save lives. Empower yourself and your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about">
                <Button className="bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white font-semibold rounded-lg shadow-lg px-6 py-3 transition-transform transform hover:scale-105">
                  About Us
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-white border-2 border-teal-500 text-teal-600 font-semibold rounded-lg shadow-md px-6 py-3 hover:bg-teal-50 hover:scale-105 transition-transform transform">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
