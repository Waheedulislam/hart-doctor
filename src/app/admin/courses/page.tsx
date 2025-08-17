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
import { MessageSquare, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";
import NMPageHeader from "@/components/shared/NMPageHader/NMPageHader";
import { courseValidationSchema } from "@/components/validationSchema/courseValidationSchema";
import { createCourse } from "@/services/Courses";
import { ICourses } from "@/types/Courses";

// Password for admin image uploads
const REQUIRED_PASSWORD = "mySecret123";

export default function ReviewsPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<ICourses>({
    title: "",
    duration: "",
    image: "",
    price: 0,
    description: "",
    securePassword: "",
    learnDescription: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const isPasswordCorrect = (val: string) => val === REQUIRED_PASSWORD;

  const uploadImageToImgBB = async (file: File) => {
    if (!isPasswordCorrect(formData.securePassword)) {
      setErrors((prev) => ({
        ...prev,
        securePassword:
          "Incorrect password. Please enter the correct password to upload.",
      }));
      toast.error("Password incorrect. Image upload blocked.");
      return;
    }

    try {
      setIsUploading(true);
      setSelectedFileName(file.name);

      const imgForm = new FormData();
      imgForm.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: imgForm,
        }
      );

      const imgData = await res.json();
      if (imgData?.success && imgData?.data?.url) {
        handleChange("image", imgData.data.url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch (err: any) {
      toast.error(err?.message || "Image upload error");
    } finally {
      setIsUploading(false);
    }
  };

  const validateField = (field: keyof ICourses, value: string | number) => {
    if (field === "securePassword") {
      const msg =
        typeof value === "string" && value.length === 0
          ? "Secure password is required"
          : typeof value === "string" && !isPasswordCorrect(value)
          ? "Incorrect password"
          : "";
      setErrors((prev) => ({ ...prev, securePassword: msg }));
      return;
    }

    const singleFieldSchema = courseValidationSchema.pick({
      [field]: true,
    } as any);
    const parsed = singleFieldSchema.safeParse({ [field]: value } as any);
    setErrors((prev) => ({
      ...prev,
      [field]: parsed.success ? "" : parsed.error.issues[0].message,
    }));
  };

  const handleChange = (field: keyof ICourses, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isPasswordCorrect(formData.securePassword)) {
      setErrors((prev) => ({
        ...prev,
        securePassword: "Incorrect password",
      }));
      toast.error("Incorrect password");
      setIsSubmitting(false);
      return;
    }

    const parsed = courseValidationSchema.safeParse(formData);

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
      const result = await createCourse(parsed.data);
      if (result.success) {
        toast.success("Course submitted successfully!");
        setFormData({
          title: "",
          duration: "",
          image: "",
          price: 0,
          description: "",
          securePassword: "",
          learnDescription: "",
        });
        setSelectedFileName("");
        setErrors({});
        router.push("/admin/courses/manage-course");
      } else {
        toast.error(result.message || "Failed to submit course");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.title.length >= 1 &&
    formData.duration.length >= 1 &&
    formData.price.toString().length >= 1 &&
    formData.description.length >= 1 &&
    formData.image.length >= 1 &&
    formData.securePassword.length > 0 &&
    isPasswordCorrect(formData.securePassword) &&
    Object.values(errors).every((err) => !err);
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
            Explore Our <span className="text-orange-500">Courses</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock new skills and knowledge with our curated courses. Learn at
            your own pace and enhance your expertise across multiple domains.
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
          <div className="bg-gradient-to-r from-orange-400 to-amber-500 h-2"></div>

          <CardHeader className="text-center pb-8 pt-8">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Discover Our Courses
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Learn new skills and grow with our curated courses.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Title *
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      placeholder="Enter title"
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

                  {/* Author */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      duration *
                    </label>
                    <Input
                      value={formData.duration}
                      onChange={(e) => handleChange("duration", e.target.value)}
                      placeholder="e.g., John Doe"
                      className={
                        errors.duration ? "border-red-300" : "border-gray-200"
                      }
                    />
                    {errors.duration && (
                      <div className="flex items-center gap-1 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.duration}
                      </div>
                    )}
                  </div>
                </div>

                {/* Image upload */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Image (File) *
                  </label>
                  <div
                    className={`relative flex items-center justify-between gap-3 rounded-xl border-2 ${
                      isPasswordCorrect(formData.securePassword)
                        ? "border-dashed border-orange-300 bg-orange-50"
                        : "border-dashed border-gray-300 bg-gray-50 opacity-80"
                    } p-4`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800">
                        {selectedFileName
                          ? selectedFileName
                          : "Choose an image to upload"}
                      </span>
                      <span className="text-xs text-gray-500">
                        JPG, PNG, GIF up to ~5MB
                      </span>
                      {!isPasswordCorrect(formData.securePassword) && (
                        <span className="mt-1 text-xs text-red-600">
                          Enter the correct password to enable uploads.
                        </span>
                      )}
                    </div>

                    <label className="inline-flex">
                      <span className="px-4 py-2 text-sm rounded-lg bg-white border shadow-sm cursor-pointer hover:bg-gray-50">
                        {isUploading ? "Uploading..." : "Browse"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={
                          isUploading ||
                          !isPasswordCorrect(formData.securePassword)
                        }
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            uploadImageToImgBB(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  {errors.image && (
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.image}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    price *
                  </label>
                  <Input
                    value={formData.price}
                    onChange={(e) =>
                      handleChange("price", Number(e.target.value))
                    }
                    placeholder="Enter price"
                    className={
                      errors.price ? "border-red-300" : "border-gray-200"
                    }
                  />

                  {errors.price && (
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.price}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Description *
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    placeholder="Tell us more about this course"
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
                {/* What Will Learn in This Course */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    What Will Learn for Patients *
                  </label>
                  <Textarea
                    value={formData.learnDescription}
                    onChange={(e) =>
                      handleChange("learnDescription", e.target.value)
                    }
                    placeholder="Tell us more about what patients will learn from this course"
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

                {/* Secure Password */}
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
                  <p className="text-xs text-gray-500">
                    Hint :{" "}
                    <code className="px-1 py-0.5 bg-gray-100 rounded">mS3</code>
                  </p>
                  {errors.securePassword && (
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.securePassword}
                    </div>
                  )}
                </div>
              </div>

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

            <p className="text-sm text-center mt-10 text-slate-600 dark:text-slate-300 ">
              Want to manage all articles?{" "}
              <a
                href="/admin/courses/manage-course"
                className="text-blue-600 hover:underline"
              >
                Go to Article Management
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
