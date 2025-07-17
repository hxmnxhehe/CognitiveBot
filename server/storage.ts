import { 
  ChatSession, 
  ChatMessage, 
  StudentProfile, 
  chatSessionSchema,
  chatMessageSchema,
  studentProfileSchema 
} from "@shared/schema";

export interface IStorage {
  // Session management
  createSession(userId: string): Promise<ChatSession>;
  getSession(sessionId: string): Promise<ChatSession | undefined>;
  updateSession(sessionId: string, session: Partial<ChatSession>): Promise<ChatSession>;
  getSessionsByUser(userId: string): Promise<ChatSession[]>;

  // Message management
  addMessage(sessionId: string, message: Omit<ChatMessage, 'id'>): Promise<ChatMessage>;
  getMessages(sessionId: string): Promise<ChatMessage[]>;

  // Student profile management
  getStudentProfile(userId: string): Promise<StudentProfile>;
  updateStudentProfile(userId: string, profile: Partial<StudentProfile>): Promise<StudentProfile>;
}

export class MemStorage implements IStorage {
  private sessions: Map<string, ChatSession> = new Map();
  private messages: Map<string, ChatMessage[]> = new Map();
  private studentProfiles: Map<string, StudentProfile> = new Map();

  async createSession(userId: string): Promise<ChatSession> {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const studentProfile = await this.getStudentProfile(userId);
    
    const session: ChatSession = {
      id: sessionId,
      user_id: userId,
      messages: [],
      student_profile: studentProfile,
      created_at: new Date(),
      updated_at: new Date(),
      is_active: true,
    };

    this.sessions.set(sessionId, session);
    this.messages.set(sessionId, []);
    return session;
  }

  async getSession(sessionId: string): Promise<ChatSession | undefined> {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;

    const messages = this.messages.get(sessionId) || [];
    return {
      ...session,
      messages,
    };
  }

  async updateSession(sessionId: string, updates: Partial<ChatSession>): Promise<ChatSession> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const updatedSession = {
      ...session,
      ...updates,
      updated_at: new Date(),
    };

    this.sessions.set(sessionId, updatedSession);
    return updatedSession;
  }

  async getSessionsByUser(userId: string): Promise<ChatSession[]> {
    return Array.from(this.sessions.values())
      .filter(session => session.user_id === userId)
      .map(session => ({
        ...session,
        messages: this.messages.get(session.id) || [],
      }));
  }

  async addMessage(sessionId: string, messageData: Omit<ChatMessage, 'id'>): Promise<ChatMessage> {
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const message: ChatMessage = {
      ...messageData,
      id: messageId,
    };

    const messages = this.messages.get(sessionId) || [];
    messages.push(message);
    this.messages.set(sessionId, messages);

    // Update session timestamp
    await this.updateSession(sessionId, { updated_at: new Date() });

    return message;
  }

  async getMessages(sessionId: string): Promise<ChatMessage[]> {
    return this.messages.get(sessionId) || [];
  }

  async getStudentProfile(userId: string): Promise<StudentProfile> {
    const existing = this.studentProfiles.get(userId);
    if (existing) return existing;

    const newProfile: StudentProfile = {
      user_id: userId,
      knowledge_areas: {},
      misconceptions: {},
      progress_log: [],
      learning_style: null,
      last_interaction_summary: null,
    };

    this.studentProfiles.set(userId, newProfile);
    return newProfile;
  }

  async updateStudentProfile(userId: string, updates: Partial<StudentProfile>): Promise<StudentProfile> {
    const existing = await this.getStudentProfile(userId);
    const updated = { ...existing, ...updates };
    this.studentProfiles.set(userId, updated);
    return updated;
  }
}

export const storage = new MemStorage();
