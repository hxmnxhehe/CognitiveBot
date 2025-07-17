import { StudentProfile } from '@shared/schema';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  studentProfile?: StudentProfile;
  sessionId?: string;
  sessionDuration?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ 
  studentProfile, 
  sessionId, 
  sessionDuration = "0:00",
  isOpen = true, 
  onClose 
}: SidebarProps) {
  return (
    <div className={`w-80 glass-effect border-r border-slate-700 flex flex-col ${isOpen ? 'flex' : 'hidden'} lg:flex`}>
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text animate-glow">CognitiveGPT</h1>
            <p className="text-slate-400 text-sm mt-2">Socratic AI Learning System</p>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <i className="fas fa-times text-cyan-400"></i>
            </button>
          )}
        </div>
      </div>

      {/* Agent Status Panel */}
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-lg font-semibold mb-4 neon-glow">Agent Status</h3>
        <div className="space-y-3">
          <AgentStatusItem 
            name="Questioning Agent"
            status="active"
            icon="fas fa-brain"
            color="green"
          />
          <AgentStatusItem 
            name="Student Modeling"
            status="processing"
            icon="fas fa-user-graduate"
            color="blue"
          />
          <AgentStatusItem 
            name="Feedback Agent"
            status="idle"
            icon="fas fa-comment-dots"
            color="yellow"
          />
          <AgentStatusItem 
            name="Safety Agent"
            status="idle"
            icon="fas fa-shield-alt"
            color="emerald"
          />
        </div>
      </div>

      {/* Student Profile Overview */}
      <div className="p-4 flex-1 cyber-scrollbar overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 neon-glow">Learning Profile</h3>
        
        {/* Session Info */}
        <Card className="mb-6 p-3 glass-effect border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Session ID</span>
            <span className="text-xs font-mono text-cyan-400">
              {sessionId || 'No active session'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Duration</span>
            <span className="text-sm text-slate-300">{sessionDuration}</span>
          </div>
        </Card>

        {/* Knowledge Areas */}
        {studentProfile && Object.keys(studentProfile.knowledge_areas).length > 0 && (
          <div className="mb-6">
            <h4 className="text-md font-medium mb-3 text-slate-300">Knowledge Areas</h4>
            <div className="space-y-2">
              {Object.entries(studentProfile.knowledge_areas).map(([area, confidence]) => (
                <KnowledgeBar 
                  key={area}
                  area={area}
                  confidence={confidence}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recent Progress */}
        {studentProfile && studentProfile.progress_log.length > 0 && (
          <div className="mb-6">
            <h4 className="text-md font-medium mb-3 text-slate-300">Recent Progress</h4>
            <div className="space-y-2 text-xs text-slate-400">
              {studentProfile.progress_log.slice(-3).map((progress, index) => (
                <div key={index} className="p-2 rounded bg-slate-800/50">
                  <span className="text-green-400">✓</span> {progress}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Misconceptions Alert */}
        {studentProfile && Object.keys(studentProfile.misconceptions).length > 0 && (
          <Card className="p-3 bg-red-900/20 border border-red-500/30">
            <div className="flex items-center space-x-2 mb-2">
              <i className="fas fa-exclamation-triangle text-red-400"></i>
              <span className="text-sm font-medium text-red-400">Misconceptions Detected</span>
            </div>
            <div className="text-xs text-red-300">
              {Object.entries(studentProfile.misconceptions).map(([concept, count]) => (
                <span key={concept} className="block">
                  • {concept}: {count} occurrence{count > 1 ? 's' : ''}
                </span>
              ))}
            </div>
          </Card>
        )}

        {/* Empty state */}
        {(!studentProfile || 
          (Object.keys(studentProfile.knowledge_areas).length === 0 && 
           studentProfile.progress_log.length === 0 && 
           Object.keys(studentProfile.misconceptions).length === 0)) && (
          <div className="text-center py-8">
            <i className="fas fa-chart-line text-4xl text-slate-600 mb-4"></i>
            <p className="text-slate-400 text-sm">
              Start chatting to build your learning profile
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface AgentStatusItemProps {
  name: string;
  status: 'active' | 'processing' | 'idle';
  icon: string;
  color: 'green' | 'blue' | 'yellow' | 'emerald';
}

function AgentStatusItem({ name, status, icon, color }: AgentStatusItemProps) {
  const statusColors = {
    active: 'bg-green-400',
    processing: 'bg-blue-400 agent-pulse',
    idle: 'bg-gray-500',
  };

  const iconColors = {
    green: 'text-cyan-400',
    blue: 'text-blue-400',
    yellow: 'text-yellow-400',
    emerald: 'text-emerald-400',
  };

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg bg-slate-800/50 ${status === 'active' ? 'neon-border' : ''}`}>
      <div className="flex items-center space-x-3">
        <div className={`w-2 h-2 rounded-full ${statusColors[status]}`}></div>
        <span className="text-sm font-medium">{name}</span>
      </div>
      <i className={`${icon} ${iconColors[color]}`}></i>
    </div>
  );
}

interface KnowledgeBarProps {
  area: string;
  confidence: number;
}

function KnowledgeBar({ area, confidence }: KnowledgeBarProps) {
  const percentage = Math.round(confidence * 100);
  
  const getGradient = (conf: number) => {
    if (conf >= 0.7) return 'from-cyan-400 to-blue-400';
    if (conf >= 0.4) return 'from-purple-400 to-pink-400';
    return 'from-yellow-400 to-orange-400';
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-400 capitalize">{area}</span>
      <div className="flex items-center space-x-2">
        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getGradient(confidence)} rounded-full transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs text-slate-400">{confidence.toFixed(2)}</span>
      </div>
    </div>
  );
}
