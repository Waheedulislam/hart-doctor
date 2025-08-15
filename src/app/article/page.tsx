"use client";

import { useEffect, useState } from "react";
import NMPageHeader from "@/components/shared/NMPageHader/NMPageHader";
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { IArticle } from "@/types/Article";
import Image from "next/image";
import { getAllArticle } from "@/services/Article";
import Link from "next/link";

const BlogPage = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Page Header */}
      <div className="mb-20">
        <NMPageHeader
          title="Our Blog"
          backgroundImage="https://images.stockcake.com/public/5/9/b/59b94f87-31fc-47ec-83ac-6e2321aabce8_large/medical-team-discussion-stockcake.jpg"
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Our Blog" }]}
        />
      </div>

      <div className="px-6 md:px-20">
        {/* Articles Section */}
        {loading ? (
          <p className="text-center py-12 text-gray-500 dark:text-gray-300">
            Loading...
          </p>
        ) : articles.length === 0 ? (
          <p className="text-center py-12 text-gray-500 dark:text-gray-300">
            No articles found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card
                key={article._id}
                className="group relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-800 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer  border border-transparent hover:border-teal-400
                        hover:-translate-y-1"
              >
                {/* Card Header with Image */}
                <div className="relative w-full h-56 -mt-10 overflow-hidden rounded-t-3xl">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                </div>

                {/* Card Content */}
                <CardContent className="pt-4 px-5">
                  <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm line-clamp-3">
                    {article.description}
                  </p>
                </CardContent>

                {/* Card Footer */}
                <CardFooter className="flex flex-col gap-3 pt-4 px-5 pb-5">
                  <div className="flex flex-col text-gray-500 dark:text-gray-400 text-sm font-medium gap-1">
                    <span>Author : {article.author}</span>
                    <span>Read Time : {article.readTime} min</span>
                  </div>
                  <Link
                    key={article._id}
                    href={`/article/${article._id}`}
                    className="mt-2 w-full text-center inline-block px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors"
                  >
                    {" "}
                    View Details
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
