import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/sidebar';
import { ChatInterface } from '@/components/chat-interface';
import { useQuery } from '@tanstack/react-query';
import { useIsMobile } from '@/hooks/use-mobile';

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessionDuration, setSessionDuration] = useState('0:00');
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const isMobile = useIsMobile();

  // Load student profile
  const { data: studentProfile } = useQuery({
    queryKey: ['student-profile'],
    enabled: false, // Will be enabled after first message
  });

  // Session timer
  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const minutes = Math.floor(elapsed / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      setSessionDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex bg-slate-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 bg-grid-pattern pointer-events-none" />

      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <Sidebar 
            studentProfile={studentProfile}
            sessionDuration={sessionDuration}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar 
          studentProfile={studentProfile}
          sessionDuration={sessionDuration}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header Bar */}
        <header className="glass-effect border-b border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Toggle */}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <i className="fas fa-bars text-cyan-400"></i>
                </Button>
              )}
              
              {/* Session Status */}
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Active Learning Session</span>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              {/* API Status Indicators */}
              <div className="hidden md:flex items-center space-x-2 text-xs">
                <APIStatusIndicator name="Gemini" status="connected" />
                <APIStatusIndicator name="Claude" status="connected" />
                <APIStatusIndicator name="Firebase" status="connected" />
              </div>

              {/* Settings Button */}
              <Button
                variant="ghost"
                size="sm"
                className="p-2 rounded-lg hover:bg-slate-800 transition-colors neon-border hover:shadow-lg hover:shadow-cyan-400/30"
                disabled
                title="Settings (coming soon)"
              >
                <i className="fas fa-cog text-cyan-400"></i>
              </Button>
            </div>
          </div>
        </header>

        {/* Chat Interface */}
        <ChatInterface userId={userId} />
      </div>
    </div>
  );
}

interface APIStatusIndicatorProps {
  name: string;
  status: 'connected' | 'disconnected' | 'error';
}

function APIStatusIndicator({ name, status }: APIStatusIndicatorProps) {
  const statusColors = {
    connected: 'bg-green-400',
    disconnected: 'bg-gray-400',
    error: 'bg-red-400',
  };

  return (
    <div className="flex items-center space-x-1">
      <div className={`w-2 h-2 rounded-full ${statusColors[status]}`}></div>
      <span className="text-slate-400">{name}</span>
    </div>
  );
}
