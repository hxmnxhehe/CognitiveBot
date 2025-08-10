import { Card } from '@/components/ui/card';

export function ThinkingIndicator() {
  return (
    <div className="flex items-start space-x-4 animate-slide-in-left">
      <div className="flex-shrink-0 relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg border-3 border-dashed border-white/30 animate-pulse-neon">
          <i className="fas fa-brain text-lg text-white animate-pulse"></i>
        </div>
        {/* AI status indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white animate-bounce shadow-sm"></div>
        {/* Fun floating emoji */}
        <div className="absolute -bottom-2 -left-1 text-lg animate-bounce">🤔</div>
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-cyan-300 text-lg">CognitiveGPT</span>
            <span className="text-xl animate-spin" style={{ animationDuration: '2s' }}>⚡</span>
          </div>
          <span className="text-xs bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 px-3 py-1 rounded-full border border-yellow-400/30 font-medium animate-pulse">
            🧠 Thinking hard...
          </span>
        </div>
        <div className="relative max-w-2xl">
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm p-5 rounded-2xl rounded-tl-md border-2 border-dashed border-cyan-400/30 shadow-xl">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce shadow-neon"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce shadow-neon-purple" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce shadow-neon-pink" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-slate-300 font-medium thinking-dots">Processing your question</span>
              <span className="text-2xl animate-spin" style={{ animationDuration: '3s' }}>💭</span>
            </div>

            {/* Agent activity indicators */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 p-2 rounded-xl bg-blue-500/10 border border-blue-400/20">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <i className="fas fa-user-graduate text-blue-400"></i>
                <span className="text-blue-300 font-medium">Student Model Agent analyzing your learning style...</span>
                <span className="text-lg animate-bounce">📊</span>
              </div>

              <div className="flex items-center space-x-3 p-2 rounded-xl bg-yellow-500/10 border border-yellow-400/20">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <i className="fas fa-comment-dots text-yellow-400"></i>
                <span className="text-yellow-300 font-medium">Feedback Agent crafting the perfect response...</span>
                <span className="text-lg animate-wiggle">✨</span>
              </div>

              <div className="flex items-center space-x-3 p-2 rounded-xl bg-green-500/10 border border-green-400/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                <i className="fas fa-brain text-green-400"></i>
                <span className="text-green-300 font-medium">Questioning Agent preparing follow-ups...</span>
                <span className="text-lg animate-bounce-gentle">🎯</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 pt-3 border-t border-dashed border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">Processing Progress</span>
                <span className="text-xs text-cyan-400 font-mono">AI Magic in Progress... ✨</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full animate-pulse" style={{ width: '70%', transition: 'width 2s ease-in-out' }}></div>
              </div>
            </div>

            {/* Message tail with doodle style */}
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-slate-800 to-slate-700 transform rotate-45 border-l-2 border-b-2 border-dashed border-cyan-400/30"></div>
          </Card>

          {/* Floating thinking emoji */}
          <div className="absolute -top-2 -right-2 text-2xl animate-float">💡</div>
        </div>
      </div>
    </div>
  );
}