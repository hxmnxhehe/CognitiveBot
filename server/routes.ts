import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { firebaseService } from "./services/firebase";
import { langGraphWorkflow } from "./services/langgraph";
import { sendMessageSchema, chatResponseSchema, AgentState } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Firebase
  await firebaseService.initialize();

  // Health check endpoint for deployment monitoring
  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });
  });

  // Start new chat session
  app.post("/api/chat/session", async (req, res) => {
    try {
      const userId = req.headers['x-user-id'] as string || `user_${Date.now()}`;
      const session = await storage.createSession(userId);

      res.json({
        session_id: session.id,
        user_id: session.user_id,
        created_at: session.created_at
      });
    } catch (error) {
      console.error('Error creating session:', error);
      res.status(500).json({ error: "Failed to create session" });
    }
  });

  // Send message endpoint
  app.post("/api/chat/message", async (req, res) => {
    try {
      const { message, session_id } = sendMessageSchema.parse(req.body);
      const userId = req.headers['x-user-id'] as string || `user_${Date.now()}`;

      // Get or create session
      let session = session_id ? await storage.getSession(session_id) : null;
      if (!session) {
        session = await storage.createSession(userId);
      }

      // Add user message to session
      const userMessage = await storage.addMessage(session.id, {
        content: message,
        role: 'user',
        timestamp: new Date(),
        agent_type: null,
        session_id: session.id,
      });

      // Prepare agent state
      const chatHistory = await storage.getMessages(session.id);
      const studentProfile = await storage.getStudentProfile(userId);

      const agentState: AgentState = {
        user_id: userId,
        session_id: session.id,
        current_message: message,
        chat_history: chatHistory,
        student_profile: studentProfile,
        current_question: '',
        student_response: message,
        feedback: '',
        safety_check_result: 'CLEAN',
        next_action: '',
      };

      // Execute LangGraph workflow
      const finalState = await langGraphWorkflow.executeWorkflow(agentState);

      // Add bot response to session
      const botMessage = await storage.addMessage(session.id, {
        content: finalState.current_question,
        role: 'assistant',
        timestamp: new Date(),
        agent_type: 'questioning',
        session_id: session.id,
      });

      // Update session with new student profile
      await storage.updateSession(session.id, {
        student_profile: finalState.student_profile
      });

      // Save to Firebase
      await firebaseService.saveStudentProfile(userId, finalState.student_profile);
      await firebaseService.saveSession(session.id, {
        ...session,
        student_profile: finalState.student_profile,
        updated_at: new Date()
      });

      const response = chatResponseSchema.parse({
        session_id: session.id,
        response: finalState.current_question,
        student_profile_summary: finalState.student_profile,
        agent_status: langGraphWorkflow.getAgentStatus(finalState),
      });

      res.json(response);
    } catch (error) {
      console.error('Error processing message:', error);

      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request format", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to process message" });
      }
    }
  });

  // Get session history
  app.get("/api/chat/session/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = await storage.getSession(sessionId);

      if (!session) {
        res.status(404).json({ error: "Session not found" });
        return;
      }

      res.json(session);
    } catch (error) {
      console.error('Error getting session:', error);
      res.status(500).json({ error: "Failed to get session" });
    }
  });

  // Get user sessions
  app.get("/api/chat/sessions", async (req, res) => {
    try {
      const userId = req.headers['x-user-id'] as string;
      if (!userId) {
        res.status(400).json({ error: "User ID required" });
        return;
      }

      const sessions = await storage.getSessionsByUser(userId);
      res.json(sessions);
    } catch (error) {
      console.error('Error getting sessions:', error);
      res.status(500).json({ error: "Failed to get sessions" });
    }
  });

  // Get student profile
  app.get("/api/student-profile", async (req, res) => {
    try {
      const userId = req.headers['x-user-id'] as string;
      if (!userId) {
        res.status(400).json({ error: "User ID required" });
        return;
      }

      const profile = await storage.getStudentProfile(userId);
      res.json(profile);
    } catch (error) {
      console.error('Error getting student profile:', error);
      res.status(500).json({ error: "Failed to get student profile" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}