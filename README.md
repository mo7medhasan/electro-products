# Electro Products

A modern, full-featured e-commerce web application built with Next.js 16 and React 19. It showcases a robust component architecture, responsive design, efficient state management, and an elegant UI/UX with fluid micro-animations.

## Live Demo

[Live Demo Link](https://electro-products.vercel.app/)

## Key Features

- **Product Catalog:** Browse products with React Server Components (RSC) and server actions.
- **Search & Filtering:** Real-time search with debounce capabilities (`useDebounce`) and category-based filtering.
- **Pagination:** Seamless and accessible navigation through product lists.
- **Authentication System:** Fully functional Login & Sign Up flows. Secures user sessions with JWT tokens managed securely via cookies (`js-cookie`) and centralized through `zustand`.
- **Product Details:** Dynamic routing for viewing engaging, individual product details (`/product/[id]`).
- **Responsive UI:** Tailored for mobile, tablet, and desktop viewports utilizing modern Tailwind CSS v4 patterns.
- **State Management:** Centralized authentication and application state via Zustand store (`useAuthStore`).
- **Testing:** Comprehensive test suite for critical UI components and utilities using `jest` and `@testing-library/react`.

## Tech Stack Used

- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Icons:** Lucide React
- **Cookies & Authentication:** js-cookie
- **Language:** TypeScript
- **Testing:** Jest, React Testing Library

## Folder Structure

The project follows a modular, feature-based architecture utilizing Next.js App Router route groups to cleanly separate concerns:

```text
electro-products/
├── .env                  # Environment variables
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router root
│   │   ├── (auth)/       # Auth route group (login, signup layouts & pages)
│   │   ├── (products)/   # Main products route group (home, product details, loading & 404 pages)
│   │   └── globals.css   # Global Tailwind styles
│   ├── components/       # React components
│   │   ├── layout/       # Layout specific pieces (Header, Sidebar, ProductCard, SearchBar)
│   │   └── shared/       # Reusable generic UI components (Button, Input, Image, Pagination)
│   ├── hooks/            # Custom React hooks (e.g., useDebounce)
│   ├── services/         # API abstraction layer (auth.api.ts, products.api.ts, categories.api.ts)
│   ├── store/            # Zustand state stores (useAuthStore.ts)
│   ├── types/            # Global TypeScript interfaces & types (index.ts)
│   └── utils/            # Helper formats and functions (e.g., formatUrl.ts)
├── jest.config.ts        # Jest testing configuration
├── jest.setup.ts         # Jest DOM Setup
└── package.json          # Project dependencies & scripts
```

## Setup Instructions

Follow these steps to set up the project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd electro-products
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` (or `.env.local`) file in the root directory. We use the [Platzi Fake Store API](https://fakeapi.platzi.com/) for mock data and authentication. Add the following line to configure your base URL:

   ```env
   NEXT_PUBLIC_API_URL=https://api.escuelajs.co/api/v1
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Testing

To run the test suite for the components and utility functions:

```bash
npm run test
```

## Evaluation Criteria Focus

Candidates will be evaluated based on the following:
- **Code quality:** Clean, readable, and maintainable code adhering to standard best practices.
- **Component architecture:** Modular, reusable, and well-structured component hierarchy.
- **Responsiveness:** A seamless experience tailored for mobile, tablet, and desktop viewports.
- **Performance:** Efficient rendering, optimized loading states (skeleton loaders), and thoughtful state management.
- **UX/UI implementation:** Exceptional user experience, modern aesthetics, and fluid micro-animations.
- **Git practices:** Meaningful and descriptive commit history with logical progression.
