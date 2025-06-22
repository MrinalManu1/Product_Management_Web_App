<<<<<<< HEAD
# 🛍️ PERN Stack Product Management Web App

A modern, responsive Product Management Web App platform built with the PERN stack (PostgreSQL, Express.js, React, Node.js).  
Features user authentication, product management, and a sleek, professional UI.
Deployed link:  https://modern-e-commerce-site.onrender.com 

---

## ✨ Features

- **🔒 Secure User Authentication:** Register, login, and logout with JWT and HTTP-only cookies.
- **👥 Role-Based Access:** Admins can add, edit, and delete products; customers can browse products.
- **📦 Product Management:** View, add, edit, and delete products.
- **📱 Responsive Design:** Works seamlessly on all devices.
- **🛡️ Security:** Password salting and hashing with bcryptjs.

---

## 🛠️ Tech Stack

| Layer      | Technology/Library         |
|------------|---------------------------|
| Frontend   | React, Vite, Tailwind CSS, DaisyUI |
| Backend    | Node.js, Express.js       |
| Database   | PostgreSQL (Neon)         |
| Auth       | JWT, HTTP-only cookies, bcryptjs |
| Routing    | React Router              |
| State      | Zustand                   |

---

## 📂 Project Structure

![image](https://github.com/user-attachments/assets/b97df068-2446-435a-90db-7e1a90be1a02)




## 🚀 Installation

1. **Clone the repository:**
git clone https://github.com/MrinalManu1/Product_Management_Web_App
cd posgrestore

text

2. **Install dependencies:**
npm install
cd frontend
npm install
cd ..

text

3. **Set up environment variables:**
- Create a `.env` file in the `backend` folder with:
  ```
  JWT_SECRET=your-very-strong-secret-key
  DATABASE_URL=your-neon-postgres-connection-string
  ```

4. **Seed the database (optional):**
cd backend
npm run seed

text

5. **Start the servers:**
- **Backend:**
  ```
  npm run dev
  ```
- **Frontend:**
  ```
  cd frontend
  npm run dev
  ```

---

## 🖼️ Screenshots

![image](https://github.com/user-attachments/assets/25ab8329-02c5-49b9-87a1-43701e102044)

*Homepage of the Product_Management_Web_App *

![image](https://github.com/user-attachments/assets/f726b92e-4829-4969-9c22-326fc9fcfd4f)

*User login screen*

![image](https://github.com/user-attachments/assets/44ecda71-fc7d-4184-8122-a85f4cf69095)

*Admin product management interface*

---

## 📝 Notes

- **Authentication:** Uses JWT stored in HTTP-only cookies for security.
- **Database:** PostgreSQL hosted on Neon. Change the connection string in `.env` for your own database.
- **Seeding:** Run `npm run seed` in the `backend` folder to populate the database with sample products.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.


