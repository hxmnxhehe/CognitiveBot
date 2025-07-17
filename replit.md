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
- **AI Integration**: Multi-provider setup (Google Gemini, Anthropic Claude)
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
- **Anthropic Claude**: Secondary LLM for student response analysis
- **Configuration**: Environment-based API key management

### Database
- **PostgreSQL**: Primary data store via Neon Database
- **Drizzle Kit**: Database migration and schema management
- **Connection**: Environment-based DATABASE_URL configuration

### Third-Party Services
- **Firebase**: Planned integration for authentication and real-time features
- **Replit**: Development environment with hot reload capabilities

### UI Dependencies
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **React Hook Form**: Form validation and management

## Deployment Strategy

### Development
- **Local Development**: Vite dev server with hot module replacement
- **Backend**: tsx for TypeScript execution with nodemon-like behavior
- **Database**: Drizzle Kit for schema synchronization
- **Environment**: .env file management for API keys and configuration

### Production Build
- **Frontend**: Vite build process generating optimized static assets
- **Backend**: esbuild compilation to Node.js compatible JavaScript
- **Database**: Automated migrations via Drizzle Kit
- **Deployment**: Express server serving both API and static assets

### Environment Configuration
- **API Keys**: Gemini and Anthropic API keys for AI services
- **Database**: PostgreSQL connection string
- **Firebase**: Service account credentials for authentication
- **Runtime**: NODE_ENV for environment-specific behavior

The application is designed to be deployed on platforms like Replit, with support for both development and production environments through environment variable configuration.