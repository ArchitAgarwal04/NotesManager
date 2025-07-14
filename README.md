# Personal Notes and Bookmark Manager

A modern, full-stack web application for managing personal notes and bookmarks. Built with Next.js (frontend), Node.js/Express (backend), and MongoDB. Features user authentication, CRUD for notes and bookmarks, search, tags, favorites, and a beautiful responsive UI.

**GitHub Repository:** [ArchitAgarwal04/NotesManager](https://github.com/ArchitAgarwal04/NotesManager.git)

---

## ✨ Features

### 🔐 Authentication
- User registration & login (JWT-based)
- Protected routes (notes/bookmarks only for logged-in users)
- Persistent sessions

### 📝 Notes Management
- Create, edit, delete notes
- Tag system for organization
- Mark notes as favorites
- Search and filter by tags

### 🔖 Bookmark Management
- Add, edit, delete bookmarks
- Auto-fetch website title from URL
- Tag organization
- Mark bookmarks as favorites
- Search and filter by tags

### 🎨 User Interface
- Modern, responsive design (Next.js + Tailwind CSS)
- Toast notifications for user feedback
- Smooth animations (Framer Motion)
- Mobile-friendly

---

## 🛠️ Tech Stack
- **Frontend:** Next.js 13+, React, Tailwind CSS, Zustand, shadcn/ui, Framer Motion
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, express-validator, dotenv, CORS
- **State Management:** Zustand
- **Notifications:** Sonner
- **API:** RESTful, protected with JWT

---

## 🚀 Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/ArchitAgarwal04/NotesManager.git
cd NotesManager
```

### 2. Install Dependencies
#### Frontend
```sh
npm install
```
#### Backend
```sh
cd backend
npm install
```

### 3. Environment Variables
#### Backend (`backend/.env`)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```
#### Frontend (`.env.local` in project root, optional)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Run the App
#### Start Backend
```sh
cd backend
npm run dev
```
#### Start Frontend
```sh
cd ..
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)

---

## 📚 API Endpoints

### Auth
- `POST /api/auth/signup` `{ name, email, password }` → `{ token }`
- `POST /api/auth/login` `{ email, password }` → `{ token }`

### Notes (JWT required)
- `POST /api/notes` `{ title, content, tags?, favorite? }`
- `GET /api/notes?q=search&tags=tag1,tag2`
- `GET /api/notes/:id`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`

### Bookmarks (JWT required)
- `POST /api/bookmarks` `{ url, title?, description?, tags?, favorite? }`
- `GET /api/bookmarks?q=search&tags=tag1,tag2`
- `GET /api/bookmarks/:id`
- `PUT /api/bookmarks/:id`
- `DELETE /api/bookmarks/:id`

**Auth Header:**
```
Authorization: Bearer <token>
```

---

## 🧪 Testing
- Use the frontend UI or tools like Postman/curl to test API endpoints.
- Example curl:
```sh
curl -X POST http://localhost:5000/api/auth/signup -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

---

## 📁 Project Structure
```
NotesManager/
├── app/                # Next.js App Router pages (frontend)
├── backend/            # Express.js backend (API, models, controllers)
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Zustand stores, auth utils, helpers
├── public/             # Static assets
├── styles/             # Global styles (Tailwind)
├── .env.local          # Frontend env (optional)
├── backend/.env        # Backend env
└── ...
```

---

## 📝 Contributing
1. Fork the repo
2. Create a feature branch
3. Commit and push your changes
4. Open a Pull Request

---


**Built by [ArchitAgarwal04](https://github.com/ArchitAgarwal04/NotesManager.git)**
