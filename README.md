# Course Selling App Backend

A backend API for an online course-selling platform, built with **Node.js, Express, and MongoDB**. It supports separate user and admin roles — users can sign up, log in, and purchase courses; admins can sign up, log in, and (in progress) manage course listings. Built as part of Harkirat Singh's Cohort 3.0.

## Features

- **User**
  - Sign up with input validation (Zod schema)
  - Login with hashed password verification (bcrypt)
  - JWT-based authentication
  - View purchased courses (`/purches`, requires auth)
- **Admin**
  - Admin schema with sign up/sign in logic (controller implemented; route wiring in progress — see [Project Status](#project-status))
  - Each course is linked to the admin who created it
- **Courses**
  - Course model with title, description, price, image (Cloudinary-style `url` + `public_id`), and creator reference
  - Purchase model linking users to courses they've bought
- **Misc**
  - Centralized error handling and standardized error responses (`ApiError`)
  - Async route handler wrapper for clean error propagation

## Tech Stack

| Layer            | Technology                              |
|--------------------|--------------------------------------------|
| Runtime             | Node.js (ES Modules)                        |
| Framework           | Express 5                                    |
| Database            | MongoDB with Mongoose                        |
| Auth                | JSON Web Tokens (jsonwebtoken), bcryptjs    |
| Validation           | Zod                                          |
| Dev Tooling          | Nodemon, dotenv                              |

## Project Structure

```
.
├── app.js                    # Express app setup, middleware, route mounting
├── index.js                  # Entry point: loads env, connects DB, starts server
└── src/
    ├── models/
    │   ├── user.model.js       # User schema
    │   ├── admin.model.js      # Admin schema
    │   ├── course.model.js     # Course schema (title, description, price, image, creator)
    │   └── purchase.model.js   # Purchase schema (links user ↔ course)
    ├── controllers/
    │   ├── user.controller.js   # signUp, signIn, getPurches
    │   └── admin.controller.js  # signUp, signIn (admin)
    ├── routes/
    │   ├── user.route.js        # Wired to user.controller.js
    │   ├── admin.route.js       # Placeholder handlers — not yet wired to admin.controller.js
    │   └── course.route.js      # Placeholder handlers — purchase/preview logic not yet implemented
    ├── middlewares/
    │   ├── userAuth.middleware.js   # JWT verification for users
    │   └── adminAuth.middleware.js  # JWT verification for admins
    └── utils/
        ├── ApiError.js          # Standardized error class
        └── asyncHandler.js      # Wraps async route handlers
```

## Project Status

This project is a work in progress. Currently functional:
- User sign up, sign in, and fetching a user's purchases

Still in progress:
- `course.route.js` (`/purches`, `/preview`) has stub handlers with no logic yet
- `admin.route.js` has hardcoded placeholder responses and isn't yet connected to `admin.controller.js`, even though the admin sign up/sign in logic already exists in the controller
- Course creation/listing and purchase-flow endpoints

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Roshan1401/Course_Selling_App_Backend.git
   cd Course_Selling_App_Backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_uri
   DB_NAME=your_database_name
   CORS_ORIGIN=*

   JWT_USER_SECRET=your_user_jwt_secret
   JWT_ADMIN_SECRET=your_admin_jwt_secret
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

   The server will start on the port set in `.env` (defaults to 5000).

## API Overview

All routes are prefixed with `/api/v1`.

### Users — `/api/v1/user`

| Method | Endpoint     | Auth | Description                  |
|--------|----------------|------|----------------------------------|
| POST   | `/signUp`        | No   | Register a new user               |
| POST   | `/signIn`        | No   | Log in and receive a JWT          |
| GET    | `/purches`       | Yes  | Get the logged-in user's purchases |

### Admin — `/api/v1/admin` *(routes currently return placeholder responses)*

| Method | Endpoint    | Description                          |
|--------|---------------|------------------------------------------|
| POST   | `/signUp`      | Admin registration (logic exists in controller, not yet wired) |
| POST   | `/signIn`       | Admin login (logic exists in controller, not yet wired)        |
| POST   | `/`             | Buy course (placeholder)                  |
| PUT    | `/`             | Update (placeholder)                      |
| GET    | `/bulk`         | Bulk fetch (placeholder)                  |

### Courses — `/api/v1/course` *(routes currently empty stubs)*

| Method | Endpoint    | Description           |
|--------|---------------|---------------------------|
| POST   | `/purches`     | Purchase a course (not yet implemented) |
| GET    | `/preview`     | Preview courses (not yet implemented)   |

## Scripts

| Command       | Description                                   |
|-----------------|--------------------------------------------------|
| `npm run dev`   | Starts the server with Nodemon in dev mode         |

## License

ISC
