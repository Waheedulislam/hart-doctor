"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllReview } from "@/services/Review/Review";
import { TReview } from "@/types/Review";
import NMPageHeader from "@/components/shared/NMPageHader/NMPageHader";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form inputs
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");

  // Fetch reviews on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReview();
        if (data instanceof Error) {
          setError(data.message);
        } else {
          setReviews(data.data.result);
        }
      } catch (err) {
        setError("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading)
    return (
      <p className="text-center py-10 text-zinc-600 dark:text-zinc-300">
        Loading reviews...
      </p>
    );
  if (error)
    return (
      <p className="text-center py-10 text-red-600 dark:text-red-400 font-semibold">
        {error}
      </p>
    );

  return (
    <div>
      {/* page header  */}
      <div className="mb-20">
        <NMPageHeader
          title="Manage Review"
          backgroundImage="https://images.stockcake.com/public/5/9/b/59b94f87-31fc-47ec-83ac-6e2321aabce8_large/medical-team-discussion-stockcake.jpg"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Manage Review" },
          ]}
        />
      </div>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6 text-center text-emerald-600">
          Post a Review
        </h1>

        <div className="mb-10 space-y-4">
          <Input
            type="text"
            placeholder="Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
          <Input
            type="text"
            placeholder="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
          <Input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full"
          />
          <textarea
            placeholder="Description *"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md resize-none border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            rows={4}
          />
          <Button
            // onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Submit Review
          </Button>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-emerald-600">
          Reviews
        </h2>

        {reviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          <table className="w-full border-collapse border border-zinc-300 dark:border-zinc-700">
            <thead className="bg-zinc-100 dark:bg-zinc-800">
              <tr>
                <th className="border border-zinc-300 dark:border-zinc-700 p-2 text-left">
                  Title
                </th>
                <th className="border border-zinc-300 dark:border-zinc-700 p-2 text-left">
                  Name
                </th>
                <th className="border border-zinc-300 dark:border-zinc-700 p-2 text-left">
                  Role
                </th>
                <th className="border border-zinc-300 dark:border-zinc-700 p-2 text-left">
                  Description
                </th>
                <th className="border border-zinc-300 dark:border-zinc-700 p-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr
                  key={review._id ?? review.title}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  <td className="border border-zinc-300 dark:border-zinc-700 p-2">
                    {review.title}
                  </td>
                  <td className="border border-zinc-300 dark:border-zinc-700 p-2">
                    {review.name}
                  </td>
                  <td className="border border-zinc-300 dark:border-zinc-700 p-2">
                    {review.role || "-"}
                  </td>
                  <td className="border border-zinc-300 dark:border-zinc-700 p-2">
                    {review.description}
                  </td>
                  <td className="border border-zinc-300 dark:border-zinc-700 p-2 text-center">
                    {review._id ? (
                      <Button
                        variant="destructive"
                        size="sm"
                        // onClick={() => handleDelete(review._id)}
                      >
                        Delete
                      </Button>
                    ) : (
                      <span className="text-zinc-500 text-sm">No ID</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
