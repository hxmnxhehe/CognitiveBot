import admin from 'firebase-admin';

class FirebaseService {
  private db: admin.firestore.Firestore | null = null;
  private initialized = false;

  async initialize() {
    if (this.initialized) return;

    try {
      // Check if we have Firebase Admin credentials (server-side)
      const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT;
      const projectId = process.env.FIREBASE_PROJECT_ID;
      
      if (serviceAccountKey && projectId) {
        // Initialize Firebase Admin SDK if service account is available
        if (!admin.apps.length) {
          const serviceAccount = JSON.parse(serviceAccountKey);
          
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            projectId: projectId,
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

  async saveStudentProfile(userId: string, profile: any) {
    if (!this.db) return;

    try {
      await this.db
        .collection('student_profiles')
        .doc(userId)
        .set(profile, { merge: true });
    } catch (error) {
      console.error('Error saving student profile:', error);
    }
  }

  async getStudentProfile(userId: string) {
    if (!this.db) return null;

    try {
      const doc = await this.db
        .collection('student_profiles')
        .doc(userId)
        .get();

      return doc.exists ? doc.data() : null;
    } catch (error) {
      console.error('Error getting student profile:', error);
      return null;
    }
  }

  async saveSession(sessionId: string, sessionData: any) {
    if (!this.db) return;

    try {
      await this.db
        .collection('chat_sessions')
        .doc(sessionId)
        .set(sessionData, { merge: true });
    } catch (error) {
      console.error('Error saving session:', error);
    }
  }
}

export const firebaseService = new FirebaseService();
