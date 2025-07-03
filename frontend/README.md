# FinZen Frontend

This is the frontend for the FinZen personal finance app, built with React and Vite.

## Features
- Modern dashboard UI (glassmorphic, animated)
- AI-powered Spending Coach
- Micro-investor guide, loan eligibility, onboarding
- Responsive and mobile-friendly

## Setup
1. **Clone the repo:**
   ```bash
   git clone <repo-url>
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a `.env` file:**
   ```env
   VITE_API_BASE=https://your-backend-url.onrender.com/api
   ```
4. **Run locally:**
   ```bash
   npm run dev
   ```

## Deployment (Render/Netlify/Vercel)
- Set your environment variable `VITE_API_BASE` to your backend API URL.
- Build with `npm run build` and deploy the `dist` folder.

---
**Do not commit your `.env` file or secrets to GitHub!**
