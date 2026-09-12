import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const collegeId = body.collegeId;

    if (!collegeId) {
      return NextResponse.json(
        {
          error: "College ID is required.",
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
          error: "Please login to save colleges.",
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
          error: "User not found. Please login again.",
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

    const existingSave = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId,
          collegeId,
        },
      },
    });

    if (existingSave) {
      return NextResponse.json({
        message: "College is already saved.",
        saved: true,
      });
    }

    await prisma.savedCollege.create({
      data: {
        userId,
        collegeId,
      },
    });

    return NextResponse.json(
      {
        message: "College saved successfully.",
        saved: true,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Save college error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while saving the college.",
      },
      {
        status: 500,
      }
    );
  }
}