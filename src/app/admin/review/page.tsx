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
  Home,
} from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";
import NMPageHeader from "@/components/shared/NMPageHader/NMPageHader";
import { createReview } from "@/services/Review/Review";

type TReview = {
  _id?: string;
  title: string;
  name: string;
  role?: string;
  avatar?: string;
  description: string;
  rating: number;
};

// Secret password (manually set)
const SECRET_PASSWORD = "mySecret123";

// Zod schema for validation
const reviewSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().optional(),
  avatar: z.string().url().optional(),
  description: z.string().min(5, "Description must be at least 5 characters"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
});

export default function ReviewsPage() {
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a single field
  const validateField = (field: string, value: string | number) => {
    const singleFieldSchema = reviewSchema.pick({ [field]: true });
    const parsed = singleFieldSchema.safeParse({ [field]: value });
    setErrors((prev) => ({
      ...prev,
      [field]: parsed.success ? "" : parsed.error.issues[0].message,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check secret password
    if (password !== SECRET_PASSWORD) {
      toast.error("Invalid secret password. You cannot submit.");
      setIsSubmitting(false);
      return;
    }

    const formData: Omit<TReview, "_id"> = {
      title,
      name,
      role,
      avatar,
      description,
      rating,
    };
    const parsed = reviewSchema.safeParse(formData);

    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => toast.error(issue.message));
      setIsSubmitting(false);
      return;
    }

    try {
      await createReview(parsed.data);
      toast.success("Review submitted successfully!");

      // Reset form
      setTitle("");
      setName("");
      setRole("");
      setAvatar("");
      setDescription("");
      setRating(5);
      setPassword("");
      setErrors({});

      router.push("/admin/review/customer-review");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    title.length >= 3 &&
    name.length >= 2 &&
    description.length >= 5 &&
    rating >= 1 &&
    password.length > 0;

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
            onClick={() => setRating(star)}
          >
            <Star
              className={`w-8 h-8 transition-colors duration-200 ${
                star <= (hoverRating || rating)
                  ? "text-orange-400 fill-orange-400"
                  : "text-gray-300 hover:text-orange-200"
              }`}
            />
          </button>
        ))}
        <span className="ml-3 text-sm font-medium text-orange-600">
          {rating} out of 5 stars
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
        {/* Hero Section */}
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

        {/* Main Form Card */}
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
              {/* Personal Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-orange-400" />
                      Full Name *
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        validateField("name", e.target.value);
                      }}
                      placeholder="Enter your full name"
                      className={`transition-all duration-200 ${
                        errors.name
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-orange-400 focus:ring-orange-100"
                      }`}
                    />
                    {errors.name && (
                      <div className="flex items-center gap-1 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-orange-400" />
                      Role / Profession
                    </label>
                    <Input
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g., Software Engineer, Teacher"
                      className="border-gray-200 focus:border-orange-400 focus:ring-orange-100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Avatar URL (Optional)
                  </label>
                  <Input
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="https://example.com/your-photo.jpg"
                    className="border-gray-200 focus:border-orange-400 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Review Content Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Your Review
                  </h3>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Star className="w-4 h-4 text-orange-400" />
                    Review Title *
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      validateField("title", e.target.value);
                    }}
                    placeholder="Summarize your experience in a few words"
                    className={`transition-all duration-200 ${
                      errors.title
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-orange-400 focus:ring-orange-100"
                    }`}
                  />
                  {errors.title && (
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.title}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Your Rating *
                  </label>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                    {renderStars()}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Detailed Review *
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us more about your experience"
                    className={`transition-all duration-200 ${
                      errors.description
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-orange-400 focus:ring-orange-100"
                    }`}
                  />
                  {errors.description && (
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.description}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-orange-400" />
                    Secret Password *
                  </label>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter the secret password"
                    className={`transition-all duration-200 ${
                      password !== SECRET_PASSWORD
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-200 focus:border-orange-400 focus:ring-orange-100"
                    }`}
                  />
                  {password !== SECRET_PASSWORD && (
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Invalid secret password
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
              {/* ✅ Extra link under form */}
              <p className="text-sm text-center text-slate-600 dark:text-slate-300 mt-4">
                Want to manage all reviews?{" "}
                <a
                  href="/admin/review/customer-review"
                  className="text-blue-600 hover:underline"
                >
                  Go to Review Management
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
