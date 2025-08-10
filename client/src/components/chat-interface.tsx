import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Message } from '@/components/message';
import { ChatMessage } from '@shared/schema';

interface ChatInterfaceProps {
  userId: string;
}

// Fun suggestion prompts with emojis
const suggestionPrompts = [
  { text: "I'm struggling with this problem - can you help me think through it? 🤔", emoji: "💭" },
  { text: "What questions should I ask myself about this topic? 🔍", emoji: "❓" },
  { text: "How can I break down this complex idea into smaller parts? 🧩", emoji: "🔬" },
  { text: "What assumptions am I making that I should examine? 🎯", emoji: "🤨" },
  { text: "Can you guide me to discover the answer myself? 🗺️", emoji: "🧭" },
  { text: "What's the deeper meaning behind what I'm learning? 💡", emoji: "🎭" }
];

export function ChatInterface({ userId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus on textarea when component mounts
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const handleSubmit = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowSuggestions(false); // Hide suggestions once chat starts

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: `I'd be happy to help you with that! Let me think about "${userMessage.content}" and provide you with a detailed response...`,
        timestamp: new Date(),
        agent_type: 'questioning',
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto">
        {isEmpty ? (
          /* Welcome Screen with Centered Input */
          <div className="h-full flex flex-col items-center justify-center p-8">
            {/* Welcome Message */}
            <div className="text-center mb-12 max-w-2xl">
              <div className="text-8xl mb-6 animate-bounce">🤖</div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Hey there, learner! 👋
              </h1>
              <p className="text-xl text-slate-300 mb-2">
                Ready to explore, discover, and learn together?
              </p>
              <p className="text-lg text-slate-400">
                Ask me anything - I'm here to help! ✨
              </p>
            </div>

            {/* Centered Input Box */}
            <div className="w-full max-w-3xl mb-8">
              <div className="relative">
                <Textarea
                  ref={textareaRef}
                  placeholder="What would you like to learn today? Type your question here! 🤔"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="min-h-[60px] max-h-[200px] text-lg p-6 rounded-3xl bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-lg border-3 border-dashed border-cyan-400/40 text-white placeholder:text-slate-400 resize-none shadow-2xl focus:border-purple-400/60 focus:shadow-purple-400/20 transition-all duration-300"
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-12 w-12 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 disabled:from-gray-600 disabled:to-gray-500 border-2 border-dashed border-white/30 shadow-lg transform hover:scale-110 transition-all duration-300"
                >
                  {isLoading ? (
                    <i className="fas fa-spinner animate-spin text-white"></i>
                  ) : (
                    <i className="fas fa-paper-plane text-white"></i>
                  )}
                </Button>
              </div>
            </div>

            {/* Suggestion Cards */}
            {showSuggestions && (
              <div className="w-full max-w-4xl">
                <h3 className="text-center text-xl font-bold text-slate-300 mb-6 flex items-center justify-center space-x-2">
                  <span className="text-2xl">💡</span>
                  <span>Try asking about...</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestionPrompts.map((prompt, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(prompt.text)}
                      className="group cursor-pointer p-4 bg-gradient-to-br from-slate-800/60 to-slate-700/60 hover:from-slate-700/80 hover:to-slate-600/80 rounded-2xl border-2 border-dashed border-slate-600/50 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 hover:-rotate-1 shadow-lg hover:shadow-cyan-400/20"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl group-hover:animate-bounce">{prompt.emoji}</div>
                        <p className="text-slate-200 group-hover:text-cyan-300 transition-colors font-medium">
                          {prompt.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Chat Messages View */
          <div className="p-6 space-y-6">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center space-x-4 animate-pulse">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                  <i className="fas fa-robot text-white animate-bounce"></i>
                </div>
                <div className="flex-1">
                  <div className="bg-slate-800/80 p-4 rounded-2xl border-2 border-dashed border-cyan-400/30 max-w-md">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-slate-400 text-sm">Thinking...</span>
                      <span className="text-lg animate-spin">🧠</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Bottom Input (shown when chat has started) */}
      {!isEmpty && (
        <div className="border-t-3 border-dashed border-cyan-400/30 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-lg p-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                placeholder="Continue the conversation... 💬"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="min-h-[60px] max-h-[200px] text-lg p-4 pr-16 rounded-2xl bg-slate-800/80 border-2 border-dashed border-slate-600/50 focus:border-cyan-400/60 text-white placeholder:text-slate-400 resize-none shadow-xl transition-all duration-300"
              />
              <Button
                onClick={handleSubmit}
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 disabled:from-gray-600 disabled:to-gray-500 border-2 border-dashed border-white/20 shadow-md transform hover:scale-110 transition-all duration-300"
              >
                {isLoading ? (
                  <i className="fas fa-spinner animate-spin text-white text-sm"></i>
                ) : (
                  <i className="fas fa-paper-plane text-white text-sm"></i>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}