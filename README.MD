# Note App Backend

This is the **backend server** for the **Note App**, handling **user authentication**, **OTP verification**, **Google OAuth login**, and **CRUD operations for notes**. Built with **Node.js**, **Express**, and **MongoDB**, it provides a **secure API** for the frontend.

---

## **Technologies Used**

- **Node.js**  
- **Express.js**  
- **MongoDB & Mongoose**  
- **Passport.js** (Google OAuth)  
- **JWT** (JSON Web Tokens)  
- **dotenv** (environment variables)  
- **CORS**  

---

## **Features**

- **User authentication** (signup/login)  
- **Google OAuth authentication**  
- **OTP verification** for secure login/signup  
- **Create, read, update, delete notes**  
- **Secured routes** for authenticated users  
- **Environment-variable-based configuration**  

---

## **Getting Started**

### **1. Clone the Repository**

```bash
git clone <backend-repo-url>
cd backend

2. Install Dependencies
npm install

3. Configure Environment Variables

Create a .env file in the root directory with the following variables:

PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_CALLBACK_URL=https://note-frontend-typescript.vercel.app/api/auth/google/callback

4. Run the Server
npm run dev

API Endpoints

Authentication

POST /api/auth/signup → Sign up a new user

POST /api/auth/login → Login with email/password

GET /api/auth/google → Redirect to Google OAuth

GET /api/auth/google/callback → Handle Google OAuth callback

OTP Verification

POST /api/otp/sendotp → Send OTP to email

POST /api/otp/verifyotp → Verify OTP

Notes CRUD (JWT required)

POST /api/notes → Create a new note

GET /api/notes → Get all notes for the logged-in user

GET /api/notes/:id → Get a single note

PUT /api/notes/:id → Update a note

DELETE /api/notes/:id → Delete a note