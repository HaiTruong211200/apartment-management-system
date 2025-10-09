# 🏢 Apartment Management System

## 📘 Overview

**Apartment Management System** is a full-stack web application designed to streamline apartment administration.  
It enables administrators, staff, and residents to efficiently manage personal data, service requests, and communication within an apartment complex.

<!-- The system focuses on **security**, **usability**, and **scalability**, providing role-based access and a responsive user interface.

---

## ✨ Key Features

### 👩‍💼 Administrator
- Manage residents, households, and staff accounts
- Approve or reject resident registration requests
- Handle service requests and assign tasks to staff
- Generate and export reports

### 🧑‍🔧 Staff
- View and process assigned service requests
- Update task progress and completion status
- Communicate with residents or administrators

### 🏠 Resident
- Register and update personal/household information
- Submit service or maintenance requests
- View request history and current status
- Receive system notifications

--- -->

## 🛠️ Tech Stack

| Layer               | Technologies                     |
| ------------------- | -------------------------------- |
| **Frontend**        | React, Vite, Tailwind CSS, Axios |
| **Backend**         | Node.js, Express.js              |
| **Database**        | MongoDB / MySQL                  |
| **Authentication**  | JWT (JSON Web Token)             |
| **Version Control** | Git + GitHub                     |

## 🔐 Auth API (Node.js / Express / PostgreSQL)

Backend located in `server/` provides registration & login using bcrypt + JWT.

### Endpoints

- `POST /api/auth/register` body: `{ email, password, fullName }`
- `POST /api/auth/login` body: `{ email, password }`
- `GET /api/auth/me` header: `Authorization: Bearer <token>`

### Quick Start

1. Create database (default name `ams`).
2. Copy `server/.env.example` to `server/.env` and adjust secrets.
3. Install deps:
   ```bash
   cd server
   npm install
   npm run dev
   ```
4. Server runs on `http://localhost:4000`.

### Security Notes

- Passwords hashed with bcrypt (configurable rounds via `BCRYPT_SALT_ROUNDS`).
- JWT signed with HS256; rotate & store `JWT_SECRET` securely.
- Use HTTPS + secure cookie (if moving token to cookie in future).
- Apply role-based authorization with provided middleware scaffold.
