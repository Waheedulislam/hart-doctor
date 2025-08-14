/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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
import { Star, User, Briefcase } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";

import NMPageHeader from "@/components/shared/NMPageHader/NMPageHader";
import ReviewsSection from "./customer-review/page";
import { TReview } from "@/types/Review";
import { createReview } from "@/services/Review/Review";

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
  // Form state
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(5);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
      setErrors({});
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const isFormValid =
    title.length >= 3 &&
    name.length >= 2 &&
    description.length >= 5 &&
    rating >= 1;

  return (
    <div className="min-h-screen">
      <div className="mb-12">
        <NMPageHeader
          title="Manage Review"
          backgroundImage="https://images.stockcake.com/public/5/9/b/59b94f87-31fc-47ec-83ac-6e2321aabce8_large/medical-team-discussion-stockcake.jpg"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Manage Review" },
          ]}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Post Review Form */}
        <Card className="mb-12 shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Share Your Experience
            </CardTitle>
            <CardDescription className="text-lg text-slate-600 dark:text-slate-300">
              Help others by sharing your valuable feedback
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4" /> Review Title *
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      validateField("title", e.target.value);
                    }}
                    placeholder="Enter title..."
                  />
                  {errors.title && (
                    <p className="text-red-600 text-sm">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <User className="w-4 h-4" /> Your Name *
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      validateField("name", e.target.value);
                    }}
                    placeholder="Enter name..."
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Role / Profession
                  </label>
                  <Input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Optional"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    Avatar URL
                  </label>
                  <Input
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="Optional"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold">Description *</label>
                  <Textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      validateField("description", e.target.value);
                    }}
                    placeholder="Write your review..."
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-red-600 text-sm">{errors.description}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Rating *</label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  />
                </div>
              </div>

              <Button type="submit" disabled={!isFormValid}>
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Display Reviews Section */}
        {/* <ReviewsSection /> */}
      </div>
    </div>
  );
}
