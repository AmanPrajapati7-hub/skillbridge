# SkillBridge - Freelance Marketplace

A full-stack freelance marketplace web application built with the MERN stack, similar to Fiverr. Users can register as Buyers or Sellers, browse gigs, place orders, chat, and leave reviews.

## Developer Details

- Name: Aman Prajapati
- Project: SkillBridge - Freelance Marketplace
- Tech Stack: MongoDB, Express.js, React.js, Node.js

## Features

- JWT Authentication with Buyer and Seller roles
- Seller Dashboard to create and manage gigs
- Buyer Dashboard to browse and search gigs
- Order System with status tracking
- Chat System between buyer and seller
- Review and Rating System
- Professional UI with Tailwind CSS

## Tech Stack

- Frontend: React.js, Tailwind CSS, React Router DOM
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Authentication: JWT with Cookies
- State Management: React Context API

## How to Run Locally

Step 1 - Clone the repository

git clone https://github.com/AmanPrajapati7-hub/skillbridge.git
cd skillbridge

Step 2 - Backend Setup

cd server
npm install
npm run dev

Step 3 - Frontend Setup

cd client
npm install
npm run dev

Step 4 - Environment Variables

Create a file called .env inside the server folder and add:

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development

## Pages

1. Home - Landing page with hero section and categories
2. Register and Login - Authentication with role selection
3. Browse Gigs - Browse, search and filter gigs
4. Gig Detail - View gig, place order, leave review
5. Seller Dashboard - Manage gigs and orders
6. Buyer Dashboard - Track orders and spending
7. Orders - Order management with status updates
8. Chat - Messaging between buyer and seller

## API Endpoints

POST /api/auth/register - Register new user
POST /api/auth/login - Login user
POST /api/auth/logout - Logout user
GET /api/gigs - Get all gigs
POST /api/gigs - Create new gig
GET /api/gigs/:id - Get single gig
POST /api/orders/:gigId - Place an order
GET /api/orders/my - Get my orders
PUT /api/orders/:id - Update order status
POST /api/chat/:userId - Send message
GET /api/chat/:userId - Get messages
POST /api/reviews/:gigId - Add review
GET /api/reviews/:gigId - Get gig reviews

## Project Structure

skillbridge/
├── client/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       └── pages/
└── server/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    └── routes/

## College Project

This project was built as a college submission demonstrating full-stack web development using the MERN stack.