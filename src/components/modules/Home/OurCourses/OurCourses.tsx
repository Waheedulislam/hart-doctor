/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllCourses } from "@/services/Courses";
import { useEffect, useState } from "react";
import { ICourses } from "@/types/Courses";
import Link from "next/link";

export default function OurCourses() {
  const [courses, setCourses] = useState<ICourses[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data?.data?.result || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-red-600 font-semibold text-lg">{error}</p>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-6xl md:text-7xl font-medium bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-12 text-center">
        Our Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Card
            key={course._id}
            className="rounded-2xl overflow-hidden shadow-lg border hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-emerald-500 "
          >
            <div className="relative w-full h-56 -mt-10">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <Link key={course._id} href={`/courses/${course._id}`}>
                <h3 className="text-lg md:text-xl lg:text-lg font-semibold leading-snug cursor-pointer hover:text-t">
                  {course.title.length > 28
                    ? `${course.title.slice(0, 32)}...`
                    : course.title}
                </h3>
              </Link>
            </CardHeader>
            <CardContent>
              <p className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent font-semibold">
                Duration: {course.duration}
              </p>
              <p className="text-gray-700 mt-2">৳ {course.price}</p>
            </CardContent>

            <Link key={course._id} href={`/courses/${course._id}`}>
              <Button
                className="w-[calc(100%-2rem)] mx-4 mt-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold py-3 rounded-xl 
                transition-transform transform hover:scale-105 hover:from-emerald-700 hover:to-teal-600 cursor-pointer"
              >
                DETAILS
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
