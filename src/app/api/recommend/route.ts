import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const location = body.location?.trim() || "";
    const course = body.course?.trim() || "";
    const maxFees = Number(body.maxFees) || 0;
    const minRating = Number(body.minRating) || 0;

    const colleges = await prisma.college.findMany({
      where: {
        AND: [
          location
            ? {
                location: {
                  contains: location,
                  mode: "insensitive",
                },
              }
            : {},

          course
            ? {
                courses: {
                  some: {
                    name: {
                      contains: course,
                      mode: "insensitive",
                    },
                  },
                },
              }
            : {},

          maxFees
            ? {
                fees: {
                  lte: maxFees,
                },
              }
            : {},

          minRating
            ? {
                rating: {
                  gte: minRating,
                },
              }
            : {},
        ],
      },

      include: {
        courses: true,
      },

      orderBy: {
        rating: "desc",
      },
    });

    const scoredColleges = colleges
      .map((college) => {
        let score = 0;
        const matchReasons: string[] = [];

        // -----------------------------
        // 1. LOCATION MATCH - 30 POINTS
        // -----------------------------
        if (
          location &&
          college.location
            .toLowerCase()
            .includes(location.toLowerCase())
        ) {
          score += 30;
          matchReasons.push("Location matches");
        }

        // -----------------------------
        // 2. COURSE MATCH - 30 POINTS
        // -----------------------------
        if (
          course &&
          college.courses.some((item) =>
            item.name
              .toLowerCase()
              .includes(course.toLowerCase())
          )
        ) {
          score += 30;
          matchReasons.push("Course matches");
        }

        // -----------------------------
        // 3. RATING - 15 POINTS
        // -----------------------------
        if (minRating && college.rating >= minRating) {
          score += 15;
          matchReasons.push("Meets your rating preference");
        } else if (college.rating >= 4.5) {
          score += 15;
          matchReasons.push("Highly rated college");
        } else if (college.rating >= 4.0) {
          score += 10;
          matchReasons.push("Good college rating");
        }

        // -----------------------------
        // 4. BUDGET - 10 POINTS
        // -----------------------------
        if (maxFees && college.fees <= maxFees) {
          score += 10;
          matchReasons.push("Within your budget");
        }

        // -----------------------------
        // 5. PLACEMENT - 10 POINTS
        // -----------------------------
        if (college.placementRate >= 90) {
          score += 10;
          matchReasons.push("Excellent placement rate");
        } else if (college.placementRate >= 80) {
          score += 8;
          matchReasons.push("Strong placement rate");
        } else if (college.placementRate >= 70) {
          score += 5;
          matchReasons.push("Good placement rate");
        }

        // -----------------------------
        // 6. AVERAGE PACKAGE - 3 POINTS
        // -----------------------------
        // -----------------------------
        // 6. AVERAGE PACKAGE - 3 POINTS
        // -----------------------------
        const averagePackageLpa = college.averagePackage / 100000;

        if (averagePackageLpa >= 10) {
          score += 3;
          matchReasons.push("Strong average package");
        } else if (averagePackageLpa >= 7) {
          score += 2;
          matchReasons.push("Good average package");
        }

        // -----------------------------
        // 7. HIGHEST PACKAGE - 2 POINTS
        // -----------------------------
        const highestPackageLpa = college.highestPackage / 100000;

        if (highestPackageLpa >= 25) {
          score += 2;
          matchReasons.push("Excellent highest package");
        } else if (highestPackageLpa >= 15) {
          score += 1;
          matchReasons.push("Strong highest package");
        }

        return {
          id: college.id,
          name: college.name,
          location: college.location,
          fees: college.fees,
          rating: college.rating,
          averagePackage: college.averagePackage,
          highestPackage: college.highestPackage,
          placementRate: college.placementRate,
          courses: college.courses,
          matchScore: score,
          matchReasons,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      success: true,
      recommendations: scoredColleges.slice(0, 5),
    });
  } catch (error) {
    console.error("Recommendation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate recommendations.",
      },
      {
        status: 500,
      }
    );
  }
}