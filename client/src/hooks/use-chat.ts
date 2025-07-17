import { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { ChatMessage, ChatResponse, StudentProfile } from '@shared/schema';

interface UseChatOptions {
  sessionId?: string;
  userId?: string;
}

export function useChat({ sessionId: initialSessionId, userId }: UseChatOptions = {}) {
  const [sessionId, setSessionId] = useState<string | null>(initialSessionId || null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Create new session mutation
  const createSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/chat/session');
      return response.json();
    },
    onSuccess: (data) => {
      setSessionId(data.session_id);
    },
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async ({ message, session_id }: { message: string; session_id?: string }) => {
      const response = await apiRequest('POST', '/api/chat/message', {
        message,
        session_id,
      });
      return response.json() as Promise<ChatResponse>;
    },
    onMutate: ({ message }) => {
      // Optimistically add user message
      const userMessage: ChatMessage = {
        id: `temp-${Date.now()}`,
        content: message,
        role: 'user',
        timestamp: new Date(),
        agent_type: null,
        session_id: sessionId || '',
      };
      setMessages(prev => [...prev, userMessage]);
      setIsThinking(true);
    },
    onSuccess: (data) => {
      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: `resp-${Date.now()}`,
        content: data.response,
        role: 'assistant',
        timestamp: new Date(),
        agent_type: 'questioning',
        session_id: data.session_id,
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setSessionId(data.session_id);
      setIsThinking(false);
      
      // Update student profile in cache
      queryClient.setQueryData(['student-profile'], data.student_profile_summary);
    },
    onError: () => {
      setIsThinking(false);
    },
  });

  // Load session history
  const { data: sessionData } = useQuery({
    queryKey: ['chat-session', sessionId],
    enabled: !!sessionId,
  });

  // Load student profile
  const { data: studentProfile } = useQuery({
    queryKey: ['student-profile'],
  });

  // Update messages when session data loads
  useEffect(() => {
    if (sessionData?.messages) {
      setMessages(sessionData.messages);
    }
  }, [sessionData]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    let currentSessionId = sessionId;
    
    // Create session if none exists
    if (!currentSessionId) {
      const sessionData = await createSessionMutation.mutateAsync();
      currentSessionId = sessionData.session_id;
    }

    sendMessageMutation.mutate({
      message: message.trim(),
      session_id: currentSessionId,
    });
  };

  const clearChat = () => {
    setMessages([]);
    setSessionId(null);
    setIsThinking(false);
  };

  return {
    messages,
    isThinking,
    sessionId,
    studentProfile,
    sendMessage,
    clearChat,
    messagesEndRef,
    isLoading: sendMessageMutation.isPending || createSessionMutation.isPending,
  };
}
