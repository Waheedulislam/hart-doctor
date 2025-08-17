/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Quote } from "lucide-react";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

export interface ICourses {
  _id?: string;
  title: string;
  duration: string;
  price: number;
  image: string;
  description: string;
}

interface CourseCardProps {
  course: ICourses;
  onDelete?: (id: string) => void;
}

export const deleteCourse = async (
  courseId: string,
  password: string
): Promise<boolean | Error> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/course/${courseId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ securePassword: password }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Failed to delete course: ${res.status}`
      );
    }

    return true;
  } catch (error: any) {
    return new Error(error.message || "Something went wrong");
  }
};

export default function EnhancedCourseCard({
  course,
  onDelete,
}: CourseCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    setPasswordError(!passwordInput ? "Secure password is required" : "");
  }, [passwordInput]);

  const handleDelete = async () => {
    if (!passwordInput) return;

    const confirmDelete = await Swal.fire({
      title: "Delete Course?",
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
      const result = await deleteCourse(course._id!, passwordInput);
      if (result instanceof Error) throw result;

      Swal.fire({
        title: "Deleted!",
        text: "Course has been removed successfully.",
        icon: "success",
        confirmButtonColor: "#f97316",
        customClass: {
          popup: "rounded-xl",
          confirmButton: "rounded-lg px-6 py-2",
        },
      });

      onDelete?.(course._id!);
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
    <Card
      className="group relative overflow-hidden rounded-2xl 
      bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl 
      shadow-lg hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-orange-300
      hover:-translate-y-1"
    >
      {/* Neon overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/10 via-pink-400/10 to-purple-500/10 opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

      {/* Decorative Quote */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-25 transition-all duration-500 animate-pulse">
        <Quote className="w-16 h-16 text-orange-400 dark:text-orange-600" />
      </div>

      {/* Card Header */}
      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <CardTitle className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              {course.title}
            </CardTitle>
          </div>

          {/* Delete Button */}
          {course._id && !showPasswordInput && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPasswordInput(true)}
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 
                text-red-500 hover:text-white hover:bg-red-500 rounded-full w-10 h-10 p-0 shadow-lg hover:shadow-red-500/40 hover:scale-110"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          )}
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="relative z-10 space-y-4">
        {/* Image */}
        <div className="w-full h-56 relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
          <Image
            src={course.image}
            alt={course.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-2xl transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl" />
        </div>

        {/* Description */}
        <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mt-2">
          {course.description.length > 100
            ? course.description.slice(0, 100) + "..."
            : course.description}
        </p>

        {/* Duration & Price */}
        <div className="flex justify-between items-center mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          <span>Duration: {course.duration}</span>
          <span>Price: ${course.price}</span>
        </div>

        {/* Password Input */}
        {showPasswordInput && (
          <div className="mt-4">
            <input
              type="password"
              placeholder="Enter secure password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-slate-400 dark:bg-slate-800 dark:text-slate-100"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
            <Button
              onClick={handleDelete}
              disabled={!!passwordError || isDeleting}
              className={`mt-2 w-full text-white font-semibold rounded-lg p-3 transition-all duration-300 ${
                !!passwordError
                  ? "opacity-50 cursor-not-allowed bg-gray-300"
                  : "bg-gradient-to-r from-orange-400 to-yellow-300 hover:from-orange-500 hover:to-yellow-400 shadow-lg hover:shadow-orange-500/40"
              }`}
            >
              {isDeleting ? "Deleting..." : "Confirm Delete"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
