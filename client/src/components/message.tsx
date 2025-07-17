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
      <div className="flex items-start space-x-4 flex-row-reverse message-fade-in">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <i className="fas fa-user text-sm text-white"></i>
          </div>
        </div>
        <div className="flex-1 text-right">
          <div className="flex items-center justify-end space-x-2 mb-2">
            <span className="text-xs text-slate-500">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="font-semibold text-purple-400">You</span>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-2xl rounded-tr-sm inline-block max-w-lg">
            <p className="text-white">{message.content}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isAssistant) {
    return (
      <div className="flex items-start space-x-4 message-fade-in">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
            <i className="fas fa-robot text-sm text-white"></i>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-semibold neon-glow">CognitiveGPT</span>
            <span className="text-xs text-slate-500">
              {message.agent_type ? `${message.agent_type.charAt(0).toUpperCase() + message.agent_type.slice(1)} Agent` : 'AI Tutor'}
            </span>
            <span className="text-xs text-slate-500">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <Card className="glass-effect p-4 rounded-2xl rounded-tl-sm border border-slate-600 max-w-2xl">
            <p className="text-slate-200">{message.content}</p>
          </Card>
          {message.agent_type && (
            <div className="flex items-center space-x-2 mt-2 text-xs text-slate-500">
              <i className="fas fa-brain text-cyan-400"></i>
              <span>Processed by {message.agent_type.charAt(0).toUpperCase() + message.agent_type.slice(1)} Agent</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
