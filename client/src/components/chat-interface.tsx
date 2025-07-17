import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Message } from './message';
import { ThinkingIndicator } from './thinking-indicator';
import { useChat } from '@/hooks/use-chat';

interface ChatInterfaceProps {
  userId?: string;
}

export function ChatInterface({ userId }: ChatInterfaceProps) {
  const [inputMessage, setInputMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { 
    messages, 
    isThinking, 
    sessionId, 
    sendMessage, 
    clearChat, 
    messagesEndRef,
    isLoading 
  } = useChat({ userId });

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage.trim();
    setInputMessage('');
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const quickActions = [
    "I need help with...",
    "Can you explain...",
    "I'm confused about...",
  ];

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      {/* Chat Messages Area */}
      <div className="flex-1 p-6 overflow-y-auto cyber-scrollbar">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Message */}
          {messages.length === 0 && !isThinking && (
            <div className="text-center mb-8">
              <div className="inline-block p-6 rounded-2xl glass-effect neon-border animate-float">
                <i className="fas fa-graduation-cap text-4xl text-cyan-400 mb-4"></i>
                <h2 className="text-2xl font-bold gradient-text mb-2">Welcome to CognitiveGPT</h2>
                <p className="text-slate-400">Your Socratic AI tutor is ready to guide your learning journey</p>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="space-y-6">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            
            {/* Thinking State */}
            {isThinking && <ThinkingIndicator />}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Message Input Area */}
      <div className="border-t border-slate-700 glass-effect p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-4">
            {/* Input Field */}
            <div className="flex-1 relative">
              <Textarea 
                ref={textareaRef}
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full p-4 pr-12 rounded-2xl bg-slate-800/80 border border-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none text-slate-200 placeholder-slate-500 resize-none cyber-scrollbar min-h-[48px] max-h-32"
                placeholder="Share your thoughts and questions..."
                disabled={isLoading}
              />
              
              {/* Character Counter */}
              <div className="absolute bottom-2 right-2 text-xs text-slate-500">
                {inputMessage.length}/500
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2">
              {/* Send Button */}
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed neon-border border-cyan-400"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                Send
              </Button>

              {/* Additional Actions */}
              <div className="flex space-x-2">
                {/* Voice Input */}
                <Button 
                  variant="outline"
                  size="sm"
                  className="p-2 rounded-lg bg-slate-800 border border-slate-600 hover:border-cyan-400 hover:bg-slate-700 transition-colors"
                  disabled
                  title="Voice input (coming soon)"
                >
                  <i className="fas fa-microphone text-slate-400"></i>
                </Button>
                
                {/* Attachment */}
                <Button 
                  variant="outline"
                  size="sm"
                  className="p-2 rounded-lg bg-slate-800 border border-slate-600 hover:border-cyan-400 hover:bg-slate-700 transition-colors"
                  disabled
                  title="File attachment (coming soon)"
                >
                  <i className="fas fa-paperclip text-slate-400"></i>
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage(action)}
                  className="px-3 py-1 text-xs rounded-full bg-slate-800 border border-slate-600 hover:border-cyan-400 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {action}
                </Button>
              ))}
            </div>

            {/* Session Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-xs text-slate-500 hover:text-slate-400 transition-colors"
                disabled={messages.length === 0}
              >
                <i className="fas fa-trash-alt mr-1"></i>
                Clear Chat
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-slate-500 hover:text-slate-400 transition-colors"
                disabled
                title="Export (coming soon)"
              >
                <i className="fas fa-download mr-1"></i>
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
