# Earthquake Monitoring Dashboard

A modern React-based web application for monitoring and visualizing earthquake data with interactive maps and detailed analytics.

## 🚀 Features

### Core Functionality
- **Interactive Map Visualization**: Real-time earthquake data displayed on Leaflet maps
- **Authentication System**: Secure login/logout with JWT token management
- **Earthquake Details**: Detailed view of individual earthquake information
- **Search & Filtering**: Date-based filtering for earthquake data
- **Pagination**: Navigate through large datasets with pagination controls
- **Responsive Design**: Mobile-friendly interface with adaptive layouts

### Technical Features
- **TypeScript**: Full type safety and better development experience
- **Modern React**: Built with React 19 and latest hooks
- **SCSS Styling**: Modular CSS with SCSS preprocessing
- **API Integration**: RESTful API communication with automatic token refresh
- **Protected Routes**: Authentication-based route protection
- **State Management**: Context API for global state management

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Vite 7.0.4** - Fast build tool and dev server
- **React Router DOM 7.7.1** - Client-side routing
- **Leaflet 1.9.4** - Interactive maps
- **Axios 1.11.0** - HTTP client with interceptors
- **SCSS 1.89.2** - CSS preprocessing

### Development Tools
- **ESLint 9.30.1** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **React Hooks ESLint Plugin** - React hooks linting

## 📁 Project Structure

```
src/
├── api/
│   └── axiosInstance.ts          # HTTP client with auth interceptors
├── components/
│   ├── Map.tsx                   # Interactive earthquake map component
│   └── ProtectedRoute.tsx        # Authentication route wrapper
├── contexts/
│   └── AuthContext.tsx           # Global authentication state
├── Pages/
│   ├── DashboardPage.tsx         # Main dashboard with map
│   ├── LoginPage.tsx             # Authentication page
│   └── QuakeDetailsPage.tsx      # Individual earthquake details
├── scss/                         # SCSS source files
├── styles/                       # Compiled CSS files
└── main.tsx                      # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash

   git clone <repository-url>
   cd Ubiwhere
   ```

2. **Install dependencies**

   ```bash

   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env

   VITE_BACKEND_URL=http://localhost:3000
   ```

4. **Start the development server**

   ```bash

   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build

## 🔐 Authentication

The application uses JWT-based authentication with automatic token refresh:

- **Login**: Users authenticate with credentials
- **Token Storage**: Access and refresh tokens stored in localStorage
- **Auto Refresh**: Automatic token refresh on 401 responses
- **Protected Routes**: Authentication required for dashboard and details pages
- **Logout**: Clears tokens and redirects to login

## 🗺️ Map Features

### Interactive Map Component

- **Leaflet Integration**: OpenStreetMap tiles with custom markers
- **Earthquake Markers**: Clickable markers showing earthquake locations
- **Tooltips**: Location information on marker hover
- **Navigation**: Click markers to view detailed earthquake information
- **Responsive**: Adapts to different screen sizes

### Map Configuration

- **Default View**: Centered on Portugal (40.64427, -8.64554)
- **Zoom Level**: 13 (city level)
- **Tile Provider**: OpenStreetMap
- **Custom Styling**: Rounded corners and responsive design

## 📊 Data Management

### API Integration

- **RESTful API**: Standard HTTP methods for data operations
- **Error Handling**: Comprehensive error handling with user feedback
- **Loading States**: Loading indicators for better UX
- **Pagination**: Server-side pagination for large datasets

### Earthquake Data

- **Location**: Geographic coordinates (latitude/longitude)
- **Magnitude**: Earthquake strength measurement
- **Depth**: Distance from surface to earthquake focus
- **Timestamp**: Date and time of occurrence
- **ID**: Unique identifier for each earthquake

## 🎨 Styling

### Design System

- **SCSS Modules**: Component-scoped styling
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional interface
- **Color Scheme**: Blue-based theme with proper contrast

### Layout Components

- **Dashboard**: Full-width layout with centered content
- **Map Container**: Flexible width with responsive design
- **Details Page**: 75% width layout with side-by-side content
- **Forms**: Styled inputs and buttons with hover effects

## 🔧 Configuration

### Environment Variables

- `VITE_BACKEND_URL`: Backend API base URL (default: http://localhost:3000)

### Build Configuration  

- **Vite**: Fast development and optimized production builds
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency rules
- **SCSS**: CSS preprocessing with variables and mixins
