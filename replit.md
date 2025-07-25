# Body Type Analysis App

## Overview

This is a full-stack web application that provides AI-powered body type analysis through an interactive quiz and photo upload system. The app is built with a React frontend using modern UI components, an Express.js backend, and PostgreSQL database with Drizzle ORM. It features a Korean beauty-focused design theme and provides personalized styling recommendations based on body type analysis.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom Korean beauty app color scheme
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Style**: RESTful endpoints
- **File Upload**: Multer middleware for handling image uploads
- **Development**: Hot reload with Vite middleware integration

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with TypeScript
- **Schema**: Shared schema definitions between client and server
- **Migrations**: Drizzle Kit for database migrations

## Key Components

### Frontend Components
1. **Gender Selection**: Initial step for selecting male/female gender
2. **Quiz Section**: Multi-step questionnaire with progress tracking
3. **Photo Upload**: Image upload component with file validation
4. **Results Display**: Comprehensive body type analysis results with styling recommendations

### Backend Services
1. **Storage Layer**: In-memory storage implementation with interface for future database integration
2. **Analysis Engine**: Body type classification based on quiz responses
3. **File Handling**: Image upload processing with size and type validation
4. **API Routes**: RESTful endpoints for body type analysis

### Database Schema
1. **Users Table**: User authentication and profile data
2. **Body Type Results Table**: Analysis results with JSON fields for answers, photos, and results

## Data Flow

1. **User Journey**: Gender selection → Quiz completion → Photo upload → Analysis → Results
2. **Data Processing**: Quiz answers and photos are processed server-side to generate body type classification
3. **Result Storage**: Analysis results are stored in database with unique IDs for retrieval
4. **Styling Recommendations**: Based on body type, the app provides clothing and accessory suggestions

## External Dependencies

### Frontend Dependencies
- **UI Components**: Extensive Radix UI component library
- **Styling**: Tailwind CSS with PostCSS
- **State Management**: TanStack Query for API state
- **Date Handling**: date-fns library
- **Icons**: Lucide React icons

### Backend Dependencies
- **Database**: Neon serverless PostgreSQL
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **File Upload**: Multer for multipart form handling
- **Session Management**: PostgreSQL session store

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Full type safety across frontend and backend
- **Development**: Replit-specific plugins for enhanced development experience

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds optimized React application to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command

### Environment Setup
- **Development**: Uses Vite dev server with Express backend proxy
- **Production**: Serves static files from Express with API routes
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### File Structure
- **Client**: React app in `client/` directory
- **Server**: Express API in `server/` directory  
- **Shared**: Common TypeScript definitions in `shared/` directory
- **Database**: Schema and migrations managed by Drizzle

The application follows a monorepo structure with clear separation between client, server, and shared code, making it maintainable and scalable for future enhancements.