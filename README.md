# Node.js JWT Authentication API

A Node.js REST API built with **Express.js**, **Prisma**, **PostgreSQL**, and **JWT authentication**.

## Features

* User registration
* Secure password hashing using bcrypt
* User login
* JWT token generation
* JWT authentication middleware
* Protected user APIs
* PostgreSQL database
* Prisma ORM
* Environment-based configuration
* Centralized error handling

## Technologies

* Node.js
* Express.js
* PostgreSQL
* Prisma
* JSON Web Token (JWT)
* bcryptjs
* dotenv

## Project Structure

```text
node-api/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── user.routes.js
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Installation

Clone the project and install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
PORT=3000

DATABASE_URL="postgresql://username:password@localhost:5432/node_api"

JWT_SECRET="your-super-secret-key"
JWT_EXPIRES_IN="1d"
```

Do not commit `.env` to Git.

## Database Setup

Initialize Prisma:

```bash
npx prisma init
```

After configuring the database and `schema.prisma`, run:

```bash
npx prisma migrate dev --name create_user
```

Generate Prisma Client:

```bash
npx prisma generate
```

## User Model

The application uses the following user model:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Passwords are never stored as plain text. They are hashed using bcrypt before being saved.

## Authentication Flow

### Registration

```text
Client
  ↓
POST /api/auth/register
  ↓
Validate input
  ↓
Check existing user
  ↓
Hash password
  ↓
Create user
  ↓
Return response
```

### Login

```text
Client
  ↓
POST /api/auth/login
  ↓
Find user by email
  ↓
Compare password
  ↓
Generate JWT
  ↓
Return token
```

### Protected Request

```text
Client
  ↓
GET /api/users/profile
  ↓
Authorization: Bearer <JWT>
  ↓
JWT Middleware
  ↓
Verify token
  ↓
req.user
  ↓
Controller
  ↓
Response
```

## API Endpoints

### Register

```http
POST /api/auth/register
```

Request:

```json
{
  "name": "Deepak",
  "email": "deepak@example.com",
  "password": "Password@123"
}
```

### Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "deepak@example.com",
  "password": "Password@123"
}
```

Response:

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

### Get Profile

```http
GET /api/users/profile
```

Header:

```http
Authorization: Bearer JWT_TOKEN
```

## JWT Middleware

The authentication middleware:

1. Reads the `Authorization` header.
2. Extracts the Bearer token.
3. Verifies the token using `JWT_SECRET`.
4. Adds the decoded user information to `req.user`.
5. Calls `next()` to continue the request.

Example:

```js
const decoded = jwt.verify(token, process.env.JWT_SECRET);

req.user = decoded;

next();
```

## Security

* Never store plain-text passwords.
* Use bcrypt to hash passwords.
* Keep `JWT_SECRET` in environment variables.
* Never commit `.env`.
* Use HTTPS in production.
* Use short-lived access tokens for production applications.
* Validate user input.
* Return appropriate HTTP status codes.
* Do not expose password hashes in API responses.

## Running the Application

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

The API will run on:

```text
http://localhost:3000
```

## Example Authorization Header

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

## Future Improvements

* Refresh token implementation
* Role-based authorization
* Request validation
* Rate limiting
* Email verification
* Password reset
* API documentation using Swagger
* Automated tests
* Docker support

```

If you want, **send me your current Node.js project files (or upload the project ZIP)** and I can adapt this directly to your existing application rather than starting with a generic structure.
```
