import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });
const colleges = [
  {
    name: "RV College of Engineering",
    location: "Bangalore",
    fees: 250000,
    rating: 4.5,
    overview:
      "RV College of Engineering is a leading engineering institution in Bangalore known for strong academics and industry-oriented programs.",
    averagePackage: 1050000,
    highestPackage: 5200000,
    placementRate: 92,
    courses: [
      "Computer Science and Engineering",
      "Information Science and Engineering",
      "Electronics and Communication Engineering",
      "Mechanical Engineering",
    ],
    cutoffs: [
      { exam: "KCET", year: 2026, rank: 500 },
      { exam: "COMEDK", year: 2026, rank: 1200 },
    ],
  },

  {
    name: "BMS College of Engineering",
    location: "Bangalore",
    fees: 230000,
    rating: 4.3,
    overview:
      "BMS College of Engineering is one of Bangalore's established engineering colleges with a strong academic and placement ecosystem.",
    averagePackage: 850000,
    highestPackage: 4500000,
    placementRate: 89,
    courses: [
      "Computer Science and Engineering",
      "Information Science and Engineering",
      "Electronics and Communication Engineering",
      "Mechanical Engineering",
    ],
    cutoffs: [
      { exam: "KCET", year: 2026, rank: 1500 },
      { exam: "COMEDK", year: 2026, rank: 3000 },
    ],
  },

  {
    name: "PES University",
    location: "Bangalore",
    fees: 350000,
    rating: 4.4,
    overview:
      "PES University offers engineering programs with a strong focus on technology, innovation, research, and industry exposure.",
    averagePackage: 950000,
    highestPackage: 6000000,
    placementRate: 91,
    courses: [
      "Computer Science and Engineering",
      "Electronics and Communication Engineering",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
    ],
    cutoffs: [
      { exam: "KCET", year: 2026, rank: 1200 },
      { exam: "COMEDK", year: 2026, rank: 2500 },
    ],
  },

  {
    name: "MS Ramaiah Institute of Technology",
    location: "Bangalore",
    fees: 280000,
    rating: 4.2,
    overview:
      "MS Ramaiah Institute of Technology is a well-known engineering institution offering a wide range of undergraduate programs.",
    averagePackage: 800000,
    highestPackage: 4500000,
    placementRate: 88,
    courses: [
      "Computer Science and Engineering",
      "Information Science and Engineering",
      "Electronics and Communication Engineering",
      "Mechanical Engineering",
    ],
    cutoffs: [
      { exam: "KCET", year: 2026, rank: 2500 },
      { exam: "COMEDK", year: 2026, rank: 4500 },
    ],
  },

  {
    name: "Bangalore Institute of Technology",
    location: "Bangalore",
    fees: 190000,
    rating: 4.0,
    overview:
      "Bangalore Institute of Technology provides undergraduate engineering education with a focus on technical fundamentals and industry readiness.",
    averagePackage: 650000,
    highestPackage: 3200000,
    placementRate: 82,
    courses: [
      "Computer Science and Engineering",
      "Information Science and Engineering",
      "Electronics and Communication Engineering",
      "Mechanical Engineering",
    ],
    cutoffs: [
      { exam: "KCET", year: 2026, rank: 5000 },
      { exam: "COMEDK", year: 2026, rank: 8000 },
    ],
  },

  {
    name: "New Horizon College of Engineering",
    location: "Bangalore",
    fees: 210000,
    rating: 4.0,
    overview:
      "New Horizon College of Engineering offers engineering programs with emphasis on practical learning and technology.",
    averagePackage: 700000,
    highestPackage: 3000000,
    placementRate: 84,
    courses: [
      "Computer Science and Engineering",
      "Information Science and Engineering",
      "Artificial Intelligence and Machine Learning",
      "Electronics and Communication Engineering",
    ],
    cutoffs: [
      { exam: "KCET", year: 2026, rank: 7000 },
      { exam: "COMEDK", year: 2026, rank: 10000 },
    ],
  },

  {
    name: "Dayananda Sagar College of Engineering",
    location: "Bangalore",
    fees: 220000,
    rating: 4.1,
    overview:
      "Dayananda Sagar College of Engineering provides undergraduate engineering programs across multiple technical disciplines.",
    averagePackage: 720000,
    highestPackage: 3500000,
    placementRate: 85,
    courses: [
      "Computer Science and Engineering",
      "Information Science and Engineering",
      "Electronics and Communication Engineering",
      "Mechanical Engineering",
    ],
    cutoffs: [
      { exam: "KCET", year: 2026, rank: 6500 },
      { exam: "COMEDK", year: 2026, rank: 9500 },
    ],
  },

  {
    name: "NITK Surathkal",
    location: "Mangalore",
    fees: 180000,
    rating: 4.7,
    overview:
      "National Institute of Technology Karnataka is a premier technical institution with strong academic, research, and placement opportunities.",
    averagePackage: 1400000,
    highestPackage: 5500000,
    placementRate: 95,
    courses: [
      "Computer Science and Engineering",
      "Information Technology",
      "Electronics and Communication Engineering",
      "Mechanical Engineering",
    ],
    cutoffs: [
      { exam: "JEE Main", year: 2026, rank: 5000 },
    ],
  },

  {
    name: "Manipal Institute of Technology",
    location: "Manipal",
    fees: 550000,
    rating: 4.5,
    overview:
      "Manipal Institute of Technology offers a broad range of engineering programs with strong infrastructure and industry exposure.",
    averagePackage: 1050000,
    highestPackage: 5000000,
    placementRate: 90,
    courses: [
      "Computer Science and Engineering",
      "Information Technology",
      "Electronics and Communication Engineering",
      "Mechanical Engineering",
    ],
    cutoffs: [
      { exam: "MET", year: 2026, rank: 5000 },
    ],
  },
];

async function main() {
  console.log("Seeding database...");

  await prisma.savedCollege.deleteMany();
  await prisma.review.deleteMany();
  await prisma.cutoff.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  for (const college of colleges) {
    await prisma.college.create({
      data: {
        name: college.name,
        location: college.location,
        fees: college.fees,
        rating: college.rating,
        overview: college.overview,
        averagePackage: college.averagePackage,
        highestPackage: college.highestPackage,
        placementRate: college.placementRate,

        courses: {
          create: college.courses.map((course) => ({
            name: course,
          })),
        },

        cutoffs: {
          create: college.cutoffs,
        },
      },
    });
  }

  console.log(`Seeded ${colleges.length} colleges.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });