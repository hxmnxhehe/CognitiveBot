import { GoogleGenAI } from '@google/genai';
import Anthropic from '@anthropic-ai/sdk';

class LLMService {
  private gemini: GoogleGenAI;
  private anthropic: Anthropic;

  constructor() {
    this.gemini = new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY || '' 
    });
    
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    });
  }

  async callGemini(prompt: string): Promise<string> {
    try {
      const response = await this.gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return response.text || "I'm having trouble connecting to Gemini right now.";
    } catch (error) {
      console.error('Error calling Gemini:', error);
      return "I'm having trouble connecting to Gemini right now.";
    }
  }

  async callClaude(prompt: string): Promise<string> {
    try {
      const response = await this.anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        messages: [{ role: "user", content: prompt }],
      });

      return response.content[0]?.text || "I'm having trouble connecting to Claude right now.";
    } catch (error) {
      console.error('Error calling Claude:', error);
      return "I'm having trouble connecting to Claude right now.";
    }
  }

  async analyzeStudentResponse(prompt: string): Promise<any> {
    try {
      // Try Anthropic first, fallback to Gemini if it fails
      const response = await this.anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      });

      const responseText = response.content[0]?.text || '{}';
      
      try {
        return JSON.parse(responseText);
      } catch {
        return {
          knowledge_areas: {},
          misconceptions: {},
          progress_log: ["Could not parse detailed analysis"],
          last_interaction_summary: "Analysis completed but format was unclear"
        };
      }
    } catch (error) {
      console.error('Error with Anthropic, falling back to Gemini:', error);
      
      // Fallback to Gemini for analysis
      try {
        const geminiPrompt = prompt + "\n\nProvide your response as a valid JSON object only.";
        const geminiResponse = await this.callGemini(geminiPrompt);
        
        try {
          return JSON.parse(geminiResponse);
        } catch {
          // If JSON parsing fails, create a basic response
          return {
            knowledge_areas: {"general": 0.5},
            misconceptions: {},
            progress_log: ["Processed response with Gemini fallback"],
            last_interaction_summary: "Student engaged with learning content"
          };
        }
      } catch (geminiError) {
        console.error('Both Anthropic and Gemini failed:', geminiError);
        return {
          knowledge_areas: {},
          misconceptions: {},
          progress_log: ["Error during analysis"],
          last_interaction_summary: "Analysis failed due to technical error"
        };
      }
    }
  }
}

export const llmService = new LLMService();
