# Dealzo - Price Comparison & Affiliate App

A production-ready Next.js 15 application for price comparison and affiliate monetization.

## Features

- **Price Comparison**: Compares prices from Amazon, Flipkart, Walmart, BestBuy (Mocked for demo).
- **Affiliate System**: Automatically generates affiliate links and redirects.
- **Product Extraction**: Extracts product titles from URLs.
- **Search**: Smart search with fuzzy matching and caching.
- **Premium UI**: Glassmorphism, dark mode, and responsive design.
- **Performance**: Edge-ready API routes (Node.js runtime used for stability with Firebase), caching with Firestore.

## Tech Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS + Shadcn UI
- Firebase Firestore (Caching)
- Cheerio (Scraping)

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file with your Firebase config (optional for mock data, but required for caching):
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   # ... other firebase config
   ```

3. **Run Locally**:
   ```bash
   npm run dev
   ```

4. **Deploy**:
   Push to GitHub and deploy on Vercel.

## Folder Structure

- `src/app`: Pages and API routes.
- `src/components`: UI components.
- `src/lib`: Utilities and business logic.
