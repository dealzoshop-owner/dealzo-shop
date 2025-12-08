# DealzoShop: Execution Roadmap

## Phase 1: Foundation & Stability (Immediate)
- [x] **Core Search Engine**: Next.js + SerpApi integration.
- [x] **Affiliate Engine**: Basic link rewriting and sanitization.
- [x] **UI/UX**: Responsive grid, skeleton loaders, error handling.
- [x] **SEO**: Metadata, Sitemap, Robots.txt, Brand Pages.
- [ ] **Database Setup**: Initialize PostgreSQL (Supabase/Neon) for persistent product storage.
- [ ] **User Auth**: Save user preferences and wishlists (Firebase/Supabase Auth).

## Phase 2: Intelligence & Performance (Next 2-4 Weeks)
- [ ] **Redis Caching**: Implement Upstash Redis to cache search results for 1-6 hours.
- [ ] **Product Catalog**: Start saving searched products to DB to build an internal index.
- [ ] **Smart Search**: Implement "Did you mean?" and auto-complete using a lightweight search index (e.g., Meilisearch or Algolia).
- [ ] **Price History**: Track price changes for stored products over time.

## Phase 3: Advanced AI Features (Month 2+)
- [ ] **Vector Search**: Generate embeddings for product titles and enable semantic search.
- [ ] **Personalization**: "Recommended for you" section based on view history.
- [ ] **Price Prediction**: Simple heuristic models (e.g., "Lowest price in 30 days").

## Phase 4: Scale & Automation (Month 3+)
- [ ] **Background Workers**: Automated daily re-crawling of top 1000 products.
- [ ] **Multi-Source Ingestion**: Integrate direct affiliate feeds (CSV/XML) to bypass API costs.
- [ ] **Mobile App**: React Native wrapper for the web app.
