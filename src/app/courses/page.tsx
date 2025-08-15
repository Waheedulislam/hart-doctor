/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // <- Add this at the very top

import CallToAction from "@/components/modules/Contact/CallToAction/CallToAction";
import NMPageHeader from "@/components/shared/NMPageHader/NMPageHader";
import { Button } from "@/components/ui/button";
import { getAllCourses } from "@/services/Courses";
import { ICourses } from "@/types/Courses";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CoursePage = () => {
  const [courses, setCourses] = useState<ICourses[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(courses);
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
    <div>
      <NMPageHeader
        title="Our Courses"
        backgroundImage="https://images.stockcake.com/public/5/9/b/59b94f87-31fc-47ec-83ac-6e2321aabce8_large/medical-team-discussion-stockcake.jpg"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Our Courses" }]}
      />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="group relative overflow-hidden rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl
                        shadow-lg hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-teal-400
                        hover:-translate-y-1"
            >
              <div className="relative w-full h-56">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover rounded-t-2xl transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500 rounded-t-2xl" />
              </div>

              <div className="p-6 space-y-3 relative z-10">
                <h3 className="text-xl font-extrabold bg-gradient-to-r from-teal-500 to-emerald-400 bg-clip-text text-transparent">
                  {course.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  Duration: {course.duration}
                </p>
                <p className="text-gray-900 dark:text-white font-bold text-lg">
                  ৳ {course.price}
                </p>
                <Link key={course._id} href={`/courses/${course._id}`}>
                  <Button
                    className="w-full mt-3 bg-gradient-to-r from-teal-500 to-emerald-400 text-white px-6 py-3 rounded-lg font-semibold
                             hover:from-teal-600 hover:to-emerald-500 shadow-lg hover:shadow-teal-400/40 transition-all duration-300"
                  >
                    DETAILS
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <CallToAction />
        </div>
      </section>
    </div>
  );
};

export default CoursePage;
