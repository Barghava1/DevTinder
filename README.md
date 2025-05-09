# 💘 DevTinder Backend API

A full-featured Tinder-style backend built using **Node.js**, **Express**, and **MongoDB**. This project includes secure authentication, connection request logic, feed generation, and middleware to simulate real-world dating app functionality.

---

## 🚀 Features

- 🔐 **User Signup & Login**
  - Password hashing using **bcrypt**
  - **JWT-based Authentication**
  - Secure **HTTP-only cookies** for storing tokens

- 🧾 **Logout API**
  - Clears session/token from cookie

- 🧱 **Middleware**
  - Auth middleware for protected routes
  - Role-based Authorization checks

- 🧑‍🤝‍🧑 **User & Connection Schema**
  - `User` schema stores user details
  - `ConnectionRequest` schema tracks likes, rejections, pending requests

- 👀 **Profile View API**
  - Get current user profile securely

- ❤️ **Send Request API**
  - Send a connection (like) request to another user
  - Prevents duplicate or reverse requests

- 🧠 **Feed API**
  - Returns list of nearby or relevant profiles to swipe
  - Filters based on request status to avoid showing liked/rejected users

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + Cookies
- Bcrypt
- Postman (for testing)

---


