"use client";

import Link from "next/link";
import { useState } from "react";

type Course = {
  id: string;
  name: string;
};

type Recommendation = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  courses: Course[];
  matchScore: number;
  matchReasons: string[];
};


export default function RecommendPage() {
  const [location, setLocation] = useState("");
  const [course, setCourse] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [minRating, setMinRating] = useState("");

  const [recommendations, setRecommendations] = useState<
    Recommendation[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRecommend() {
    setLoading(true);
    setError("");
    setRecommendations([]);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location,
          course,
          maxFees,
          minRating,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || "Failed to generate recommendations.");
        return;
      }

      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600"
          >
            College Discovery
          </Link>

          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600"
          >
            ← Back to Colleges
          </Link>
        </div>
      </header>

      {/* Main */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white border rounded-xl p-8 shadow-sm">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              🎓 AI College Recommendation
            </h1>

            <p className="mt-3 text-gray-600">
              Tell us about your preferences and we'll help you find
              suitable colleges.
            </p>
          </div>

          {/* Form */}
          <div className="mt-8 space-y-6">
            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Preferred Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Example: Bangalore"
                className="w-full px-4 py-3 border rounded-lg bg-white"
              />
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Course / Field of Study
              </label>

              <input
                type="text"
                value={course}
                onChange={(event) => setCourse(event.target.value)}
                placeholder="Example: Computer Science"
                className="w-full px-4 py-3 border rounded-lg bg-white"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Maximum Annual Fees
              </label>

              <select
                value={maxFees}
                onChange={(event) => setMaxFees(event.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-white"
              >
                <option value="">Select your budget</option>
                <option value="100000">Up to ₹1,00,000</option>
                <option value="200000">Up to ₹2,00,000</option>
                <option value="300000">Up to ₹3,00,000</option>
                <option value="500000">Up to ₹5,00,000</option>
                <option value="1000000">Up to ₹10,00,000</option>
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Minimum College Rating
              </label>

              <select
                value={minRating}
                onChange={(event) => setMinRating(event.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-white"
              >
                <option value="">Any rating</option>
                <option value="3">3.0+</option>
                <option value="3.5">3.5+</option>
                <option value="4">4.0+</option>
                <option value="4.5">4.5+</option>
              </select>
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleRecommend}
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading
                ? "🤖 Finding Best Colleges..."
                : "🤖 Find My Best Colleges"}
            </button>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              🎯 Recommended Colleges
            </h2>

            <div className="space-y-5">
              {recommendations.map((college, index) => (
                <div
                  key={college.id}
                  className="bg-white border rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-blue-600 font-semibold">
                        #{index + 1} Recommendation
                      </p>

                      <h3 className="text-xl font-bold text-gray-900 mt-1">
                        {college.name}
                      </h3>

                      <p className="mt-2 text-gray-600">
                        📍 {college.location}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-yellow-600 font-semibold">
                        ⭐ {college.rating}
                      </p>

                      <p className="text-sm text-green-600 font-semibold mt-1">
                        {college.matchScore}% Match
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                    <p>
                      💰 Annual Fees: ₹
                      {college.fees.toLocaleString("en-IN")}
                    </p>

                    <p>
                      📚 Courses:{" "}
                      {college.courses
                        .map((item) => item.name)
                        .join(", ")}
                    </p>
                  </div>
                <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="font-semibold text-green-800 mb-2">
                      🎯 Why this college matches
                    </p>

                    <ul className="space-y-1 text-green-700">
                      {college.matchReasons.map((reason, reasonIndex) => (
                        <li key={reasonIndex}>
                          ✓ {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/college/${college.id}`}
                    className="mt-5 block w-full py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700"
                  >
                    View College
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading &&
          recommendations.length === 0 &&
          !error && (
            <div className="mt-8 text-center text-gray-500">
              Enter your preferences and click{" "}
              <span className="font-semibold">
                Find My Best Colleges
              </span>
              .
            </div>
          )}
      </section>
    </main>
  );
}