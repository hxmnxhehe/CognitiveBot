import { z } from "zod";

// Student Profile Schema
export const studentProfileSchema = z.object({
  user_id: z.string(),
  knowledge_areas: z.record(z.number().min(0).max(1)).default({}),
  misconceptions: z.record(z.number().min(0)).default({}),
  progress_log: z.array(z.string()).default([]),
  learning_style: z.string().nullable().default(null),
  last_interaction_summary: z.string().nullable().default(null),
});

export type StudentProfile = z.infer<typeof studentProfileSchema>;

// Chat Message Schema
export const chatMessageSchema = z.object({
  id: z.string(),
  content: z.string(),
  role: z.enum(['user', 'assistant']),
  timestamp: z.date(),
  agent_type: z.enum(['questioning', 'student_model', 'feedback', 'safety']).nullable().default(null),
  session_id: z.string(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

// Chat Session Schema
export const chatSessionSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  messages: z.array(chatMessageSchema).default([]),
  student_profile: studentProfileSchema,
  created_at: z.date(),
  updated_at: z.date(),
  is_active: z.boolean().default(true),
});

export type ChatSession = z.infer<typeof chatSessionSchema>;

// API Request/Response Schemas
export const sendMessageSchema = z.object({
  message: z.string().min(1).max(500),
  session_id: z.string().optional(),
});

export type SendMessageRequest = z.infer<typeof sendMessageSchema>;

export const chatResponseSchema = z.object({
  session_id: z.string(),
  response: z.string(),
  student_profile_summary: studentProfileSchema,
  agent_status: z.object({
    questioning_agent: z.enum(['active', 'processing', 'idle']),
    student_model_agent: z.enum(['active', 'processing', 'idle']),
    feedback_agent: z.enum(['active', 'processing', 'idle']),
    safety_agent: z.enum(['active', 'processing', 'idle']),
  }),
});

export type ChatResponse = z.infer<typeof chatResponseSchema>;

// Agent State Schema for LangGraph
export const agentStateSchema = z.object({
  user_id: z.string(),
  session_id: z.string(),
  current_message: z.string(),
  chat_history: z.array(chatMessageSchema),
  student_profile: studentProfileSchema,
  current_question: z.string().default(''),
  student_response: z.string().default(''),
  feedback: z.string().default(''),
  safety_check_result: z.enum(['CLEAN', 'FLAGGED']).default('CLEAN'),
  next_action: z.string().default(''),
});

export type AgentState = z.infer<typeof agentStateSchema>;
