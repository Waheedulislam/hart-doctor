"use client";

import { useEffect, useState } from "react";
import NMPageHeader from "@/components/shared/NMPageHader/NMPageHader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { IArticle } from "@/types/Article";
import Image from "next/image";
import { getAllArticle } from "@/services/Article";

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
    <div>
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
          <p className="text-center col-span-3">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card
                key={article._id}
                className="transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-2 hover:border-teal-500 cursor-pointer rounded-3xl overflow-hidden"
              >
                {/* Card Header with Image */}
                <div className="relative w-full h-56 overflow-hidden rounded-t-3xl -mt-7">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover rounded-t-3xl"
                  />
                </div>

                {/* Card Content */}
                <CardContent className="pt-4">
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {article.title}
                  </CardTitle>
                  <p className="text-gray-600 mt-2 line-clamp-3">
                    {article.excerpt}
                  </p>
                </CardContent>

                {/* Card Footer */}
                <CardFooter className="flex flex-col gap-2 pt-2">
                  <div className="flex justify-between text-gray-500 text-sm font-medium">
                    <span>{article.author}</span>
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                    <span>{article.readTime} read</span>
                  </div>
                  <a
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium text-center hover:bg-teal-600 transition-colors"
                  >
                    View Details
                  </a>
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
