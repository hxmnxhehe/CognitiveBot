import { Card } from '@/components/ui/card';

export function ThinkingIndicator() {
  return (
    <div className="flex items-start space-x-4 message-fade-in">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center animate-pulse-neon">
          <i className="fas fa-brain text-sm text-white"></i>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <span className="font-semibold neon-glow">CognitiveGPT</span>
          <span className="text-xs text-yellow-400">Analyzing response...</span>
        </div>
        <Card className="glass-effect p-4 rounded-2xl rounded-tl-sm border border-slate-600 animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-slate-400 thinking-dots">Thinking</span>
          </div>
          <div className="mt-3 text-xs text-slate-500">
            <div className="flex items-center space-x-2 mb-1">
              <i className="fas fa-user-graduate text-blue-400"></i>
              <span>Student Model Agent analyzing...</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-comment-dots text-yellow-400"></i>
              <span>Feedback Agent evaluating...</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
