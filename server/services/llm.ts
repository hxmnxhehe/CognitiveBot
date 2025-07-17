import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';

class LLMService {
  private gemini: GoogleGenAI;
  private openrouter: OpenAI;

  constructor() {
    this.gemini = new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY || '' 
    });
    
    this.openrouter = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY || '',
      baseURL: 'https://openrouter.ai/api/v1',
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

  async callOpenRouter(prompt: string): Promise<string> {
    try {
      const response = await this.openrouter.chat.completions.create({
        model: "anthropic/claude-3-sonnet",
        max_tokens: 500,
        messages: [{ role: "user", content: prompt }],
      });

      return response.choices[0]?.message?.content || "I'm having trouble connecting to OpenRouter right now.";
    } catch (error) {
      console.error('Error calling OpenRouter:', error);
      return "I'm having trouble connecting to OpenRouter right now.";
    }
  }

  async analyzeStudentResponse(prompt: string): Promise<any> {
    try {
      // Try OpenRouter first, fallback to Gemini if it fails
      const response = await this.openrouter.chat.completions.create({
        model: "anthropic/claude-3-sonnet",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      });

      const responseText = response.choices[0]?.message?.content || '{}';
      
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
      console.error('Error with OpenRouter, falling back to Gemini:', error);
      
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
        console.error('Both OpenRouter and Gemini failed:', geminiError);
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
