/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// get all reviews
export const getAllReview = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review/`, {
      next: {
        tags: ["REVIEW"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
