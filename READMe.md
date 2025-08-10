# CognitiveGPT - Socratic Learning AI

A modern chat application powered by advanced AI agents that help users learn through the Socratic method. Built with React, Express, and integrated AI services.

## Features

- **Socratic AI Agents**: Multiple specialized agents (Questioning, Analytical, etc.) that guide learning through thoughtful questions
- **Modern UI**: Cyberpunk-inspired design with smooth animations and responsive layout
- **Real-time Chat**: Interactive conversation interface with typing indicators
- **Multiple AI Providers**: Support for OpenAI, Anthropic, and Google's Gemini
- **Firebase Integration**: User authentication and session management
- **Persistent Storage**: Chat history and user preferences

## Architecture

### Frontend (React + TypeScript)
- **Vite**: Fast development server and optimized builds
- **TailwindCSS**: Utility-first styling with custom cyberpunk theme
- **React Query**: Efficient data fetching and caching
- **Wouter**: Lightweight client-side routing
- **Radix UI**: Accessible component primitives

### Backend (Express + Node.js)
- **TypeScript**: Full type safety across the application
- **Express**: RESTful API with middleware support
- **Drizzle ORM**: Type-safe database operations
- **Firebase Admin**: Server-side authentication
- **WebSocket**: Real-time communication capabilities

### AI Integration
- **Multiple LLM Providers**: OpenAI GPT, Anthropic Claude, Google Gemini
- **Agent Framework**: Specialized AI agents for different learning approaches
- **Conversation Management**: Context-aware chat sessions

### Database & Storage
- **PostgreSQL**: Primary database for user data and chat history
- **Firebase**: Authentication and real-time features
- **Session Management**: Secure user sessions with connect-pg-simple

## Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret for session management
- `OPENAI_API_KEY`: OpenAI API key (optional)
- `ANTHROPIC_API_KEY`: Anthropic API key (optional)  
- `GOOGLE_AI_API_KEY`: Google Gemini API key (optional)
- `FIREBASE_PROJECT_ID`: Firebase project ID (optional)
- `FIREBASE_SERVICE_ACCOUNT`: Firebase service account JSON (optional)
- `VITE_FIREBASE_API_KEY`: Firebase web API key (optional)
- `VITE_FIREBASE_PROJECT_ID`: Firebase project ID for client (optional)
- `VITE_FIREBASE_APP_ID`: Firebase app ID (optional)

### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Copy environment template: `cp .env.example .env`
4. Set up environment variables in `.env`
5. Run database migrations: `npm run db:push`
6. Start development server: `npm run dev`
7. Access the application at `http://localhost:5000`