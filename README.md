# Shopping Hub - E-Commerce Web Application

A modern, feature-rich e-commerce platform built with Next.js 16, React Context API, and Tailwind CSS. This application demonstrates advanced frontend development skills including state management and performance optimization.

## 🌐 Live Demo

**Live Application:** [https://shopping-hub-xi-red.vercel.app/](https://shopping-hub-xi-red.vercel.app/)  
**GitHub Repository:** [https://github.com/mdajgarhossain/ecommerce-app](https://github.com/mdajgarhossain/ecommerce-app)

## ✨ Features

### Core Features

- 🛍️ **Product Catalog** - Browse products with images, prices, ratings, and categories
- 🔍 **Advanced Search & Filter** - Real-time search with category filtering.
- 📄 **Product Details** - Dynamic routing with comprehensive product information
- 🛒 **Shopping Cart** - Add, update, remove items with real-time price calculations
- 💾 **Cart Persistence** - Cart data saved to localStorage across sessions
- 🌓 **Dark Mode** - Seamless light/dark theme toggle with preference persistence
- ✅ **Checkout Simulation** - Basic checkout flow with order confirmation

## 🛠️ Tech Stack

### Frontend Framework

- **Next.js 16.0.0** - React framework with App Router
- **React 19.2.0** - UI library with latest features

### Styling

- **Tailwind CSS v4** - Utility-first CSS framework
- **Custom Animations** - Smooth transitions and interactions

### State Management

- **Context API** - Centralized state with useReducer pattern
- **localStorage** - Client-side data persistence

### HTTP & Data Fetching

- **Axios** - HTTP client for API requests
- **FakeStore API** - Mock e-commerce data source

### UI Components

- **Lucide React** - Modern icon library
- **Next.js Image** - Optimized image component

### Development Tools

- **ESLint** - Code quality and consistency
- **Git** - Version control

## 📁 Project Structure

```
shopping-hub/
├── public/                      # Static assets
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.js           # Root layout with providers
│   │   ├── page.js             # Homepage
│   │   ├── globals.css         # Global styles
│   │   ├── products/
│   │   │   └── [id]/           # Dynamic product routes
│   │   │       ├── page.js     # Server component
│   │   │       └── ProductDetailsClient.js
│   │   ├── cart/
│   │       └── page.js         # Shopping cart page
│   │
│   │
│   ├── components/              # Reusable UI components
│   │   ├── Navbar.js           # Navigation with cart indicator
│   │   ├── ProductCard.js      # Product display card
│   │   ├── CartItem.js         # Cart item component
│   │   └── ThemeToggle.js    # Theme toggle component
│   │
│   ├── context/                 # State management
│       └── CartContext.js      # Cart state with useReducer
│
├── .gitignore                   # Git ignore rules
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mdajgarhossain/ecommerce-app.git
   cd ecommerce-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   Navigate to http://localhost:3000
   ```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start

# Or deploy to Vercel
vercel --prod
```

## 🏗️ System Design & Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (Client)                      │
├─────────────────────────────────────────────────────────────┤
│  Next.js App Router (React 18)                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Server Components          Client Components       │   │
│  │  ├─ Product List (SSG)     ├─ Cart Management      │   │
│  │  ├─ Product Details (SSG)  ├─ Search & Filter      │   │
│  │  └─ Metadata Generation    ├─ Theme Toggle         │   │
│  │                             └─ Interactive UI       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  State Management Layer                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Context API + useReducer                           │   │
│  │  ├─ CartContext (Global State)                      │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Data Persistence Layer                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  localStorage API                                    │   │
│  │  ├─ Cart Data                                        │   │
│  │  ├─ Theme Preference                                 │   │
│  │  └─ Recently Viewed Products                         │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    External API Layer                        │
│                   FakeStore API (REST)                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  GET /products          - Fetch all products        │   │
│  │  GET /products/:id      - Fetch single product      │   │
│  │  GET /products/categories - Fetch categories        │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Architecture

```
┌──────────────────────────────────────────────────────────┐
│                      User Actions                         │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│               UI Components (React)                       │
│  • ProductCard  • CartItem  • Navbar                     │
└────────────────┬─────────────────────────────────────────┘
                 │
                 │ dispatch(action)
                 ▼
┌──────────────────────────────────────────────────────────┐
│            Context API + useReducer                       │
│  • State: { items, totalPrice, totalQuantity }          │
│  • Actions: ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY      │
└────────────────┬─────────────────────────────────────────┘
                 │
                 │ state update
                 ▼
┌──────────────────────────────────────────────────────────┐
│              Side Effects (useEffect)                     │
│  • Save to localStorage                                   │
│  • Calculate totals                                       │
│  • Trigger toast notifications                           │
└────────────────┬─────────────────────────────────────────┘
                 │
                 │ re-render
                 ▼
┌──────────────────────────────────────────────────────────┐
│            Updated UI (React Re-render)                   │
│  • Cart count badge updated                              │
│  • Cart items refreshed                                  │
│  • Total price recalculated                              │
└──────────────────────────────────────────────────────────┘
```

### State Management Flow

**Cart State Management (useReducer Pattern):**

```javascript
Initial State → Action Dispatched → Reducer Function → New State → UI Update

Example: Adding Product to Cart
─────────────────────────────────
User clicks "Add to Cart"
         ↓
dispatch({ type: 'ADD_ITEM', payload: product })
         ↓
cartReducer checks if item exists
         ↓
If exists: Increment quantity
If new: Add to items array
         ↓
Calculate new totals (totalPrice, totalQuantity)
         ↓
Return new state
         ↓
useEffect saves to localStorage
         ↓
Components using useCart() re-render
         ↓
UI updates (cart badge, cart page)
```

### Performance Optimization Strategy

1. **Code Splitting**

   - Dynamic imports for heavy components
   - Route-based splitting (automatic with Next.js)

2. **Image Optimization**

   - Next.js Image component (automatic WebP/AVIF)
   - Lazy loading with blur placeholder
   - Responsive image sizes for different devices

3. **Data Fetching**

   - Static Site Generation (SSG) for product pages
   - Client-side caching with localStorage
   - Debounced search input (500ms delay)

4. **Bundle Size**
   - Tree shaking (unused code removed)
   - Minification in production
   - CSS purging with Tailwind

## 🎯 Key Technical Decisions

### 1. Context API vs Redux

**Chose Context API because:**

- ✅ Built into React (no additional dependencies)
- ✅ Simpler setup and maintenance
- ✅ Sufficient for app's state complexity
- ✅ Better learning demonstration

**Would choose Redux if:**

- App grows significantly larger
- Need middleware (sagas, thunks)
- Require time-travel debugging
- Team standardized on Redux

### 2. Static Site Generation (SSG)

**Chose SSG for product pages because:**

- ✅ Better SEO (pre-rendered HTML)
- ✅ Faster page loads (HTML ready)
- ✅ Lower server costs (static files)
- ✅ Works with CDN caching

**Implementation:**

```javascript
// generateStaticParams creates pages at build time
export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p) => ({ id: p.id.toString() }));
}
```

### 3. Component Architecture

**Atomic Design Principles:**

- **Atoms:** Buttons, inputs, icons
- **Molecules:** ProductCard, CartItem
- **Organisms:** Navbar, ProductGrid
- **Pages:** Homepage, Cart, Product Details

**Benefits:**

- Reusability across the app
- Easier testing and maintenance
- Clear separation of concerns
- Scalable structure

## 🧪 Testing

### Manual Testing Checklist

- ✅ All CRUD operations on cart
- ✅ Search and filter functionality
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode toggle
- ✅ localStorage persistence
- ✅ Error states and loading states
- ✅ Browser compatibility (Chrome, Firefox, Safari, Edge)

## 🚢 Deployment

### Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

### Manual Deployment

```bash
# Build application
npm run build

# Start production server
npm start
```

### Environment Variables

No environment variables required for current setup. If adding backend:

```env
NEXT_PUBLIC_API_URL=https://api.yourbackend.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## ⏱️ Development Timeline

### Time Breakdown

| Phase | Task                                        | Time Spent |
| ----- | ------------------------------------------- | ---------- |
| 1     | Project Setup & Planning                    | 1 hour     |
| 2     | Context API & State Management              | 2.5 hours  |
| 3     | Core Components (Navbar, ProductCard, Cart) | 2 hours    |
| 4     | Pages (Homepage, Product Details, Cart)     | 1.5 hours  |
| 5     | Styling & Responsiveness                    | 1 hours    |
| 6     | Bonus Features (Search, Filter, Dark Mode)  | 2 hours    |
| 7     | Documentation & README                      | 1 hour     |

**Total Time:** ~11 hours

### Development Approach

1. **Day 1 (3.5 hour):** Setup, architecture planning, core state management
2. **Day 2 (7.5 hours):** Component development, routing, basic functionality, Styling, bonus features

## 👨‍💻 Author

**Md Ajgar Hossain**

- GitHub: [@mdajgarhossain](https://github.com/mdajgarhossain)
- LinkedIn: [Md Ajgar Hossain](https://linkedin.com/in/mdajgarhossain)
- Email: ajgarhossain1@gmail.com

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [FakeStore API](https://fakestoreapi.com)
- [Lucide Icons](https://lucide.dev)
- [Vercel](https://vercel.com) for hosting
- [Claude AI](https://claude.ai) by Anthropic for development assistance

---

**Built with ❤️ using Next.js and React**
