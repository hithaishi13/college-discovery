import { prisma } from "@/lib/prisma";
import Link from "next/link";
import SaveCollegeButton from "./SaveCollegeButton";
import ReviewForm from "./ReviewForm";

export default async function CollegeDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const college = await prisma.college.findUnique({
    where: {
      id,
    },
    include: {
      courses: true,
      cutoffs: {
        orderBy: {
          year: "desc",
        },
      },
      reviews: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!college) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <div className="text-6xl mb-6">🏫</div>

          <h1 className="text-3xl font-extrabold text-slate-900">
            College Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            The college you are looking for does not exist.
          </p>

          <Link
            href="/"
            className="inline-block mt-7 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            ← Back to Colleges
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-blue-600"
          >
            🎓 College Discovery
          </Link>

          <Link
            href="/"
            className="px-4 py-2 rounded-lg text-slate-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition"
          >
            ← Back to Colleges
          </Link>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-14">

        {/* ================= COLLEGE HERO ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white shadow-xl">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -right-10 bottom-[-100px] w-72 h-72 rounded-full bg-white/5" />

          <div className="relative p-8 md:p-12">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">

              <div className="max-w-4xl">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 text-blue-50 text-sm font-semibold">
                  🏫 College Profile
                </span>

                <h1 className="mt-5 text-3xl md:text-5xl font-extrabold leading-tight">
                  {college.name}
                </h1>

                <p className="mt-4 text-lg text-blue-100">
                  📍 {college.location}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-yellow-600 font-bold">
                    ⭐ {college.rating}
                  </div>

                  <span className="text-blue-100">
                    Student Rating
                  </span>
                </div>

                <p className="mt-7 max-w-3xl text-blue-50 leading-7 text-base md:text-lg">
                  {college.overview}
                </p>
              </div>

              <div className="lg:pt-2">
                <SaveCollegeButton collegeId={college.id} />
              </div>
            </div>
          </div>
        </div>

        {/* ================= QUICK STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">

          <StatCard
            icon="💰"
            label="Annual Fees"
            value={`₹${college.fees.toLocaleString("en-IN")}`}
          />

          <StatCard
            icon="📈"
            label="Average Package"
            value={`₹${(college.averagePackage / 100000).toFixed(1)} LPA`}
          />

          <StatCard
            icon="🏆"
            label="Highest Package"
            value={`₹${(college.highestPackage / 100000).toFixed(1)} LPA`}
          />

          <StatCard
            icon="🎯"
            label="Placement Rate"
            value={`${college.placementRate}%`}
            valueClass="text-green-600"
          />

        </div>

        {/* ================= COURSES ================= */}
        <section className="bg-white border border-slate-200 rounded-2xl p-7 md:p-9 mt-8 shadow-sm">

          <SectionHeading
            icon="📚"
            title="Courses Offered"
            description="Explore the programs available at this college."
          />

          {college.courses.length === 0 ? (
            <EmptyMessage text="Course information is currently unavailable." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
              {college.courses.map((course) => (
                <div
                  key={course.id}
                  className="group flex items-center gap-4 p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    ✓
                  </div>

                  <p className="font-semibold text-slate-800 group-hover:text-blue-700 transition">
                    {course.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ================= CUTOFFS ================= */}
        <section className="bg-white border border-slate-200 rounded-2xl p-7 md:p-9 mt-8 shadow-sm">

          <SectionHeading
            icon="📊"
            title="Admission Cutoffs"
            description="Recent admission cutoff information."
          />

          {college.cutoffs.length === 0 ? (
            <EmptyMessage text="Cutoff information is currently unavailable." />
          ) : (
            <div className="overflow-x-auto mt-7 rounded-xl border border-slate-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-5 py-4 text-sm font-bold text-slate-600">
                      Exam
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-bold text-slate-600">
                      Year
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-bold text-slate-600">
                      Closing Rank
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {college.cutoffs.map((cutoff) => (
                    <tr
                      key={cutoff.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition"
                    >
                      <td className="px-5 py-4 font-semibold text-slate-800">
                        {cutoff.exam}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {cutoff.year}
                      </td>

                      <td className="px-5 py-4 font-bold text-blue-600">
                        {cutoff.rank.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ================= REVIEWS ================= */}
        <section className="bg-white border border-slate-200 rounded-2xl p-7 md:p-9 mt-8 shadow-sm">

          <SectionHeading
            icon="⭐"
            title="Student Reviews"
            description="See what students have to say about this college."
          />

          {/* Review Form */}
          <div className="mt-7 p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">
              Share Your Experience
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Add a rating and tell other students about your experience.
            </p>

            <div className="mt-5">
              <ReviewForm collegeId={college.id} />
            </div>
          </div>

          {/* Existing Reviews */}
          {college.reviews.length === 0 ? (
            <div className="mt-7 p-8 rounded-xl border border-dashed border-slate-300 text-center">
              <div className="text-4xl mb-3">💬</div>

              <p className="font-semibold text-slate-700">
                No reviews yet
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Be the first student to share an experience.
              </p>
            </div>
          ) : (
            <div className="space-y-4 mt-7">
              {college.reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-6 rounded-xl border border-slate-200 hover:shadow-sm transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900">
                        {review.userName}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Student Review
                      </p>
                    </div>

                    <span className="self-start sm:self-auto px-3 py-1 rounded-lg bg-yellow-50 text-yellow-700 font-bold">
                      ⭐ {review.rating}
                    </span>
                  </div>

                  <p className="mt-4 text-slate-600 leading-7">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ================= BACK CTA ================= */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition"
          >
            ← Explore More Colleges
          </Link>
        </div>

      </section>
    </main>
  );
}

/* ================= STAT CARD ================= */

function StatCard({
  icon,
  label,
  value,
  valueClass = "text-slate-900",
}: {
  icon: string;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
          {icon}
        </div>

        <p className="text-sm font-semibold text-slate-500">
          {label}
        </p>
      </div>

      <p className={`mt-4 text-2xl font-extrabold ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}

/* ================= SECTION HEADING ================= */

function SectionHeading({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
          {icon}
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          {title}
        </h2>
      </div>

      <p className="mt-3 text-slate-500">
        {description}
      </p>
    </div>
  );
}

/* ================= EMPTY MESSAGE ================= */

function EmptyMessage({ text }: { text: string }) {
  return (
    <p className="mt-6 p-5 rounded-xl bg-slate-50 text-slate-500 border border-slate-200">
      {text}
    </p>
  );
}