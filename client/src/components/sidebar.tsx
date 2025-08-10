import { StudentProfile } from '@shared/schema';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  studentProfile?: StudentProfile;
  sessionId?: string;
  sessionDuration?: string;
  isOpen?: boolean;
  onClose?: () => void;
  recentChats?: Array<{
    id: string;
    title: string;
    preview: string;
    timestamp: string;
    emoji: string;
  }>;
}

export function Sidebar({ 
  studentProfile, 
  sessionId, 
  sessionDuration = "0:00",
  isOpen = true, 
  onClose,
  recentChats = []
}: SidebarProps) {
  return (
    <div className={`w-80 bg-gradient-to-b from-indigo-900/90 to-purple-900/90 backdrop-blur-lg border-r-4 border-dashed border-cyan-300/30 flex flex-col ${isOpen ? 'flex' : 'hidden'} lg:flex shadow-2xl`}>
      {/* Header with fun branding */}
      <div className="p-6 border-b-3 border-dashed border-pink-300/30">
        <div className="flex items-center justify-between">
          <div className="relative">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              CognitiveGPT
            </h1>
            <div className="absolute -top-2 -right-2 text-xl animate-spin">✨</div>
            <p className="text-slate-300 text-sm mt-2 font-medium">🎯 Your Aesthetic Thinking Buddy!</p>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="lg:hidden p-2 rounded-xl bg-red-500/20 border-2 border-dashed border-red-400/40 hover:bg-red-500/40 transition-all duration-300 transform hover:rotate-90"
            >
              <i className="fas fa-times text-red-400 text-lg"></i>
            </button>
          )}
        </div>
      </div>

      {/* Big New Chat Button */}
      <div className="p-4 border-b-2 border-dashed border-yellow-300/20">
        <Button 
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white rounded-2xl shadow-lg border-3 border-dashed border-white/30 transition-all duration-300 transform hover:scale-105 hover:-rotate-1"
          onClick={() => {/* New chat logic here */}}
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl">💬</span>
            <span>New Chat</span>
            <span className="text-xl animate-bounce">+</span>
          </div>
        </Button>
      </div>

      {/* Recent Chats Section */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
          <span className="text-2xl">📚</span>
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Recent Chats
          </span>
        </h3>

        {recentChats.length > 0 ? (
          <div className="space-y-3">
            {recentChats.map((chat, index) => (
              <div 
                key={chat.id}
                className={`group p-4 rounded-2xl bg-gradient-to-r from-slate-800/60 to-slate-700/60 hover:from-slate-700/80 hover:to-slate-600/80 border-2 border-dashed border-transparent hover:border-cyan-400/50 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:-rotate-1 ${index === 0 ? 'ring-2 ring-cyan-400/50 border-cyan-400/30' : ''}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl flex-shrink-0 animate-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                    {chat.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white text-sm truncate group-hover:text-cyan-300 transition-colors">
                      {chat.title}
                    </h4>
                    <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                      {chat.preview}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-slate-500">{chat.timestamp}</span>
                      {index === 0 && (
                        <Badge className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 border border-green-400/30 rounded-full">
                          Active
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4 animate-bounce">💭</div>
            <p className="text-slate-300 text-sm font-medium mb-2">
              No recent chats yet
            </p>
            <p className="text-slate-400 text-xs">
              Start a conversation to see your chat history! 🎯
            </p>
          </div>
        )}

        {/* Session Info Card - moved to bottom */}
        <Card className="mt-6 p-4 bg-gradient-to-r from-purple-800/40 to-pink-800/40 border-2 border-dashed border-purple-400/30 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-purple-300 font-medium flex items-center space-x-2">
              <span className="text-lg">🎮</span>
              <span>Current Session</span>
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Session ID</span>
              <span className="text-xs font-mono text-cyan-400 bg-slate-800/50 px-2 py-1 rounded-lg">
                {sessionId || 'No session yet! 🚀'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Duration</span>
              <span className="text-sm text-yellow-300 font-bold flex items-center space-x-1">
                <span>⏰</span>
                <span>{sessionDuration}</span>
              </span>
            </div>
          </div>
        </Card>

        {/* Fun Learning Stats */}
        {studentProfile && Object.keys(studentProfile.knowledge_areas).length > 0 && (
          <Card className="mt-4 p-4 bg-gradient-to-r from-blue-800/40 to-indigo-800/40 border-2 border-dashed border-blue-400/30 rounded-2xl">
            <h4 className="text-md font-bold mb-3 text-blue-300 flex items-center space-x-2">
              <span className="text-xl">🧠</span>
              <span>Knowledge Areas</span>
            </h4>
            <div className="space-y-3">
              {Object.entries(studentProfile.knowledge_areas).map(([area, confidence]) => (
                <KnowledgeBar 
                  key={area}
                  area={area}
                  confidence={confidence}
                />
              ))}
            </div>
          </Card>
        )}

        {/* Achievement Badges */}
        {studentProfile && studentProfile.progress_log.length > 0 && (
          <Card className="mt-4 p-4 bg-gradient-to-r from-green-800/40 to-emerald-800/40 border-2 border-dashed border-green-400/30 rounded-2xl">
            <h4 className="text-md font-bold mb-3 text-green-300 flex items-center space-x-2">
              <span className="text-xl">🏆</span>
              <span>Recent Wins!</span>
            </h4>
            <div className="space-y-2">
              {studentProfile.progress_log.slice(-3).map((progress, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-xl bg-green-500/10 border border-green-500/20">
                  <span className="text-green-400 text-lg">🎉</span>
                  <span className="text-xs text-green-300 flex-1">{progress}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Empty state with encouragement */}
        {(!studentProfile || 
          (Object.keys(studentProfile.knowledge_areas).length === 0 && 
           studentProfile.progress_log.length === 0 && 
           Object.keys(studentProfile.misconceptions).length === 0)) && (
          <div className="text-center py-8 mt-6">
            <div className="text-6xl mb-4 animate-bounce">🚀</div>
            <p className="text-slate-300 text-sm font-medium mb-2">
              Ready to start learning?
            </p>
            <p className="text-slate-400 text-xs">
              Click "New Chat" and let's explore together! 🎯
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface KnowledgeBarProps {
  area: string;
  confidence: number;
}

function KnowledgeBar({ area, confidence }: KnowledgeBarProps) {
  const percentage = Math.round(confidence * 100);

  const getGradientAndEmoji = (conf: number) => {
    if (conf >= 0.7) return { gradient: 'from-green-400 to-emerald-400', emoji: '🔥' };
    if (conf >= 0.4) return { gradient: 'from-yellow-400 to-orange-400', emoji: '⚡' };
    return { gradient: 'from-purple-400 to-pink-400', emoji: '🌱' };
  };

  const config = getGradientAndEmoji(confidence);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-sm">{config.emoji}</span>
        <span className="text-sm text-slate-300 capitalize font-medium">{area}</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-16 h-3 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
          <div 
            className={`h-full bg-gradient-to-r ${config.gradient} rounded-full transition-all duration-500 shadow-md`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs text-slate-400 font-bold">{percentage}%</span>
      </div>
    </div>
  );
}