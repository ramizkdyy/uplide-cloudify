# Cloudify - SaaS Subscription Management Dashboard

A modern dashboard for managing SaaS subscriptions, costs, billing cycles, and usage tracking in one place.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (Strict mode)
- **State Management:** Zustand + TanStack Query
- **UI Library:** Shadcn/ui
- **Form Management:** React Hook Form + Zod
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **API:** JSON Server

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repo-url>
cd uplide-cloudify
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Start JSON Server (in a separate terminal)
```bash
npm run json-server
```

5. Start the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

**Demo Credentials:**
- Email: `admin@cloudify.com`
- Password: `admin123`

## Docker Setup

Run both frontend and JSON server together:
```bash
docker-compose up --build
```

Access the app at [http://localhost:3000](http://localhost:3000)

## Project Structure
```
├── app/
│   ├── (auth)/              # Login page
│   ├── (dashboard)/         # Protected dashboard pages
│   └── layout.tsx           # Root layout
├── components/
│   ├── dashboard/           # Dashboard components
│   ├── subscriptions/       # Subscription management
│   ├── layout/              # Sidebar, etc.
│   └── ui/                  # Shadcn UI components
├── lib/
│   ├── api/                 # API functions
│   ├── hooks/               # Custom hooks
│   ├── store/               # Zustand stores
│   └── types/               # TypeScript types
└── db.json                  # Mock database
```

## Architecture Decisions

### State Management
- **TanStack Query** for server state - handles caching, refetching, optimistic updates
- **Zustand** for auth state - simple and lightweight

### Modular Structure
Organized by feature. Each feature has its own components and hooks grouped together.

### URL State Synchronization
Filters and search queries are synced with URL parameters. This enables:
- Shareable filtered views
- Back/forward navigation works
- Filters persist on page refresh

### Optimistic Updates
All CRUD operations (create, update, delete) update the UI immediately, then send the API request. If it fails, changes are rolled back automatically.

### Responsive Design
Mobile-first design approach:
- Login page hides the "CLOUDIFY" text on mobile
- Dashboard cards stack vertically on mobile, side-by-side on desktop
- Sidebar becomes a hamburger menu on mobile
- Filters and tables are mobile-friendly
- Responsive grid system throughout

## Challenges & Solutions

### 1. Learning Shadcn UI
First time using Shadcn UI. The compound component pattern and Radix UI primitives were new to me. I studied the docs and examined the generated component code to understand how it works.

### 2. Auto-Logout on Cookie Expiration
Needed to automatically logout when a 401 error occurs. I used TanStack Query's global error handler to check for 401 errors across all API calls:
```typescript
retry: (failureCount, error: any) => {
  if (error?.response?.status === 401) {
    logout();
    router.push("/login");
    return false;
  }
  return failureCount < 3;
}
```

### 3. Next.js 15 useSearchParams
Build errors because `useSearchParams` requires a Suspense boundary in Next.js 15. Fixed by wrapping the component in Suspense with a skeleton fallback.

## Features

- ✅ Authentication with middleware protection
- ✅ Dashboard (total spending, most expensive, active count)
- ✅ 3 chart types (Bar, Pie, Line)
- ✅ Subscription CRUD operations
- ✅ Filtering and sorting
- ✅ Pagination (10 items per page)
- ✅ URL state synchronization
- ✅ Optimistic updates
- ✅ Skeleton loading states
- ✅ Form validation with Zod
- ✅ Responsive design
- ✅ Docker support

## Deployment

The app is deployed on Vercel: [Live Demo](your-vercel-url)

> Note: In production, JSON Server is replaced with static data.