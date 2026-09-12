import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function SavedColleges() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return (
      <main className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-6 py-5">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600"
            >
              College Discovery
            </Link>
          </div>
        </header>

        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-white border rounded-xl p-10 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Login Required
            </h1>

            <p className="mt-3 text-gray-600">
              Please login to view your saved colleges.
            </p>

            <Link
              href="/login"
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Login
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const savedColleges = await prisma.savedCollege.findMany({
    where: {
      userId,
    },
    include: {
      college: true,
    },
    orderBy: {
      id: "desc",
    },
  });

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

      {/* Saved Colleges */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            My Saved Colleges
          </h1>

          <p className="mt-2 text-gray-600">
            Colleges you have saved for later.
          </p>
        </div>

        {savedColleges.length === 0 ? (
          <div className="bg-white border rounded-xl p-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              No Saved Colleges
            </h2>

            <p className="mt-3 text-gray-600">
              You haven't saved any colleges yet.
            </p>

            <Link
              href="/"
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Explore Colleges
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedColleges.map((saved) => (
              <div
                key={saved.id}
                className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {saved.college.name}
                </h2>

                <p className="mt-2 text-gray-600">
                  📍 {saved.college.location}
                </p>

                <p className="mt-3 text-yellow-600 font-medium">
                  ⭐ {saved.college.rating}
                </p>

                <p className="mt-3 text-gray-600">
                  Annual Fees: ₹
                  {saved.college.fees.toLocaleString("en-IN")}
                </p>

                <Link
                  href={`/college/${saved.college.id}`}
                  className="mt-5 block w-full py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700"
                >
                  View College
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}