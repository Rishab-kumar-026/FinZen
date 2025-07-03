# FinZen Backend

This is the backend API for the FinZen personal finance app, built with Node.js, Express, and MongoDB.

## Features
- User authentication (JWT)
- Transactions (income/expense)
- AI-powered Spending Coach
- Micro-investor guide and loan eligibility
- RESTful API for frontend integration

## Setup
1. **Clone the repo:**
   ```bash
   git clone <repo-url>
   cd backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a `.env` file:**
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. **Run locally:**
   ```bash
   npm run dev
   ```

## Deployment (Render)
- Set your environment variables (`MONGO_URI`, `PORT`) in the Render dashboard.
- Use the `start` command: `node index.js` (add to package.json if missing).

## API Endpoints
- `/api/auth` - Auth routes
- `/api/user` - User profile
- `/api/transactions` - Transactions
- `/api/spending-coach` - AI coach
- ...and more

---
**Do not commit your `.env` file or secrets to GitHub!** 