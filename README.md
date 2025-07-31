# FSE Frontend - Financial Services Exchange

A comprehensive React-based frontend application for financial services management, featuring role-based access control for Investors, Fund Managers, and AMC (Asset Management Companies).

##  Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Configuration Files](#configuration-files)
- [API Structure](#api-structure)
- [State Management](#state-management)
- [Routing](#routing)
- [Components](#components)
- [Pages](#pages)
- [Development Scripts](#development-scripts)
- [Code Quality](#code-quality)
- [Build & Deployment](#build--deployment)

##  Project Overview

FSE Frontend is a modern React application built with Vite that provides a comprehensive financial services platform. The application supports three main user roles:

- **Investors**: Portfolio management, fund viewing, and investment tracking
- **Fund Managers**: Strategy creation, backtesting, and fund management
- **AMC (Asset Management Companies)**: Overview and management of multiple funds

##  Features

### Core Features
-  **Role-based Authentication**: Secure login/logout with role-specific access
-  **Dashboard Analytics**: Real-time portfolio tracking and performance metrics
-  **Fund Management**: Create, edit, and manage mutual funds
-  **Strategy Backtesting**: Test investment strategies with historical data
-  **Portfolio Overview**: Comprehensive investment portfolio management
-  **Real-time Updates**: Live data updates and notifications
-  **Responsive Design**: Mobile-first approach with Tailwind CSS

### User Role Features

#### Investor Features
- Portfolio dashboard with investment overview
- Fund comparison and analysis tools
- Transaction history and performance tracking
- Account management and profile settings

#### Fund Manager Features
- Strategy creation and management
- Backtesting tools for investment strategies
- Fund performance analytics
- Candle data import and analysis

#### AMC Features
- Multi-fund overview and management
- Performance comparison across funds
- Manager portfolio summaries
- Fund action management

##  Technology Stack

### Core Technologies
- **React 19.1.0**: Modern React with latest features
- **Vite 7.0.0**: Fast build tool and development server
- **React Router DOM 7.6.3**: Client-side routing
- **Redux Toolkit 2.8.2**: State management
- **React Redux 9.2.0**: React-Redux integration

### UI & Styling
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **Framer Motion 12.19.2**: Animation library
- **React Icons 5.5.0**: Icon library
- **Headless UI 2.2.4**: Unstyled, accessible UI components

### Charts & Visualization
- **ApexCharts 4.7.0**: Interactive charts
- **React ApexCharts 1.7.0**: React wrapper for ApexCharts
- **Recharts 3.0.2**: Composable charting library

### Development Tools
- **ESLint 9.29.0**: Code linting
- **PostCSS 8.5.6**: CSS processing
- **Autoprefixer 10.4.21**: CSS vendor prefixing

### Code Editor
- **CodeMirror**: JavaScript code editing with syntax highlighting
- **@codemirror/lang-javascript 6.2.4**: JavaScript language support
- **@uiw/react-codemirror 4.24.0**: React wrapper for CodeMirror

### Utilities
- **Axios 1.10.0**: HTTP client for API calls
- **React Hot Toast 2.5.2**: Toast notifications

##  Project Structure

```
FSE Frontend/
├──  src/                          # Source code
│   ├──  api/                      # API integration layer
│   │   ├── api.js                   # Base API configuration
│   │   ├── authApi.js               # Authentication API
│   │   ├── candleImportApi.js       # Candle data import API
│   │   ├── fundManagerApi.js        # Fund manager API
│   │   ├── investorApi.js           # Investor API
│   │   ├── strategiesApi.js         # Strategies API
│   │   └── viewfundApi.js           # Fund viewing API
│   ├──  app/                      # Redux store configuration
│   │   └── store.js                 # Redux store setup
│   ├──  components/               # Reusable UI components
│   │   ├──  charts/               # Chart components
│   │   │   └── InvestmentChart.jsx
│   │   ├──  Dashboard/            # Dashboard components
│   │   │   ├── AllFundManagers.jsx
│   │   │   ├── AllMutualFunds.jsx
│   │   │   ├── AmcOverview.jsx
│   │   │   ├── Backtest.jsx
│   │   │   ├── BacktestForm.jsx
│   │   │   ├── Compare.jsx
│   │   │   ├── ImportCandleData.jsx
│   │   │   ├── InvestmentPieChart.jsx
│   │   │   ├── ManagerInvest.jsx
│   │   │   ├── ManagerPoertfolioSum.jsx
│   │   │   ├── MutualFundPopup.jsx
│   │   │   ├── NotificationDropdown.jsx
│   │   │   ├── Overview.jsx
│   │   │   ├── ProfileDropdown.jsx
│   │   │   ├── Strategies.jsx
│   │   │   ├── StrategiesForm.jsx
│   │   │   ├── StrategyCompareTable.jsx
│   │   │   └── StrategyDocsModal.jsx
│   │   ├──  footer/               # Footer components
│   │   │   └── Footer.jsx
│   │   ├──  Forms/                # Form components
│   │   │   ├── CreateMutualFund.jsx
│   │   │   └── EditMutualFUnd.jsx
│   │   ├──  FundDetails/          # Fund detail components
│   │   │   ├── FundActionBar.jsx
│   │   │   ├── FundActionModal.jsx
│   │   │   ├── FundExtraDetails.jsx
│   │   │   ├── FundGraph.jsx
│   │   │   ├── FundOverviewCard.jsx
│   │   │   └── FundTransactionTable.jsx
│   │   ├──  FundManager/          # Fund manager components
│   │   │   └── FundCompanyActionModal.jsx
│   │   ├──  Header/               # Header components
│   │   │   ├── Header.jsx
│   │   │   ├── logo.css
│   │   │   └── logo.jsx
│   │   ├──  Investor/             # Investor components
│   │   │   ├── Inv-Dash-AllScheme.jsx
│   │   │   ├── Inv-Dash-AllTxn.jsx
│   │   │   └── Inv-Dash-portfolio.jsx
│   │   └──  layouts/              # Layout components
│   │       ├── HeaderFooterLayout.jsx
│   │       └── StrategyResultModal.jsx
│   ├──  features/                 # Redux slices (state management)
│   │   ├──  auth/                 # Authentication state
│   │   │   └── authSlice.js
│   │   ├──  backtest/             # Backtesting state
│   │   │   └── backtestSlice.js
│   │   ├──  candleData/           # Candle data state
│   │   │   └── candleDataSlice.js
│   │   ├──  compare/              # Comparison state
│   │   │   └── compareSlice.js
│   │   ├──  fundManager/          # Fund manager state
│   │   │   └── fundManagerSlice.js
│   │   ├──  investment/           # Investment state
│   │   │   └── investmentSlice.js
│   │   ├──  overview/             # Overview state
│   │   │   └── overviewSlice.js
│   │   ├──  results/              # Results state
│   │   │   └── resultsSlice.js
│   │   ├──  strategies/           # Strategies state
│   │   │   └── strategiesSlice.js
│   │   └── counterSlice.js          # Example counter slice
│   ├──  pages/                    # Page components
│   │   ├──  amc/                  # AMC pages
│   │   │   └── AmcDashboard.jsx
│   │   ├──  auth/                 # Authentication pages
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── UserRedirect.jsx
│   │   ├──  fundDetail/           # Fund detail pages
│   │   │   └── FundDetails.jsx
│   │   ├──  fundManager/          # Fund manager pages
│   │   │   ├── BacktestYourScript.jsx
│   │   │   └── FundManagerDashboard.jsx
│   │   ├──  investor/             # Investor pages
│   │   │   ├── HomeBody.css
│   │   │   ├── HomeBody.jsx
│   │   │   ├── InvestorAccount.css
│   │   │   ├── InvestorAccount.jsx
│   │   │   ├── InvestorHome.jsx
│   │   │   ├── InvestorProfile.jsx
│   │   │   ├── NavBar.css
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.css
│   │   │   └── Sidebar.jsx
│   │   └──  register/             # Registration pages
│   │       ├── AmcProfile.jsx
│   │       └── ManagerProfile.jsx
│   ├──  utils/                    # Utility functions
│   │   ├── auth.js                  # Authentication utilities
│   │   ├── PrivateRoute.jsx         # Protected route component
│   │   └── PublicRoute.jsx          # Public route component
│   ├── App.css                      # Global styles
│   ├── App.jsx                      # Main app component
│   ├── index.css                    # Base styles
│   └── main.jsx                     # Application entry point
├──  public/                       # Public assets
│   ├──  assets/                   # Additional assets
│   │   ├── bgImage.jpg              # Background image
│   │   └── react.svg                # React logo
│   ├── bgImage.jpg                  # Background image
│   ├── bgImage.png                  # Background image (PNG)
│   ├── etienne-martin-2_K82gx9Uk8-unsplash.jpg  # Stock photo
│   ├── favicon.ico                  # Favicon
│   ├── logo.png                     # Logo (PNG)
│   ├── logo-white.svg               # Logo (white SVG)
│   └── vite.svg                     # Vite logo
├── Configuration Files
│   ├── eslint.config.js             # ESLint configuration
│   ├── index.html                   # HTML template
│   ├── package.json                 # Project dependencies
│   ├── postcss.config.js            # PostCSS configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   └── vite.config.js               # Vite configuration
├──  Documentation
│   ├── README.md                    # This file
│   └── _Local-Dependency.txt        # Local dependency notes
└── Other Files
    ├── .gitignore                   # Git ignore rules
    └── package-lock.json            # Dependency lock file
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "FSE Frontend"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install additional local dependencies** (as mentioned in `_Local-Dependency.txt`)
   ```bash
   npm install react react-dom
   npm install react-router react-router-dom
   npm install react-icons
   npm install framer-motion
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173` (or the URL shown in terminal)

## Configuration Files

### Vite Configuration (`vite.config.js`)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### Tailwind CSS Configuration (`tailwind.config.js`)
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        base: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### PostCSS Configuration (`postcss.config.js`)
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### ESLint Configuration (`eslint.config.js`)
```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
```

## API Structure

The application uses a modular API structure with separate files for different domains:

### API Files
- **`api.js`**: Base API configuration and common utilities
- **`authApi.js`**: Authentication endpoints (login, register, logout)
- **`candleImportApi.js`**: Candle data import functionality
- **`fundManagerApi.js`**: Fund manager specific operations
- **`investorApi.js`**: Investor dashboard and portfolio operations
- **`strategiesApi.js`**: Strategy management and backtesting
- **`viewfundApi.js`**: Fund viewing and details

### API Integration Pattern
```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## State Management

The application uses Redux Toolkit for state management with the following slices:

### Redux Store Structure
```javascript
// src/app/store.js
export const store = configureStore({
  reducer: {
    auth: authReducer,           // Authentication state
    fundManager: fundManagerReducer,  // Fund manager operations
    overview: overviewReducer,   // Overview data
    strategies: strategiesReducer, // Strategy management
    compare: compareReducer,     // Comparison functionality
    results: resultsReducer,     // Results and analytics
    candleData: candleDataReducer, // Candle data management
    backtest: backtestReducer,   // Backtesting operations
    investment: investmentReducer, // Investment tracking
  },
});
```

### State Slices
- **`authSlice.js`**: User authentication and session management
- **`fundManagerSlice.js`**: Fund manager specific state
- **`overviewSlice.js`**: Dashboard overview data
- **`strategiesSlice.js`**: Strategy creation and management
- **`compareSlice.js`**: Comparison functionality
- **`resultsSlice.js`**: Results and analytics data
- **`candleDataSlice.js`**: Candle data management
- **`backtestSlice.js`**: Backtesting operations
- **`investmentSlice.js`**: Investment tracking and portfolio

## Routing

The application uses React Router DOM v7 with a hierarchical routing structure:

### Route Structure
```javascript
const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  
  // Public Routes
  { path: "/login", element: <PublicRoute><Login /></PublicRoute> },
  { path: "/register", element: <PublicRoute><Register /></PublicRoute> },
  { path: "/forgot-password", element: <PublicRoute><ForgotPassword /></PublicRoute> },
  { path: "/user/redirect", element: <UserRedirect /> },
  
  // Protected Routes
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <HeaderFooterLayout />,
        children: [
          { path: "/dashboard/fund-manager", element: <FundManagerDashboard /> },
          { path: "/dashboard/investor", element: <InvestorHome /> },
          { path: "/dashboard/my-account", element: <MyAccount /> },
          { path: "/dashboard/amc", element: <AmcDashboard /> },
          { path: "/view/fund/:id", element: <FundDetails /> },
          { path: "/investor/register", element: <CompleteProfile /> },
          { path: "/amc/register", element: <CompleteAmcProfile /> },
          { path: "/manager/register", element: <CompleteManagerProfile /> },
        ],
      },
    ],
  },
]);
```

### Route Guards
- **`PrivateRoute.jsx`**: Protects routes requiring authentication
- **`PublicRoute.jsx`**: Redirects authenticated users away from public routes

## Components

### Component Categories

#### Dashboard Components
- **AllFundManagers.jsx**: Display all fund managers
- **AllMutualFunds.jsx**: List all mutual funds
- **AmcOverview.jsx**: AMC overview dashboard
- **Backtest.jsx**: Backtesting interface
- **BacktestForm.jsx**: Backtesting form
- **Compare.jsx**: Comparison tools
- **ImportCandleData.jsx**: Candle data import
- **InvestmentPieChart.jsx**: Investment pie chart
- **ManagerInvest.jsx**: Manager investment view
- **ManagerPoertfolioSum.jsx**: Manager portfolio summary
- **MutualFundPopup.jsx**: Mutual fund popup modal
- **NotificationDropdown.jsx**: Notification dropdown
- **Overview.jsx**: Overview dashboard
- **ProfileDropdown.jsx**: Profile dropdown menu
- **Strategies.jsx**: Strategy management
- **StrategiesForm.jsx**: Strategy creation form
- **StrategyCompareTable.jsx**: Strategy comparison table
- **StrategyDocsModal.jsx**: Strategy documentation modal

#### Layout Components
- **HeaderFooterLayout.jsx**: Main layout with header and footer
- **StrategyResultModal.jsx**: Strategy result modal

#### Form Components
- **CreateMutualFund.jsx**: Create mutual fund form
- **EditMutualFUnd.jsx**: Edit mutual fund form

#### Fund Detail Components
- **FundActionBar.jsx**: Fund action toolbar
- **FundActionModal.jsx**: Fund action modal
- **FundExtraDetails.jsx**: Additional fund details
- **FundGraph.jsx**: Fund performance graph
- **FundOverviewCard.jsx**: Fund overview card
- **FundTransactionTable.jsx**: Fund transaction table

#### Header Components
- **Header.jsx**: Main navigation header
- **logo.css**: Logo styling
- **logo.jsx**: Logo component

#### Investor Components
- **Inv-Dash-AllScheme.jsx**: All schemes view
- **Inv-Dash-AllTxn.jsx**: All transactions view
- **Inv-Dash-portfolio.jsx**: Portfolio view

#### Chart Components
- **InvestmentChart.jsx**: Investment chart component

##  Pages

### Authentication Pages
- **Login.jsx**: User login page
- **Register.jsx**: User registration page
- **ForgotPassword.jsx**: Password recovery page
- **UserRedirect.jsx**: User role-based redirect

### Dashboard Pages
- **FundManagerDashboard.jsx**: Fund manager main dashboard
- **InvestorHome.jsx**: Investor home page
- **InvestorAccount.jsx**: Investor account page
- **AmcDashboard.jsx**: AMC dashboard

### Detail Pages
- **FundDetails.jsx**: Individual fund details page

### Registration Pages
- **AmcProfile.jsx**: AMC profile completion
- **ManagerProfile.jsx**: Manager profile completion
- **InvestorProfile.jsx**: Investor profile completion

### Investor Pages
- **HomeBody.jsx**: Investor home body
- **Navbar.jsx**: Investor navigation
- **Sidebar.jsx**: Investor sidebar



### Usage
```bash
# Development
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```


## Build & Deployment

### Build Process
1. **Development**: `npm run dev` - Starts Vite dev server
2. **Production Build**: `npm run build` - Creates optimized build
3. **Preview**: `npm run preview` - Serves production build locally

### Build Output
- **Location**: `dist/` directory
- **Optimization**: Minified and optimized for production
- **Assets**: Optimized images and static files

### Deployment Considerations
- **Environment Variables**: Configure API endpoints
- **Static Hosting**: Compatible with Vercel, Netlify, etc.
- **CDN**: Static assets can be served via CDN

##  Environment Setup

### Required Environment Variables
```bash
# API Configuration
REACT_APP_API_URL=http://localhost:3000/api

# Authentication
REACT_APP_AUTH_ENDPOINT=/auth

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=true
```

### Development Environment
- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **Browser**: Modern browser with ES6+ support

##  Local Dependencies

As mentioned in `_Local-Dependency.txt`, after cloning the project, ensure these dependencies are installed:

```bash
npm install react react-dom
npm install react-router react-router-dom
npm install react-icons
npm install framer-motion
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Test your changes
6. Submit a pull request

