# 🎓 Student Management System (MERN Stack)

A **full‑stack Student Management System** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.
This project provides an efficient way to manage student records, including adding, updating, viewing, and deleting student information through a modern web interface.

---

## 🌐 Project Overview

The Student Management System is designed to simplify academic record handling for institutions. It separates concerns clearly using **frontend** and **backend** folders, following industry‑standard MERN architecture.

* **Frontend**: React-based user interface for users/admins
* **Backend**: RESTful API built with Node.js & Express
* **Database**: MongoDB for persistent data storage

---

## ✨ Features

* 👤 Student registration and management
* ✏️ Update student details
* 🗑️ Delete student records
* 📄 View student list in real time
* 🔍 Search and filter students
* 🔐 REST API with proper MVC structure
* 📱 Responsive React UI

---

## 🛠️ Tech Stack

### Frontend

* React.js
* HTML5
* CSS3
* Axios (API calls)

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## 📂 Project Structure

```
student-management-system/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/student-management-system.git
```

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run backend server:

```
npm start
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm start
```

Frontend will run on:

```
http://localhost:3000
```

Backend API runs on:

```
http://localhost:5000
```

---

## 🔗 API Endpoints (Example)

* `GET /api/students` – Get all students
* `POST /api/students` – Add new student
* `PUT /api/students/:id` – Update student
* `DELETE /api/students/:id` – Delete student

---

## 🎯 Use Cases

* College / School Student Records
* Academic Projects (BCA, MCA, B.Tech)
* MERN Stack Practice Project
* Admin Dashboard Learning

---

## 👨‍💻 Author

**Raj Prajapati**
MERN Stack Developer | Student

> *This project was developed to strengthen full‑stack development skills and understand real‑world MERN architecture.*

---

## 📜 License

This project is licensed for **educational purposes only**.

---

## ❤️ Acknowledgement

Thanks to open‑source communities and MERN documentation for guidance and learning support.

---

⭐ *If you like this project, don’t forget to star the repository!*
