/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { TReview } from "@/types/Review";

export const createReview = async (reviewData: TReview) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/create-review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
        next: { tags: ["REVIEW"] }, // caching + revalidate
      }
    );
    return await res.json();
  } catch (error: any) {
    return new Error(error.message);
  }
};

export const getAllReview = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review`, {
      next: { tags: ["REVIEW"] },
    });
    return await res.json();
  } catch (error: any) {
    return new Error(error.message);
  }
};

export const deleteReview = async (
  reviewId: string
): Promise<boolean | Error> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/${reviewId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        next: { tags: ["REVIEW"] }, // revalidate cache
      }
    );

    if (!res.ok) throw new Error(`Failed to delete review: ${res.status}`);
    return true;
  } catch (error: any) {
    return new Error(error.message || "Something went wrong");
  }
};
