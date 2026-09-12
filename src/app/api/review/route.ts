import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const collegeId = body.collegeId;
    const rating = Number(body.rating);
    const comment = body.comment?.trim();

    if (!collegeId || !rating || !comment) {
      return NextResponse.json(
        {
          error: "College, rating and comment are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          error: "Rating must be between 1 and 5.",
        },
        {
          status: 400,
        }
      );
    }

    const cookieStore = await cookies();

    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        {
          error: "Please login to submit a review.",
        },
        {
          status: 401,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User account not found.",
        },
        {
          status: 401,
        }
      );
    }

    const college = await prisma.college.findUnique({
      where: {
        id: collegeId,
      },
    });

    if (!college) {
      return NextResponse.json(
        {
          error: "College not found.",
        },
        {
          status: 404,
        }
      );
    }

    const review = await prisma.review.create({
      data: {
        collegeId,
        userName: user.email,
        rating,
        comment,
      },
    });

    return NextResponse.json(
      {
        message: "Review submitted successfully.",
        review,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Review error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while submitting the review.",
      },
      {
        status: 500,
      }
    );
  }
}