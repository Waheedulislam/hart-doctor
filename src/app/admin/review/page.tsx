/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Star,
  User,
  Briefcase,
  MessageSquare,
  Shield,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";
import NMPageHeader from "@/components/shared/NMPageHader/NMPageHader";
import { createReview } from "@/services/Review/Review";

// Review Type
type TReview = {
  _id?: string;
  title: string;
  name: string;
  role?: string;
  avatar?: string;
  description: string;
  rating: number;
  securePassword: string;
};

// Zod schema for validation
const reviewSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().optional(),
  avatar: z.string().url("Invalid URL format").optional(),
  description: z.string().min(5, "Description must be at least 5 characters"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  securePassword: z.string().min(1, "Secure password is required"),
});

export default function ReviewsPage() {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState<TReview>({
    title: "",
    name: "",
    role: "",
    avatar: "",
    description: "",
    rating: 5,
    securePassword: "",
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generic field validator
  const validateField = (field: keyof TReview, value: string | number) => {
    const singleFieldSchema = reviewSchema.pick({ [field]: true });
    const parsed = singleFieldSchema.safeParse({ [field]: value });
    setErrors((prev) => ({
      ...prev,
      [field]: parsed.success ? "" : parsed.error.issues[0].message,
    }));
  };

  // Handle input change with validation
  const handleChange = (field: keyof TReview, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const parsed = reviewSchema.safeParse(formData);

    if (!parsed.success) {
      const newErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        toast.error(issue.message);
        if (issue.path[0]) {
          newErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await createReview(parsed.data);
      if (result.success) {
        toast.success("Review submitted successfully!");
        setFormData({
          title: "",
          name: "",
          role: "",
          avatar: "",
          description: "",
          rating: 5,
          securePassword: "",
        });
        setErrors({});
        router.push("/admin/review/customer-review");
      } else {
        toast.error(result.message || "Failed to submit review");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.title.length >= 3 &&
    formData.name.length >= 2 &&
    formData.description.length >= 5 &&
    formData.rating >= 1 &&
    formData.securePassword.length > 0 &&
    Object.values(errors).every((err) => !err);

  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 rounded"
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => {
              handleChange("rating", star);
            }}
          >
            <Star
              className={`w-8 h-8 transition-colors duration-200 ${
                star <= (hoverRating || formData.rating)
                  ? "text-orange-400 fill-orange-400"
                  : "text-gray-300 hover:text-orange-200"
              }`}
            />
          </button>
        ))}
        <span className="ml-3 text-sm font-medium text-orange-600">
          {formData.rating} out of 5 stars
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="mb-12">
        <NMPageHeader
          title="Share Your Experience"
          backgroundImage="https://images.stockcake.com/public/5/9/b/59b94f87-31fc-47ec-83ac-6e2321aabce8_large/medical-team-discussion-stockcake.jpg"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: `Customer Reviews` },
          ]}
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full mb-6 shadow-lg">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            We Value Your <span className="text-orange-500">Feedback</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your experience matters to us. Share your thoughts and help us serve
            you better.
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
          <div className="bg-gradient-to-r from-orange-400 to-amber-500 h-2"></div>

          <CardHeader className="text-center pb-8 pt-8">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Tell Us About Your Experience
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Your feedback helps us improve our services
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Full Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className={
                        errors.name ? "border-red-300" : "border-gray-200"
                      }
                    />
                    {errors.name && (
                      <div className="flex items-center gap-1 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </div>
                    )}
                  </div>
                  {/* Role */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Role / Profession
                    </label>
                    <Input
                      value={formData.role}
                      onChange={(e) => handleChange("role", e.target.value)}
                      placeholder="e.g., Software Engineer, Teacher"
                    />
                  </div>
                </div>
                {/* Avatar */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Avatar URL (Optional)
                  </label>
                  <Input
                    value={formData.avatar}
                    onChange={(e) => handleChange("avatar", e.target.value)}
                    placeholder="https://example.com/your-photo.jpg"
                    className={
                      errors.avatar ? "border-red-300" : "border-gray-200"
                    }
                  />
                  {errors.avatar && (
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.avatar}
                    </div>
                  )}
                </div>
              </div>

              {/* Review Content */}
              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Review Title *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Summarize your experience"
                    className={
                      errors.title ? "border-red-300" : "border-gray-200"
                    }
                  />
                  {errors.title && (
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.title}
                    </div>
                  )}
                </div>

                {/* Rating */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Your Rating *
                  </label>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                    {renderStars()}
                  </div>
                  {errors.rating && (
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.rating}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Detailed Review *
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    placeholder="Tell us more about your experience"
                    className={
                      errors.description ? "border-red-300" : "border-gray-200"
                    }
                  />
                  {errors.description && (
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.description}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Secure Password *
                  </label>
                  <Input
                    type="password"
                    value={formData.securePassword}
                    onChange={(e) =>
                      handleChange("securePassword", e.target.value)
                    }
                    placeholder="Enter secure password"
                    className={
                      errors.securePassword
                        ? "border-red-300"
                        : "border-gray-200"
                    }
                  />
                  {errors.securePassword && (
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.securePassword}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
