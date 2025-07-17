
# Environment Setup Guide

This guide provides detailed instructions for setting up environment variables for the CognitiveGPT application.

## Required Environment Variables

### 1. Database Configuration

#### DATABASE_URL
Your PostgreSQL database connection string.

**Format:**
```
DATABASE_URL=postgresql://username:password@host:port/database
```

**Example:**
```
DATABASE_URL=postgresql://user:pass@localhost:5432/cognitivegpt
```

**For Neon Database:**
```
DATABASE_URL=postgresql://username:password@ep-xyz.us-east-1.aws.neon.tech/cognitivegpt?sslmode=require
```

### 2. AI Service API Keys

#### GEMINI_API_KEY
Google Gemini API key for primary AI operations.

**How to get:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

**Format:**
```
GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### OPENROUTER_API_KEY
OpenRouter API key for secondary AI operations and fallback.

**How to get:**
1. Visit [OpenRouter](https://openrouter.ai/keys)
2. Create an account
3. Generate a new API key
4. Copy the key

**Format:**
```
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. Server Configuration

#### NODE_ENV
Application environment mode.

**Values:**
- `development` - For local development
- `production` - For production deployment

```
NODE_ENV=development
```

#### PORT
Port number for the server to listen on.

```
PORT=5000
```

#### SESSION_SECRET
Secret key for session management. Generate a random string for security.

**Generate a secure secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

```
SESSION_SECRET=your_random_32_character_hex_string_here
```

## Optional Environment Variables (Firebase)

### Server-side Firebase Configuration

#### FIREBASE_PROJECT_ID
Your Firebase project ID.

```
FIREBASE_PROJECT_ID=your-project-id
```

#### FIREBASE_SERVICE_ACCOUNT
Firebase service account JSON as a string (for server-side operations).

**How to get:**
1. Go to Firebase Console → Project Settings → Service Accounts
2. Generate new private key
3. Download the JSON file
4. Convert to single line string (escape quotes)

```
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"...","private_key":"..."}
```

### Client-side Firebase Configuration

#### VITE_FIREBASE_API_KEY
Firebase web API key for client-side operations.

**How to get:**
1. Firebase Console → Project Settings → General
2. Scroll to "Your apps" section
3. Click on web app or add new web app
4. Copy the API key from config

```
VITE_FIREBASE_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### VITE_FIREBASE_PROJECT_ID
Same as FIREBASE_PROJECT_ID but for client-side.

```
VITE_FIREBASE_PROJECT_ID=your-project-id
```

#### VITE_FIREBASE_APP_ID
Firebase app ID for client-side.

```
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## Environment File Setup

### 1. Copy the Example File
```bash
cp .env.example .env
```

### 2. Edit the .env File
Open `.env` in your text editor and replace the placeholder values with your actual configuration.

### 3. Verify Setup
Run the application and check the console for any environment variable warnings:

```bash
npm run dev
```

## Security Notes

1. **Never commit `.env` files** to version control
2. **Use different secrets** for development and production
3. **Regularly rotate API keys** and secrets
4. **Use environment variable management** tools in production (like Replit Secrets)

## Troubleshooting

### Common Issues

#### "DATABASE_URL is required but not found"
- Ensure `.env` file exists in the root directory
- Check that `DATABASE_URL` is spelled correctly
- Verify the database connection string format

#### "GEMINI_API_KEY not found"
- Check that the API key is valid
- Ensure no extra spaces in the `.env` file
- Verify the API key has proper permissions

#### "Firebase Admin SDK not configured"
- This is a warning, not an error
- The app will work without Firebase using in-memory storage
- Add Firebase configuration if you need persistent storage

### Testing Environment Variables

Create a simple test script to verify your environment variables are loaded:

```javascript
// test-env.js
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Set' : 'Not set');
console.log('OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY ? 'Set' : 'Not set');
```

Run with:
```bash
node -r dotenv/config test-env.js
```