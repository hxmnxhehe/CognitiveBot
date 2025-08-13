import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";
import { setupVite, serveStatic, log } from "./vite.js";
import { createServer } from "http";

const app = express();
const PORT = process.env.PORT || 5000;

// Production optimizations
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: false, limit: '10mb' }));
} else {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
}

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

// Initialize the app
async function initializeApp() {
  // Register API routes
  try {
    await registerRoutes(app);
    log("Routes registered successfully");
  } catch (error) {
    log(`Failed to register routes: ${error}`, "error");
  }

  // Setup development server or serve static files
  if (process.env.NODE_ENV === "production") {
    // Serve static files in production
    try {
      serveStatic(app);
    } catch (error) {
      log(`Static serving failed: ${error}`, "error");
    }
  } else {
    // Setup Vite dev server
    try {
      const server = createServer(app);
      await setupVite(app, server);
    } catch (error) {
      log(`Vite setup failed: ${error}`, "error");
    }
  }

  // Error handling
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Log the error for debugging
    log(`Error ${status}: ${message}`, "error");
    if (err.stack) {
      log(err.stack, "error");
    }

    res.status(status).json({ message });
  });

  // 404 handler for unmatched routes
  app.use("*", (req, res) => {
    log(`404: ${req.method} ${req.originalUrl}`, "404");
    res.status(404).json({ 
      message: "Not Found",
      path: req.originalUrl 
    });
  });
}

// Initialize and start server
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  initializeApp().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      log(`Server running on http://0.0.0.0:${PORT}`);
    });
  }).catch(error => {
    log(`Failed to initialize app: ${error}`, "error");
    process.exit(1);
  });
} else {
  // For Vercel, initialize immediately
  initializeApp().catch(error => {
    log(`Failed to initialize app: ${error}`, "error");
  });
}

export default app;