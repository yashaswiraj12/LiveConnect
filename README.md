Live Connect

🚀 Live Connect is a real-time chat and video calling platform built with modern web technologies, providing a seamless communication experience.

✨ Features

🔐 Authentication with Clerk

💬 Real-time Chat (socket-based / API driven)

🎥 Video Calling powered by Stream

📡 Event Handling & Workflows with Inngest

⚡ Fast & Scalable Backend (Express + MongoDB)

🎨 Frontend with React + Vite + Tailwind CSS

📊 Error Monitoring using Sentry

🌍 Deployed on Vercel (Frontend)
 & [Render/Any server hosting for Backend]

🛠️ Tech Stack

Frontend:

React (Vite)

Tailwind CSS

Clerk (Authentication)

Stream Video SDK

Backend:

Node.js + Express

MongoDB + Mongoose

Clerk Middleware (Auth)

Inngest (Event driven workflows)

Sentry (Error tracking)

⚙️ Installation
1. Clone the repo
git clone https://github.com/<your-username>/live-connect.git
cd live-connect

2. Backend Setup
cd Backend
npm install


Create a .env file in server/ with the following:

PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_url
CLERK_SECRET_KEY=your_clerk_secret
STREAM_API_KEY=your_stream_api_key
STREAM_SECRET=your_stream_api_secret


Run server:

npm run dev

3. Frontend Setup
cd frontend 
npm install


Create a .env file in client/ with:

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_BACKEND_URL=http://localhost:5000
VITE_STREAM_API_KEY=your_stream_key


Run frontend:

npm run dev
