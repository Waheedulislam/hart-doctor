/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IArticle } from "@/types/Articles";

export const createArticle = async (
  articleData: IArticle
): Promise<IArticle | Error> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/article/create-article`,
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

// get all article
export const getAllArticle = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/article`, {
      next: {
        tags: ["ARTICLE"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
// get single teacher
export const getSingleArticle = async (articleId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/article/${articleId}`,
      {
        next: {
          tags: ["ARTICLE"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
export const deleteArticle = async (
  articleId: string
): Promise<boolean | Error> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/article/${articleId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to delete article: ${res.status}`);
    }

    return true;
  } catch (error: any) {
    return new Error(error.message || "Something went wrong");
  }
};
