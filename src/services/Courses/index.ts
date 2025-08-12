/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// get all Courses
export const getAllCourses = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/teacher`, {
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
export const getSingleCourses = async (teacherId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/teacher/${teacherId}`,
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
