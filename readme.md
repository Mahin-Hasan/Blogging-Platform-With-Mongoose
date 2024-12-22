# Blogging Platform Server Development with Mongoose, MongoDB, TypeScript, Express and JWT

This project is focused on creating a server using **Mongoose**, **MongoDB**, **TypeScript**, **Express**, **Authorization** and **JWT**. The server is designed following a modular pattern, ensuring scalability and maintainability.

---

## 🌐 Live API


- **API Live Link**: [https://blog-project-server-xi.vercel.app/]  

---

## 🎥 Video Explanation


- **Video Walkthrough**: [https://youtu.be/8MRadApQPyI?si=NPG2a1tH0AX6v7Il]

## Getting Started

Follow the steps below to set up and start working on the project.

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v16 or higher)
- **npm** (Node Package Manager) or **yarn**
- A running **MongoDB** instance or a connection string for MongoDB Atlas.
- Must provide access **Tokens** and expiresIn in environment variables .
---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Mahin-Hasan/Blogging-Platform-With-Mongoose
cd ./your working directory

```

### Step 2: Install required packages and dev dependencies

```bash
npm i
```

### Step 3: provide MongoDB URL with your credentials at .env

```bash
DATABASE_URL= "your MongoDb URL"
```
# Blogging Platform Backend

A robust backend solution for a blogging platform, enabling secure user authentication, role-based access control, and CRUD operations for blogs. This API is built with modern web technologies, ensuring scalability, security, and maintainability.

## 🚀 Features

- **Role-Based Access Control (RBAC)**: Admins can manage users and blogs, while users can manage their own blogs.
- **Secure Authentication**: Includes hashed passwords, JWT-based authentication, and session management.
- **CRUD Operations**: Create, update, delete, and retrieve blogs with full user ownership control.
- **Public API**: Provides endpoints for public blog browsing with advanced search, sort, and filter functionalities.
- **Custom Error Handling**: Consistent and detailed error response structure for easier debugging.
- **Middleware**: Pre-save middleware for data validation and role verification.

---

## 🛠️ Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for scalable data storage.
- **Mongoose**: ODM for schema-based data modeling.
- **TypeScript**: Ensures type safety and reduces runtime errors.
- **JWT**: Secure token-based user authentication.
- **Bcrypt**: Hashing library for secure password storage.

---

## 📋 API Endpoints

### Authentication

- **POST** `/api/auth/register`  
  Register a new user.

- **POST** `/api/auth/login`  
  Login a user and return a JWT token.


### Blogs

- **GET** `/api/blogs`  
  Retrieve all blogs (public API).

- **POST** `/api/blogs`  
  Create a new blog (User only).


- **PATCH** `/api/blogs/:id`  
  Update a blog (Author of the created blog only).

- **DELETE** `/api/blogs/:id` `  
  Delete a blog (Author of the created blog only).

### Admin

- **PATCH** `/api/admin/users/:userId/block`  
  Block an User. (Admin only).

- **DELETE** `/api/admin/users/:userId`  
  Delete a user (Admin only).


