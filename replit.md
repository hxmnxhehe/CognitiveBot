
# CognitiveGPT - Socratic AI Learning System

## Overview

CognitiveGPT is a full-stack web application that implements a Socratic tutoring system using AI agents. The application features a React frontend with a modern chat interface and a Node.js/Express backend that orchestrates multiple AI agents to provide personalized educational experiences. The system uses a multi-agent architecture powered by LangGraph to deliver intelligent, adaptive tutoring through questioning, student modeling, feedback, and safety mechanisms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with a dark cyberpunk theme
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: Multi-provider setup (Google Gemini, OpenRouter)
- **Agent System**: Custom LangGraph implementation for AI workflow orchestration
- **Session Management**: In-memory storage with planned Firebase integration

### Multi-Agent System
The core of the application is a sophisticated multi-agent system that processes student interactions:

1. **Student Model Agent**: Analyzes student responses and updates learning profiles
2. **Questioning Agent**: Generates Socratic questions based on student state
3. **Feedback Agent**: Evaluates student progress and provides guidance
4. **Safety Agent**: Ensures appropriate content and interactions

## Key Components

### Chat Interface
- Real-time messaging with WebSocket-like experience
- Responsive design with mobile-first approach
- Animated UI elements with cyberpunk aesthetic
- Typing indicators and message status tracking

### Student Profiling System
- Knowledge area tracking with confidence scores (0-1 scale)
- Misconception identification and remediation
- Learning style adaptation
- Progress logging and analytics

### AI Service Layer
- Abstracted LLM service supporting multiple providers
- Fallback mechanisms for service reliability
- Structured prompting for consistent agent behavior
- Response validation and error handling

### Data Storage
- Drizzle ORM for type-safe database operations
- Schema-first approach with Zod validation
- Session management with user profile persistence
- Migration system for database schema evolution

## Data Flow

1. **User Input**: Student submits a response through the chat interface
2. **Session Management**: System retrieves or creates user session and profile
3. **Agent Processing**: LangGraph workflow orchestrates multiple AI agents:
   - Student Model Agent analyzes the response
   - Feedback Agent evaluates understanding
   - Safety Agent ensures appropriate content
   - Questioning Agent generates next Socratic question
4. **Response Generation**: Processed response is sent back to the frontend
5. **Profile Updates**: Student model is updated with new learning data
6. **UI Updates**: Chat interface displays AI response with appropriate animations

## External Dependencies

### AI Services
- **Google Gemini**: Primary LLM for question generation and analysis
- **OpenRouter**: Secondary LLM service for response analysis
- **Configuration**: Environment-based API key management

### Database
- **PostgreSQL**: Primary data store via Neon Database
- **Drizzle Kit**: Database migration and schema management
- **Connection**: Environment-based DATABASE_URL configuration

### Third-Party Services
- **Firebase**: Planned integration for authentication and real-time features

### UI Dependencies
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **React Hook Form**: Form validation and management

## Development

### Local Development
- **Frontend**: Vite dev server with hot module replacement
- **Backend**: tsx for TypeScript execution with nodemon-like behavior
- **Database**: Drizzle Kit for schema synchronization
- **Environment**: .env file management for API keys and configuration

### Production Build
- **Frontend**: Vite build process generating optimized static assets
- **Backend**: esbuild compilation to Node.js compatible JavaScript
- **Database**: Automated migrations via Drizzle Kit
- **Deployment**: Express server serving both API and static assets

### Environment Configuration
- **API Keys**: Gemini and OpenRouter API keys for AI services
- **Database**: PostgreSQL connection string
- **Firebase**: Service account credentials for authentication
- **Runtime**: NODE_ENV for environment-specific behavior

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env`
4. Run database migrations: `npm run db:push`
5. Start development server: `npm run dev`
6. Access the application at `http://localhost:5000`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=your_postgresql_connection_string
GEMINI_API_KEY=your_gemini_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
NODE_ENV=development
PORT=5000
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes
