import admin from 'firebase-admin';
import type { StudentProfile, ChatSession } from '../../shared/schema.js';

class FirebaseService {
  private db: admin.firestore.Firestore | null = null;
  private initialized = false;

  async initialize() {
    if (this.initialized) return;

    try {
      // Check if we have Firebase Admin credentials (server-side)
      const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT;

      if (serviceAccountKey) {
        // Initialize Firebase Admin SDK if service account is available
        if (!admin.apps.length) {
          const serviceAccount = JSON.parse(serviceAccountKey);

          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            projectId: process.env.FIREBASE_PROJECT_ID,
          });
        }

        this.db = admin.firestore();
        this.initialized = true;
        console.log('Firebase Admin SDK initialized successfully');
      } else {
        // No server-side Firebase credentials available, continue without it
        console.log('Firebase Admin SDK not configured - using in-memory storage only');
        this.initialized = true;
      }
    } catch (error) {
      console.error('Failed to initialize Firebase:', error);
      // Continue without Firebase for development
      this.initialized = true;
    }
  }

  async saveStudentProfile(userId: string, profile: StudentProfile) {
    if (!this.db) return;

    try {
      await this.db
        .collection('student_profiles')
        .doc(userId)
        .set({
          ...profile,
          updated_at: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } catch (error) {
      console.error('Error saving student profile:', error);
    }
  }

  async getStudentProfile(userId: string): Promise<StudentProfile | null> {
    if (!this.db) return null;

    try {
      const doc = await this.db
        .collection('student_profiles')
        .doc(userId)
        .get();

      return doc.exists ? doc.data() as StudentProfile : null;
    } catch (error) {
      console.error('Error getting student profile:', error);
      return null;
    }
  }

  async saveSession(sessionId: string, sessionData: ChatSession) {
    if (!this.db) return;

    try {
      await this.db
        .collection('chat_sessions')
        .doc(sessionId)
        .set({
          ...sessionData,
          updated_at: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } catch (error) {
      console.error('Error saving session:', error);
    }
  }

  async getSession(sessionId: string): Promise<ChatSession | null> {
    if (!this.db) return null;

    try {
      const doc = await this.db
        .collection('chat_sessions')
        .doc(sessionId)
        .get();

      return doc.exists ? doc.data() as ChatSession : null;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }
}

export const firebaseService = new FirebaseService();