
# CognitiveGPT - Socratic AI Learning System

## Overview

CognitiveGPT is a full-stack web application that implements a Socratic tutoring system using AI agents. The application features a React frontend with a modern chat interface and a Node.js/Express backend that orchestrates multiple AI agents to provide personalized educational experiences through questioning, student modeling, feedback, and safety mechanisms.

## Features

### 🤖 Multi-Agent AI System
- **Student Model Agent**: Analyzes responses and updates learning profiles
- **Questioning Agent**: Generates Socratic questions based on student state
- **Feedback Agent**: Evaluates progress and provides guidance
- **Safety Agent**: Ensures appropriate content and interactions

### 💬 Interactive Chat Interface
- Real-time messaging with responsive design
- Dark cyberpunk-themed UI with animations
- Typing indicators and message status tracking
- Mobile-first responsive design

### 👤 Student Profiling System
- Knowledge area tracking with confidence scores (0-1 scale)
- Misconception identification and remediation
- Learning style adaptation
- Progress logging and analytics

### 🔒 Security & Data Management
- Firebase authentication integration
- PostgreSQL database with Drizzle ORM
- Session management with user profile persistence
- Environment-based configuration for security

## Technologies Used

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Shadcn/ui** components with Radix UI primitives
- **Tailwind CSS** with dark cyberpunk theme
- **TanStack Query** for server state management
- **Wouter** for lightweight client-side routing

### Backend
- **Node.js** with Express.js framework
- **TypeScript** with ES modules
- **PostgreSQL** with Drizzle ORM
- **Multi-provider AI integration** (Google Gemini, OpenRouter)
- **Custom LangGraph** implementation for AI workflow orchestration

### AI Services
- **Google Gemini 2.5 Flash** for primary LLM operations
- **Anthropic Claude 3 Sonnet** via OpenRouter for response analysis
- **Fallback mechanisms** for service reliability

### Database & Storage
- **PostgreSQL** via Neon Database
- **Drizzle Kit** for database migrations
- **Firebase Firestore** for real-time features (optional)

## Setup Instructions

### Prerequisites
- Node.js 20 or higher
- PostgreSQL database
- Google Gemini API key
- OpenRouter API key
- Firebase project (optional, for authentication)

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd cognitivegpt
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy the example environment file and configure your variables:
```bash
cp .env.example .env
```

Edit `.env` with your actual values:

#### Required Environment Variables
```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# AI Services
GEMINI_API_KEY=your_gemini_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Server
NODE_ENV=development
PORT=5000
SESSION_SECRET=your_random_session_secret_here
```

#### Optional Environment Variables (for Firebase)
```env
# Firebase Server-side
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}

# Firebase Client-side
VITE_FIREBASE_API_KEY=your_firebase_web_api_key
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### 4. Database Setup
Run database migrations to set up the schema:
```bash
npm run db:push
```

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes

### Production
- `npm run build` - Build the application for production
- `npm run start` - Start production server

## API Keys Setup

### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file as `GEMINI_API_KEY`

### OpenRouter API
1. Visit [OpenRouter](https://openrouter.ai/keys)
2. Create an account and generate an API key
3. Add it to your `.env` file as `OPENROUTER_API_KEY`

### Firebase (Optional)
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore
3. Generate a service account key for server-side operations
4. Get web app configuration for client-side operations
5. Add the configuration to your `.env` file

## Database Configuration

The application uses PostgreSQL with Drizzle ORM. For development, you can use:
- Local PostgreSQL installation
- [Neon Database](https://neon.tech/) (recommended for cloud deployment)
- Any PostgreSQL-compatible service

## Deployment

### Replit Deployment (Recommended)
The application is configured for easy deployment on Replit:

1. Push your code to GitHub
2. Import the repository into Replit
3. Set up environment variables in Replit Secrets
4. The app will automatically deploy using the configuration in `.replit`

### Manual Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Set production environment variables
3. Start the production server:
   ```bash
   npm run start
   ```

## Architecture Overview

### Data Flow
1. **User Input**: Student submits response through chat interface
2. **Session Management**: System retrieves/creates user session and profile
3. **Agent Processing**: LangGraph workflow orchestrates multiple AI agents
4. **Response Generation**: Processed response sent back to frontend
5. **Profile Updates**: Student model updated with new learning data
6. **UI Updates**: Chat interface displays AI response with animations

### Security Features
- Environment variable configuration for sensitive data
- Input validation with Zod schemas
- Safety agent for content moderation
- Session-based user management
- HTTPS-ready production configuration

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

**Note**: This application requires active internet connection for AI services and database connectivity. Ensure all environment variables are properly configured before running the application.
