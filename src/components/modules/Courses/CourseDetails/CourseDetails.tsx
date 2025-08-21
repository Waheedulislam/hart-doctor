"use client";

import NMPageHeader from "@/components/shared/NMPageHader/NMPageHader";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Award, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Course {
  _id: string;
  title: string;
  image: string;
  price: number;
  duration: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  learnDescription: string;
  TrainingObjectives: string;
  CourseContents: string;
  WhoCanJoin: string;
}

interface CourseDetailsProps {
  course: Course;
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  console.log(course);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mb-20">
        <NMPageHeader
          title="Course Details"
          backgroundImage="https://images.stockcake.com/public/5/9/b/59b94f87-31fc-47ec-83ac-6e2321aabce8_large/medical-team-discussion-stockcake.jpg"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Course Details" },
          ]}
        />
      </div>
      <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Image Card */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
            <Image
              src={
                course?.image ||
                "/placeholder.svg?height=400&width=800&query=course"
              }
              alt={course?.title}
              width={800}
              height={400}
              className="object-cover w-full h-64 md:h-96"
            />
          </div>
          {/* About Course */}
          <section className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Description :
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>{course?.description}</p>
            </div>
          </section>
          {/* What You'll Learn */}
          <section className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Learning Description :
            </h2>
            <div className="space-y-3">
              {course?.WhoCanJoin.split(".").map((item, idx) =>
                item.trim() ? (
                  <li key={idx} className="leading-relaxed">
                    {item.trim()}
                  </li>
                ) : null
              )}
            </div>
          </section>
          {/* Training Objectives */}
          <section className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Training Objectives :
            </h2>
            <div className="space-y-3">
              {course?.WhoCanJoin.split(".").map((item, idx) =>
                item.trim() ? (
                  <li key={idx} className="leading-relaxed">
                    {item.trim()}
                  </li>
                ) : null
              )}
            </div>
          </section>

          {/* Course Contents */}
          <section className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Course Contents :
            </h2>
            <div className="space-y-3">
              {course?.CourseContents.split(".").map((item, idx) =>
                item.trim() ? (
                  <li key={idx} className="leading-relaxed">
                    {item.trim()}
                  </li>
                ) : null
              )}
            </div>
          </section>
          {/* Who Can Join */}
          <section className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Who Can Join :
            </h2>
            <div className="space-y-3">
              {course?.WhoCanJoin.split(".").map((item, idx) =>
                item.trim() ? (
                  <li key={idx} className="leading-relaxed">
                    {item.trim()}
                  </li>
                ) : null
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Info Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-teal-600 mb-2">
                {course?.price}{" "}
                <span className="text-lg font-normal text-gray-500">BDT</span>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Duration</span>
                </div>
                <span className="font-medium text-gray-900">
                  {course?.duration}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Created</span>
                </div>
                <span className="font-medium text-gray-900">
                  {new Date(course?.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-4 h-4" />
                  <span>Certificate</span>
                </div>
                <span className="font-medium text-teal-600">Included</span>
              </div>
            </div>
            <Link href="/about">
              <Button className="w-full bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white font-semibold py-3 rounded-lg transition-transform transform hover:scale-105">
                About Us
              </Button>
            </Link>
          </div>

          {/* Contact Card */}
          <div className="bg-teal-50 rounded-xl p-6 border border-teal-100 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-bold text-teal-900 mb-3">Need Help?</h3>
            <p className="text-teal-700 mb-4 text-sm">
              Have questions about this course? Contact our support team.
            </p>
            <Link href="/contact">
              <Button
                variant="outline"
                className="w-full border-teal-300 text-teal-700 hover:bg-teal-100 bg-transparent"
              >
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
