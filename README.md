# 📝 Blogging Platform API

A powerful and secure **Blogging Platform Backend** built with **Node.js**, **Express.js**, and **MongoDB**. It supports authentication, post management, comments, likes, following system, and image uploads via **Cloudinary** — designed with scalability, performance, and clean RESTful design in mind.

---

## 🚀 Features

- 🔐 **JWT Authentication** (Sign Up / Login / Protected Routes)
- 🧑‍💻 **User Profiles** (Edit profile, follow/unfollow users)
- 📝 **Create, Update, Delete Posts** (Only author can update/delete)
- 💬 **Comment System** (Add and remove comments on posts)
- ❤️ **Like / Unlike Posts**
- 🔍 **Search Posts** by keyword
- 📦 **Pagination & Limit** on post listing
- ☁️ **Cloudinary Integration** for image upload (No Multer needed)
- ⚙️ **MongoDB Transactions** on sensitive operations
- 🔒 Secured with **Helmet**, **Rate Limiting**, and **Input Validation**

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| Node.js    | Runtime Environment |
| Express.js | Backend Framework |
| MongoDB + Mongoose | Database & ODM |
| Cloudinary | Media storage (images) |
| JWT        | Authentication |
| bcrypt     | Password hashing |
| dotenv     | Environment management |
| express-validator | Input validation |
| Helmet     | Security headers |
| Rate Limit | Request limiting |

---

## 📁 Folder Structure

```bash
.
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── config/
├── database
├── .env.development.local
├── .env.production.local
├── app.js
└── README.md
