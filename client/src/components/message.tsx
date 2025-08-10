import { ChatMessage } from '@shared/schema';
import { Card } from '@/components/ui/card';

interface MessageProps {
  message: ChatMessage;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  if (isUser) {
    return (
      <div className="flex items-start space-x-4 flex-row-reverse mb-6 animate-slide-in-right">
        <div className="flex-shrink-0 relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center shadow-lg border-3 border-dashed border-white/30 transform hover:scale-110 transition-all duration-300">
            <i className="fas fa-user text-lg text-white"></i>
          </div>
          {/* Fun floating emoji */}
          <div className="absolute -top-2 -right-1 text-lg animate-bounce">💭</div>
        </div>
        <div className="flex-1 text-right">
          <div className="flex items-center justify-end space-x-3 mb-3">
            <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="font-bold text-purple-300 flex items-center space-x-1">
              <span>You</span>
              <span className="text-sm">😊</span>
            </span>
          </div>
          <div className="relative inline-block max-w-lg">
            <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-4 rounded-2xl rounded-tr-md shadow-xl border-2 border-dashed border-white/20 transform hover:scale-[1.02] transition-all duration-300">
              <p className="text-white font-medium leading-relaxed">{message.content}</p>
              {/* Message tail with doodle style */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-purple-500 to-rose-500 transform rotate-45 border-r-2 border-b-2 border-dashed border-white/20"></div>
            </div>
            {/* Floating reaction emoji */}
            <div className="absolute -bottom-2 -right-2 text-sm animate-pulse">✨</div>
          </div>
        </div>
      </div>
    );
  }

  if (isAssistant) {
    return (
      <div className="flex items-start space-x-4 mb-6 animate-slide-in-left">
        <div className="flex-shrink-0 relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg border-3 border-dashed border-white/30 transform hover:scale-110 transition-all duration-300">
            <i className="fas fa-robot text-lg text-white"></i>
          </div>
          {/* AI status indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse shadow-sm"></div>
          {/* Fun floating emoji */}
          <div className="absolute -bottom-2 -left-1 text-lg animate-bounce">🤖</div>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-cyan-300 text-lg">CognitiveGPT</span>
              <span className="text-xl animate-spin" style={{ animationDuration: '3s' }}>⚡</span>
            </div>
            <div className="flex items-center space-x-2">
              {message.agent_type && (
                <span className="text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-400/30 font-medium">
                  {message.agent_type.charAt(0).toUpperCase() + message.agent_type.slice(1)} Agent
                </span>
              )}
              <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
          <div className="relative max-w-2xl">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm p-5 rounded-2xl rounded-tl-md border-2 border-dashed border-cyan-400/30 shadow-xl transform hover:scale-[1.01] transition-all duration-300">
              <p className="text-slate-200 leading-relaxed font-medium">{message.content}</p>
              {/* Message tail with doodle style */}
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-slate-800 to-slate-700 transform rotate-45 border-l-2 border-b-2 border-dashed border-cyan-400/30"></div>
            </Card>
            {/* Floating thinking emoji */}
            <div className="absolute -top-2 -right-2 text-lg animate-pulse">💡</div>
          </div>
          {message.agent_type && (
            <div className="flex items-center space-x-2 mt-3 text-xs text-slate-400 bg-slate-800/30 px-3 py-2 rounded-full max-w-fit">
              <i className="fas fa-brain text-cyan-400 animate-pulse"></i>
              <span>Processed by {message.agent_type.charAt(0).toUpperCase() + message.agent_type.slice(1)} Agent</span>
              <span className="text-cyan-400">🧠</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}