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
    <div className="relative min-h-screen flex bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Fun Doodle Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating doodle elements */}
        <div className="absolute top-20 left-10 w-16 h-16 opacity-10">
          <div className="text-6xl animate-bounce text-yellow-300">⭐</div>
        </div>
        <div className="absolute top-40 right-20 w-12 h-12 opacity-15">
          <div className="text-4xl animate-pulse text-pink-300">💭</div>
        </div>
        <div className="absolute bottom-32 left-20 w-14 h-14 opacity-10">
          <div className="text-5xl animate-ping text-cyan-300">🚀</div>
        </div>
        <div className="absolute top-60 right-40 w-10 h-10 opacity-20">
          <div className="text-3xl animate-spin text-green-300">✨</div>
        </div>
        {/* Grid pattern with doodle style */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJtIDQwIDAgbCAwIDQwIG0gLTQwIDAgbCA0MCAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50">
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
        {/* Fun Header Bar */}
        <header className="bg-gradient-to-r from-purple-800/80 to-pink-800/80 backdrop-blur-lg border-b-4 border-dashed border-yellow-300/30 p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Toggle with fun style */}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-110"
                >
                  <i className="fas fa-bars text-white text-lg"></i>
                </Button>
              )}

              {/* Session Status with doodle style */}
              <div className="flex items-center space-x-3 bg-green-500/20 rounded-full px-4 py-2 border-2 border-dashed border-green-400/50">
                <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce shadow-lg shadow-green-400/50"></div>
                <span className="text-sm font-bold text-green-300">🔥 Learning Mode ON!</span>
              </div>
            </div>
          </div>
        </header>

        {/* Chat Interface */}
        <ChatInterface userId={userId} />
      </div>
    </div>
  );
}