/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, User, Briefcase } from "lucide-react";
import Swal from "sweetalert2";
import type { TReview } from "@/types/Review";
import { deleteReview } from "@/services/Review/Review";

interface ReviewCardProps {
  review: TReview;
  onDelete?: (id: string) => void; // remove from UI
}

export default function ReviewCard({ review, onDelete }: ReviewCardProps) {
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteReview(id);
        if (response instanceof Error) throw response;

        Swal.fire("Deleted!", "Your review has been deleted.", "success");
        onDelete?.(id); // remove from UI
      } catch (error: any) {
        Swal.fire("Error!", error.message || "Something went wrong.", "error");
      }
    }
  };

  return (
    <Card className="group transition-all duration-300 border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:shadow-lg hover:shadow-teal-500/40 hover:scale-[1.02]">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 line-clamp-2">
              {review.title}
            </CardTitle>
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4 text-teal-500" />
                <span className="font-medium">{review.name}</span>
              </div>
              {review.role && (
                <>
                  <span>•</span>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-teal-200"
                  >
                    <Briefcase className="w-3 h-3 mr-1" />
                    {review.role}
                  </Badge>
                </>
              )}
            </div>
          </div>
          {review._id && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(review._id!)}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          {review.description}
        </p>
      </CardContent>
    </Card>
  );
}
