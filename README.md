# 🎓 College Discovery

A full-stack college discovery platform that helps students explore colleges, compare important details, save colleges, submit reviews, and receive personalized college recommendations.

## 🚀 Live Demo

**Production Website:**  
https://college-discovery-hxc7u4z4u-hithaishi13.vercel.app

## 📌 Project Overview

College Discovery is a full-stack web application designed to make the college-selection process easier for students.

The platform provides:

- 🔍 College search by name or location
- 🏫 Detailed college profiles
- 💰 Annual fee information
- 📊 Average and highest placement packages
- 🎯 Placement rates
- 📚 Available courses
- 📈 Admission cutoff information
- ⭐ Student ratings and reviews
- ❤️ Save colleges for later
- 🔐 User registration and login
- 🤖 AI-assisted college recommendations using weighted preference scoring
- ☁️ Production deployment with Vercel
- 🗄️ PostgreSQL database using Neon

## ✨ Features

### 🔍 College Search

Students can search colleges using:

- College name
- Location

Search results are retrieved from the PostgreSQL database.

### 🏫 College Details

Each college has a dedicated profile containing:

- College name
- Location
- Rating
- Annual fees
- Average package
- Highest package
- Placement rate
- Courses
- Admission cutoffs
- Student reviews

### 🔐 Authentication

The application provides user authentication with:

- User registration
- Duplicate email prevention
- Password hashing using bcrypt
- Login verification
- HTTP-only authentication cookies

A registered email address cannot be used to create another account.

### ❤️ Saved Colleges

Logged-in users can save colleges and access them later through the **Saved Colleges** section.

Saved colleges are stored in the PostgreSQL database and associated with the authenticated user.

### ⭐ Reviews

Authenticated users can submit college reviews with:

- Rating
- Review text

Submitted reviews are stored in the database and displayed on the respective college profile.

### 🤖 College Recommendation System

The recommendation system allows students to specify preferences such as:

- Location
- Desired course
- Maximum annual fees
- Minimum rating

The system filters colleges based on these preferences and calculates a weighted match score.

Recommendations also explain why a college matches the student's preferences.

> The current recommendation engine is an AI-assisted, rule-based system using weighted preference scoring rather than an LLM-based model.

## 🧩 Implementation

The application is implemented using a full-stack architecture.

### Frontend Implementation

- Next.js
- React
- TypeScript
- CSS
- Client-side forms and interactions
- Dynamic college detail pages

### Backend Implementation

- Next.js API Routes
- Prisma ORM
- PostgreSQL database integration
- Authentication APIs
- College saving functionality
- Review submission APIs
- Recommendation API

### Authentication Implementation

- User registration
- Password hashing using bcrypt
- Login verification
- HTTP-only authentication cookies
- Duplicate email validation

### Recommendation Implementation

The recommendation system uses weighted preference matching.

The user's:

- Location preference
- Course preference
- Maximum fee preference
- Minimum rating preference

are evaluated against available colleges.

Matching colleges receive a score based on how well they satisfy the selected preferences.

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- CSS

### Backend

- Next.js API Routes
- Prisma ORM

### Database

- PostgreSQL
- Neon PostgreSQL

### Authentication

- bcrypt
- HTTP-only cookies

### Deployment

- Vercel
- GitHub

## 🏗️ System Architecture

Student → Next.js Application → Next.js API Routes → Prisma ORM → Neon PostgreSQL

The Next.js application provides the user interface for college discovery, authentication, saved colleges, reviews, and recommendations.

The API routes handle backend operations.

Prisma ORM provides database access and communication with Neon PostgreSQL.

## 🗄️ Database Models

The application uses the following main database models:

- `User`
- `College`
- `Course`
- `Review`
- `Cutoff`
- `SavedCollege`

### Relationships

- User → Saved Colleges
- College → Courses
- College → Reviews
- College → Cutoffs
- College → Saved By Users

## 📂 Main Application Pages

| Page | Purpose |
|---|---|
| `/` | College search and discovery |
| `/college/[id]` | College details |
| `/signup` | User registration |
| `/login` | User login |
| `/saved` | Saved colleges |
| `/recommend` | College recommendations |

## 🔌 API Endpoints

| Endpoint | Purpose |
|---|---|
| `/api/signup` | Create a new user |
| `/api/login` | Authenticate a user |
| `/api/save` | Save a college |
| `/api/review` | Submit a college review |
| `/api/recommend` | Generate college recommendations |

## 💻 Local Development

### 1. Clone the repository

`git clone https://github.com/hithaishi13/college-discovery.git`

`cd college-discovery`

### 2. Install dependencies

`npm install`

### 3. Configure environment variables

Create a `.env` file and add:

`DATABASE_URL="your_neon_postgresql_connection_string"`

Never commit your `.env` file or expose database credentials publicly.

### 4. Generate Prisma Client

`npx prisma generate`

### 5. Start the development server

`npm run dev`

Open `http://localhost:3000` in your browser.

## 🌐 Deployment

The application is deployed using Vercel and connected to the GitHub repository.

The production application uses:

- Vercel for hosting
- Neon PostgreSQL for the database
- Prisma for database access
- GitHub for source code management

## 🧪 Tested Functionality

The following functionality has been tested on the deployed application:

- ✅ College search
- ✅ College details
- ✅ Neon database connection
- ✅ User signup
- ✅ Duplicate email prevention
- ✅ User login
- ✅ Authentication cookies
- ✅ Save college
- ✅ Saved colleges page
- ✅ Review submission
- ✅ Review display
- ✅ College recommendations
- ✅ Recommendation filtering
- ✅ Recommendation match scoring
- ✅ Production deployment

## 🔮 Future Enhancements

Possible future improvements include:

- Real LLM-powered recommendations
- College comparison feature
- More colleges and courses
- Advanced filtering
- User profile dashboard
- Password reset through email
- Email verification
- Admin dashboard
- College image gallery
- More detailed placement analytics
- Improved recommendation personalization

## 👩‍💻 Author

**Hithaishi S H**

Built as a full-stack development project demonstrating modern web development, database integration, authentication, recommendation systems, and cloud deployment.

## 📄 License

This project is intended for educational and portfolio purposes.
