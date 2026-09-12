"use client";

import { useState } from "react";

export default function ReviewForm({
  collegeId,
}: {
  collegeId: string;
}) {
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collegeId,
          rating,
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to submit review.");
        return;
      }

      setMessage("Review submitted successfully.");
      setComment("");
      setRating("5");

      window.location.reload();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white border rounded-xl p-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-900">
        ✍️ Write a Review
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="rating"
            className="block font-medium text-gray-900"
          >
            Rating
          </label>

          <select
            id="rating"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            className="mt-2 w-full md:w-48 px-4 py-3 border rounded-lg bg-white"
          >
            <option value="5">⭐ 5 - Excellent</option>
            <option value="4">⭐ 4 - Very Good</option>
            <option value="3">⭐ 3 - Good</option>
            <option value="2">⭐ 2 - Average</option>
            <option value="1">⭐ 1 - Poor</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="comment"
            className="block font-medium text-gray-900"
          >
            Your Review
          </label>

          <textarea
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Share your experience with this college..."
            rows={5}
            required
            className="mt-2 w-full px-4 py-3 border rounded-lg bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>

        {message && (
          <p className="text-green-600">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}