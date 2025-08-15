/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, User, Briefcase, Star, Quote } from "lucide-react";
import Swal from "sweetalert2";
import type { TReview } from "@/types/Review";
import { useState, useEffect } from "react";

interface ReviewCardProps {
  review: TReview;
  onDelete?: (id: string) => void;
}

// DELETE ফাংশন এখন পাসওয়ার্ড সহ body পাঠাচ্ছে
export const deleteReview = async (
  reviewId: string,
  password: string
): Promise<boolean | Error> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/${reviewId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ securePassword: password }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Failed to delete review: ${res.status}`
      );
    }

    return true;
  } catch (error: any) {
    return new Error(error.message || "Something went wrong");
  }
};

export default function EnhancedReviewCard({
  review,
  onDelete,
}: ReviewCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const rating = review.rating || Math.floor(Math.random() * 2) + 4;

  // পাসওয়ার্ড যাচাই (ফ্রন্টএন্ডে রিয়েল-টাইম)
  useEffect(() => {
    if (!passwordInput) {
      setPasswordError("Secure password is required");
    } else {
      setPasswordError(""); // ফ্রন্টএন্ডে শুধু খালি বা না-খাওয়া যাচাই
    }
  }, [passwordInput]);

  const handleDelete = async () => {
    if (!passwordInput) return;

    const confirmDelete = await Swal.fire({
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

    if (!confirmDelete.isConfirmed) return;

    setIsDeleting(true);
    try {
      const result = await deleteReview(review._id!, passwordInput);
      if (result instanceof Error) throw result;

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
      onDelete?.(review._id!);
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
      setPasswordInput("");
      setShowPasswordInput(false);
    }
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-500 ease-out border-0 bg-gradient-to-br from-white via-white to-orange-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-800 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-orange-100/20 dark:to-orange-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
        <Quote className="w-16 h-16 text-orange-500" />
      </div>

      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
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

          {review._id && !showPasswordInput && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPasswordInput(true)}
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-red-500 hover:text-white hover:bg-red-500 rounded-full w-9 h-9 p-0 shadow-lg hover:shadow-red-500/25 hover:scale-110"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-6 text-base">
            {review.description}
          </p>
        </div>

        {showPasswordInput && (
          <div className="mt-4">
            <input
              type="password"
              placeholder="Enter secure password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
            <Button
              onClick={handleDelete}
              disabled={!!passwordError || isDeleting}
              className={`mt-2 w-full text-white font-semibold rounded-lg p-2 transition-all duration-300 
                ${
                  !!passwordError
                    ? "opacity-50 cursor-not-allowed bg-gray-300"
                    : "bg-gradient-to-r from-orange-400 to-yellow-300 hover:from-orange-500 hover:to-yellow-500 shadow-lg hover:shadow-orange-500/40"
                }`}
            >
              {isDeleting ? "Deleting..." : "Confirm Delete"}
            </Button>
          </div>
        )}

        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-orange-200 dark:via-orange-800 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </CardContent>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Card>
  );
}
