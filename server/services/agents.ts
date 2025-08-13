import { AgentState, StudentProfile } from '../../shared/schema.js';
import { llmService } from './llm.js';
import { storage } from '../storage.js';

export class QuestioningAgent {
  async process(state: AgentState): Promise<Partial<AgentState>> {
    console.log("--- QuestioningAgent: Crafting Socratic prompt ---");

    const studentProfile = state.student_profile;
    const lastMessage = state.current_message;

    const llmPrompt = `
You are a Socratic tutor. Your goal is to guide the student to understand a concept by asking thought-provoking questions, not by giving direct answers.

Student's current response: "${lastMessage}"
Student's profile summary: ${JSON.stringify(studentProfile)}

Based on the above, ask a single, open-ended Socratic question or provide a hint that encourages deeper thinking.
Avoid direct answers. Focus on principles, implications, or alternative perspectives.
Keep your response under 200 words and make it engaging.
`;

    try {
      const socraticQuestion = await llmService.callGemini(llmPrompt);
      console.log(`Generated Question: ${socraticQuestion}`);

      return {
        current_question: socraticQuestion,
        next_action: "await_student_response"
      };
    } catch (error) {
      console.error('Error in QuestioningAgent:', error);

      // Fallback response
      const fallbackQuestions = [
        "That's interesting! Can you tell me more about what you're thinking?",
        "What makes you feel that way about this topic?",
        "How did you come to that conclusion?",
        "What do you think might happen if we approached this differently?",
      ];

      return {
        current_question: fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)],
        next_action: "await_student_response"
      };
    }
  }
}

export class StudentModelAgent {
  async process(state: AgentState): Promise<Partial<AgentState>> {
    console.log("--- StudentModelAgent: Updating student profile ---");

    const userId = state.user_id;
    const studentResponse = state.current_message;
    const currentQuestion = state.current_question;

    const llmAnalysisPrompt = `
Analyze the following student response to a Socratic question.
Student's last question: "${currentQuestion}"
Student's response: "${studentResponse}"

Based on this, suggest updates to the student's profile in a JSON format.
Focus on:
- 'knowledge_areas': How confident or knowledgeable they seem on related topics (0.0 to 1.0).
- 'misconceptions': Any clear misunderstandings (increment count if existing, add new if novel).
- 'progress_log': Brief summary of what they demonstrated understanding of.
- 'last_interaction_summary': A concise summary of this turn.

Example JSON format:
{
  "knowledge_areas": {"TopicA": 0.7, "TopicB": 0.4},
  "misconceptions": {"ConceptX": 1},
  "progress_log": ["Demonstrated understanding of Y"],
  "last_interaction_summary": "Discussed Z."
}

Provide only the JSON object.
`;

    try {
      const profileUpdates = await llmService.analyzeStudentResponse(llmAnalysisPrompt);

      await storage.updateStudentProfile(userId, profileUpdates);
      console.log(`Student profile updated for ${userId}`);

      const updatedProfile = await storage.getStudentProfile(userId);

      return {
        student_profile: updatedProfile,
        next_action: "evaluate_feedback"
      };
    } catch (error) {
      console.error('Failed to update student profile:', error);

      // Fallback profile update
      const fallbackUpdate = {
        last_interaction_summary: `Student said: "${studentResponse}"`,
        progress_log: [
          ...state.student_profile.progress_log,
          `${new Date().toISOString()}: ${studentResponse}`
        ].slice(-50)
      };

      try {
        await storage.updateStudentProfile(userId, fallbackUpdate);
        const updatedProfile = await storage.getStudentProfile(userId);

        return {
          student_profile: updatedProfile,
          next_action: "evaluate_feedback"
        };
      } catch (storageError) {
        console.error('Fallback profile update also failed:', storageError);

        return {
          student_profile: {
            ...state.student_profile,
            ...fallbackUpdate
          },
          next_action: "evaluate_feedback"
        };
      }
    }
  }
}

export class FeedbackAgent {
  async process(state: AgentState): Promise<Partial<AgentState>> {
    console.log("--- FeedbackAgent: Evaluating student response ---");

    const studentResponse = state.current_message;
    const currentQuestion = state.current_question;
    const studentProfile = state.student_profile;

    const llmFeedbackPrompt = `
Evaluate the student's response to the Socratic question.
Question: "${currentQuestion}"
Student Response: "${studentResponse}"
Student Profile: ${JSON.stringify(studentProfile)}

Based on this, determine if the student's response indicates:
1. Good progress towards understanding the concept.
2. Partial understanding, needing further probing.
3. A significant misconception or lack of understanding.

Provide a concise internal feedback string (e.g., "Good progress", "Needs more probing", "Misconception detected").
This feedback will inform the next Socratic question.
`;

    try {
      const feedbackResult = await llmService.callGemini(llmFeedbackPrompt);
      console.log(`Feedback: ${feedbackResult}`);

      return {
        feedback: feedbackResult,
        next_action: "check_safety"
      };
    } catch (error) {
      console.error('Error in FeedbackAgent:', error);

      // Fallback feedback
      const fallbackFeedback = "Student is engaging with the material. Continue probing for deeper understanding.";

      return {
        feedback: fallbackFeedback,
        next_action: "check_safety"
      };
    }
  }
}

export class SafetyAgent {
  async process(state: AgentState): Promise<Partial<AgentState>> {
    console.log("--- SafetyAgent: Performing safety check ---");

    const responseToCheck = state.current_question;
    const studentResponse = state.current_message;

    // Simple safety checks - in production, use more sophisticated moderation
    const flaggedTerms = ['hate', 'harmful', 'inappropriate', 'violence', 'explicit'];

    const questionHasIssues = flaggedTerms.some(term => 
      responseToCheck.toLowerCase().includes(term)
    );

    const studentResponseHasIssues = flaggedTerms.some(term => 
      studentResponse.toLowerCase().includes(term)
    );

    if (questionHasIssues || studentResponseHasIssues) {
      console.log("Safety check flagged content");
      return {
        safety_check_result: "FLAGGED",
        next_action: "re_question"
      };
    }

    console.log("Safety check passed");
    return {
      safety_check_result: "CLEAN",
      next_action: "respond_to_student"
    };
  }
}