# FoodWagen - Food Delivery App

A modern Next.js 15 food delivery application with full CRUD operations, built with TypeScript, TailwindCSS, and React Query.

## 🚀 Features

- **Browse Meals**: View featured meals from restaurants near you
- **Search**: Real-time search functionality with debouncing
- **CRUD Operations**: Add, edit, and delete food items
- **Responsive Design**: Mobile-first design with full desktop support
- **Form Validation**: Comprehensive form validation with error handling
- **Loading States**: Proper loading indicators during API operations
- **Animations**: Smooth slide-up entry animations and hover effects
- **Test Coverage**: Comprehensive test suite with Vitest

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 3
- **State Management**: TanStack React Query (v5)
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form with Zod validation
- **Testing**: Vitest + React Testing Library
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or pnpm

## 🔧 Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd orbit-studio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

## 🚀 Development

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

Run the test suite:

\`\`\`bash
npm test
\`\`\`

The project includes tests for:
- **Component Rendering**: Verifies components render with expected props
- **User Interaction**: Tests button clicks and form submissions
- **API Mocking**: Tests API calls with mocked responses

## 📦 Build

Create a production build:

\`\`\`bash
npm run build
\`\`\`

Start the production server:

\`\`\`bash
npm start
\`\`\`

## 🎨 Design Guidelines

This project follows strict naming conventions for testing and accessibility:

### CSS Classes
- All food-related classes use the `food-` prefix
- Examples: `food-card`, `food-button`, `food-input`

### Test IDs
- All test IDs start with `food-`
- Examples: `food-add-btn`, `food-delete-btn`, `food-search-input`

### Form Inputs
- **food_name**: Food name input
- **food_rating**: Food rating (1-5)
- **food_image**: Food image URL
- **restaurant_name**: Restaurant name
- **restaurant_logo**: Restaurant logo URL
- **restaurant_status**: "Open Now" or "Closed"

### Error Messages
- Error IDs follow the pattern: `{field-name}-error`
- Examples: `food-name-error`, `restaurant-status-error`

## 📁 Project Structure

\`\`\`
.
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # React Query provider
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── common/           # Shared components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Modal.tsx
│   ├── food/             # Food-specific components
│   │   ├── FoodCard.tsx
│   │   └── FoodForm.tsx
│   └── ui/               # UI component library
├── hooks/                # Custom React hooks
├── __tests__/            # Test files
└── public/               # Static assets
\`\`\`

## 🔌 API Integration

The app connects to a mock API:
\`\`\`
https://6852821e0594059b23cdd834.mockapi.io/Food
\`\`\`

### Endpoints
- **GET** `/Food` - Fetch all foods
- **GET** `/Food?name={search}` - Search foods
- **POST** `/Food` - Create new food
- **PUT** `/Food/{id}` - Update food
- **DELETE** `/Food/{id}` - Delete food

## 🎯 Key Features Implementation

### Animations
- **Entry Animation**: 300ms slide-up effect on food cards
- **Hover Effect**: 150ms transition with shadow and lift
- **Staggered Loading**: Sequential animation delays for grid items

### Form Validation
- Required field validation
- URL format validation
- Rating range validation (1-5)
- Real-time error display
- Form reset after submission

### Loading States
- Spinner during data fetching
- "Adding Food..." / "Updating Food..." button states
- Disabled inputs during submission

### Empty States
- No items available message
- Failed to load error state
- Helpful guidance text

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Netlify
1. Push code to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`

## 📝 License

MIT

## 👥 Author

Built for A2SV Assessment

---

Made with ♥ by Theamwagon
