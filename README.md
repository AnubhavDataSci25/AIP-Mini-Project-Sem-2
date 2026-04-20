# Job Portal System

A full-stack mini project for job posting and recruitment workflow management, built with:
- **Frontend:** HTML, CSS, JavaScript, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)

## Features

- User registration and login with JWT-based authentication
- Role-based access (`user` and `admin`)
- Browse all available jobs
- Apply to jobs with resume links
- Track application status (`Applied`, `Selected`, `Rejected`)
- Admin dashboard to:
  - create and delete jobs
  - review all applications
  - update applicant status

## Project Structure

```text
AIP-Mini-Project-Sem-2/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    ├── css/
    ├── js/
    └── *.html
```

## Backend Setup

1. Go to backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional but recommended) Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/job_portal
   JWT_SECRET=your_secret_key
   ```
4. Start backend server:
   ```bash
   npm start
   ```
   For development with auto-restart:
   ```bash
   npm run dev
   ```

Backend runs at: `http://localhost:5000`

## Frontend Setup

The frontend is static HTML/CSS/JS.

- Open `frontend/index.html` directly in the browser, **or**
- Serve the `frontend` directory using any static server.

> Frontend API calls are configured for `http://localhost:5000`.

## Main API Routes

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Jobs
- `GET /api/jobs` (public)
- `POST /api/jobs` (admin)
- `PUT /api/jobs/:id` (admin)
- `DELETE /api/jobs/:id` (admin)

### Applications
- `POST /api/applications/apply` (authenticated user)
- `GET /api/applications/my` (authenticated user)
- `GET /api/applications` (admin)
- `PUT /api/applications/:id/status` (admin)

## Notes

- Default local MongoDB fallback is used if `MONGO_URI` is not set.
- A default JWT secret fallback exists in code, but you should set `JWT_SECRET` in production.
