import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const search = q?.trim() || "";

  const colleges = await prisma.college.findMany({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              location: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : undefined,

    orderBy: {
      rating: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-tight text-blue-600"
            >
              🎓 College Discovery
            </Link>

            {/* Navigation */}
            <nav className="flex flex-wrap items-center gap-2">
              <Link
                href="/recommend"
                className="px-4 py-2 rounded-lg text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition"
              >
                🤖 AI Recommendations
              </Link>

              <Link
                href="/saved"
                className="px-4 py-2 rounded-lg text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition"
              >
                ❤️ Saved Colleges
              </Link>

              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-sm transition"
              >
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6">
            ✨ Smart College Discovery Platform
          </div>

          <h1 className="max-w-4xl mx-auto text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Find the{" "}
            <span className="text-blue-600">Right College</span>{" "}
            for You
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-slate-600 leading-relaxed">
            Explore colleges, courses, fees, ratings, placements and
            admission cutoffs — all in one place.
          </p>

          {/* Search */}
          <form
            method="GET"
            action="/"
            className="mt-10 max-w-3xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-lg border border-slate-200">
              <div className="flex-1 flex items-center">
                <span className="pl-4 text-xl">🔎</span>

                <input
                  type="text"
                  name="q"
                  defaultValue={search}
                  placeholder="Search by college name or location..."
                  className="w-full px-4 py-4 text-slate-900 outline-none bg-transparent placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-sm"
              >
                Search Colleges
              </button>
            </div>
          </form>

          {/* Quick features */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              ✓ Verified college information
            </span>
            <span className="flex items-center gap-2">
              ✓ Smart recommendations
            </span>
            <span className="flex items-center gap-2">
              ✓ Compare your preferences
            </span>
          </div>
        </div>
      </section>

      {/* ================= COLLEGES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Explore
            </p>

            <h2 className="mt-1 text-3xl font-extrabold text-slate-900">
              {search
                ? `Search Results for "${search}"`
                : "Popular Colleges"}
            </h2>

            <p className="mt-2 text-slate-500">
              {colleges.length} college
              {colleges.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {search && (
            <Link
              href="/"
              className="self-start sm:self-auto px-4 py-2 rounded-lg border border-slate-300 bg-white text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              Clear Search
            </Link>
          )}
        </div>

        {/* No results */}
        {colleges.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
            <div className="text-5xl mb-5">🔍</div>

            <h3 className="text-2xl font-bold text-slate-900">
              No colleges found
            </h3>

            <p className="mt-3 text-slate-500 max-w-md mx-auto">
              We couldn't find a college matching your search.
              Try another college name or location.
            </p>

            <Link
              href="/"
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              View All Colleges
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {colleges.map((college, index) => (
              <CollegeCard
                key={college.id}
                id={college.id}
                name={college.name}
                location={college.location}
                rating={college.rating}
                fees={college.fees}
                overview={college.overview}
                rank={index + 1}
              />
            ))}
          </div>
        )}
      </section>

      {/* ================= AI SECTION ================= */}
      {!search && (
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 md:p-12 text-white shadow-xl">
            <div className="max-w-3xl">
              <div className="text-4xl mb-4">🤖</div>

              <h2 className="text-3xl md:text-4xl font-extrabold">
                Not sure which college to choose?
              </h2>

              <p className="mt-4 text-blue-100 text-lg leading-relaxed">
                Tell us your preferred location, course, budget and
                rating. Our recommendation system will analyze your
                preferences and suggest suitable colleges.
              </p>

              <Link
                href="/recommend"
                className="inline-block mt-7 px-6 py-3 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition"
              >
                Get Smart Recommendations →
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

/* ================= COLLEGE CARD ================= */

function CollegeCard({
  id,
  name,
  location,
  rating,
  fees,
  overview,
  rank,
}: {
  id: string;
  name: string;
  location: string;
  rating: number;
  fees: number;
  overview: string;
  rank: number;
}) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Card Top */}
      <div className="h-2 bg-blue-600" />

      <div className="p-7">
        {/* Rank + Rating */}
        <div className="flex items-center justify-between mb-5">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-bold">
            #{rank}
          </span>

          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 font-bold">
            ⭐ {rating}
          </span>
        </div>

        {/* College name */}
        <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition">
          {name}
        </h3>

        {/* Location */}
        <p className="mt-3 text-slate-500 flex items-center gap-2">
          📍 {location}
        </p>

        {/* Overview */}
        <p className="mt-4 text-slate-600 text-sm leading-relaxed line-clamp-3">
          {overview}
        </p>

        {/* Fee */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">
            Annual Fees
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            ₹{fees.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Button */}
        <Link
          href={`/college/${id}`}
          className="mt-6 block w-full py-3 bg-blue-600 text-white rounded-xl text-center font-bold hover:bg-blue-700 transition"
        >
          View College →
        </Link>
      </div>
    </div>
  );
}