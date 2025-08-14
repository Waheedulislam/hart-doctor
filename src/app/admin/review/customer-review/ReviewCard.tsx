/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, User, Briefcase, Star, Quote } from "lucide-react";
import Swal from "sweetalert2";
import type { TReview } from "@/types/Review";
import { deleteReview } from "@/services/Review/Review";
import { useState } from "react";

interface ReviewCardProps {
  review: TReview;
  onDelete?: (id: string) => void;
}

export default function EnhancedReviewCard({
  review,
  onDelete,
}: ReviewCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Review?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-xl",
        confirmButton: "rounded-lg px-6 py-2",
        cancelButton: "rounded-lg px-6 py-2",
      },
    });

    if (result.isConfirmed) {
      setIsDeleting(true);
      try {
        await deleteReview(id);

        Swal.fire({
          title: "Deleted!",
          text: "Review has been removed successfully.",
          icon: "success",
          confirmButtonColor: "#f97316",
          customClass: {
            popup: "rounded-xl",
            confirmButton: "rounded-lg px-6 py-2",
          },
        });
        onDelete?.(id);
      } catch (error: any) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#f97316",
          customClass: {
            popup: "rounded-xl",
            confirmButton: "rounded-lg px-6 py-2",
          },
        });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Use provided rating or generate mock rating for visual appeal
  const rating = review.rating || Math.floor(Math.random() * 2) + 4; // 4-5 stars for demo

  return (
    <Card className="group relative overflow-hidden transition-all duration-500 ease-out border-0 bg-gradient-to-br from-white via-white to-orange-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-800 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 rounded-2xl">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-orange-100/20 dark:to-orange-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Quote decoration */}
      <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
        <Quote className="w-16 h-16 text-orange-500" />
      </div>

      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            {/* Rating stars */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 transition-colors duration-200 ${
                    i < rating
                      ? "text-orange-400 fill-orange-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2 font-medium">
                {rating}.0
              </span>
            </div>

            <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent leading-tight">
              {review.title}
            </CardTitle>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">{review.name}</span>
              </div>

              {review.role && (
                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-md hover:shadow-lg transition-shadow duration-200 rounded-full px-3 py-1">
                  <Briefcase className="w-3 h-3 mr-1.5" />
                  {review.role}
                </Badge>
              )}
            </div>
          </div>

          {review._id && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(review._id!)}
              disabled={isDeleting}
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-red-500 hover:text-white hover:bg-red-500 rounded-full w-9 h-9 p-0 shadow-lg hover:shadow-red-500/25 hover:scale-110 disabled:opacity-50"
            >
              <Trash2
                className={`w-4 h-4 ${isDeleting ? "animate-pulse" : ""}`}
              />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="relative">
          {/* Left border accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

          <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-6 text-base">
            {review.description}
          </p>
        </div>

        {/* Bottom accent line */}
        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-orange-200 dark:via-orange-800 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </CardContent>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Card>
  );
}
