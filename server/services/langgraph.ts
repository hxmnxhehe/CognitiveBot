import { AgentState } from '../../shared/schema.js';
import { QuestioningAgent, StudentModelAgent, FeedbackAgent, SafetyAgent } from './agents.js';

export class LangGraphWorkflow {
  private questioningAgent = new QuestioningAgent();
  private studentModelAgent = new StudentModelAgent();
  private feedbackAgent = new FeedbackAgent();
  private safetyAgent = new SafetyAgent();

  async executeWorkflow(initialState: AgentState): Promise<AgentState> {
    let currentState = { ...initialState };

    try {
      // Step 1: Update student model based on response
      const studentModelResult = await this.studentModelAgent.process(currentState);
      currentState = { ...currentState, ...studentModelResult };

      // Step 2: Evaluate feedback
      const feedbackResult = await this.feedbackAgent.process(currentState);
      currentState = { ...currentState, ...feedbackResult };

      // Step 3: Safety check
      const safetyResult = await this.safetyAgent.process(currentState);
      currentState = { ...currentState, ...safetyResult };

      // Step 4: Generate next question if safety check passed
      if (currentState.safety_check_result === 'CLEAN') {
        const questioningResult = await this.questioningAgent.process(currentState);
        currentState = { ...currentState, ...questioningResult };
      } else {
        // Re-generate question if safety check failed
        const questioningResult = await this.questioningAgent.process(currentState);
        currentState = { ...currentState, ...questioningResult };
      }

      return currentState;
    } catch (error) {
      console.error('Error in LangGraph workflow:', error);

      // Fallback response
      return {
        ...currentState,
        current_question: "I'm processing your response. Please give me a moment to think of the best way to guide your learning.",
        next_action: "await_student_response",
        safety_check_result: "CLEAN"
      };
    }
  }

  getAgentStatus(state: AgentState) {
    return {
      questioning_agent: state.next_action === 're_question' ? 'processing' : 'active',
      student_model_agent: 'idle' as const,
      feedback_agent: 'idle' as const,
      safety_agent: state.safety_check_result === 'FLAGGED' ? 'active' : 'idle',
    };
  }
}

export const langGraphWorkflow = new LangGraphWorkflow();