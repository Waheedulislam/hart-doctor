import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { TReview } from "@/types/Review";
import ReviewCard from "./ReviewCard";

export default function ReviewsSection({ reviews }: { reviews: TReview[] }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Customer Reviews
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"} from
          our valued customers
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
            <ReviewCard
              key={review._id ?? `${review.title}-${index}`}
              review={review}
            />
          ))}
        </div>
      )}
    </div>
  );
}
