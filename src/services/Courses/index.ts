/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ICourses } from "@/types/Courses";

export const createCourse = async (articleData: ICourses) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/course/create-course`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
        next: {
          tags: ["ARTICLE"],
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to create article: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    return new Error(error.message || "Something went wrong");
  }
};

// get all Courses
export const getAllCourses = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/course`, {
      next: {
        tags: ["COURSES"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get single COURSES
export const getSingleCourses = async (courseId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/course/${courseId}`,
      {
        next: {
          tags: ["COURSES"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
