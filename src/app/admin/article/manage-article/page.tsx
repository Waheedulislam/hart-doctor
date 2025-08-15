/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

import type { TReview } from "@/types/Review";
import { getAllReview } from "@/services/Review/Review";
import EnhancedReviewCard from "./ReviewCard";
import NMPageHeader from "@/components/shared/NMPageHader/NMPageHader";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReview();
        setReviews(data?.data?.result || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Remove review from UI when deleted
  const handleDeleteFromUI = (id: string) => {
    setReviews((prev) => prev.filter((r) => r._id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="text-center py-12 border border-red-400">
        <CardContent>
          <p className="text-red-600 font-semibold">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-12">
        <NMPageHeader
          title="Customer Reviews"
          backgroundImage="https://images.stockcake.com/public/5/9/b/59b94f87-31fc-47ec-83ac-6e2321aabce8_large/medical-team-discussion-stockcake.jpg"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: `Customer Reviews` },
          ]}
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center my-7 text-3xl">
          <p className="text-slate-600 dark:text-slate-400">
            <span className="text-teal-700 font-bold ">{reviews.length}</span>{" "}
            {reviews.length === 1 ? "review" : "reviews"} from our valued
            customers
          </p>
        </div>

        {reviews.length === 0 ? (
          <Card className="text-center py-12 border-dashed border-2 border-slate-300 dark:border-slate-600">
            <CardContent>
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
                No reviews yet
              </h3>
              <p className="text-slate-500 dark:text-slate-500">
                Be the first to share your experience!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <EnhancedReviewCard
                key={review._id ?? `${review.title}-${index}`}
                review={review}
                onDelete={handleDeleteFromUI}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
