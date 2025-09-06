import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  content: string;
  created_at: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  last_message: string;
  last_message_time: string;
  unread_count: number;
  job_title?: string;
}

export function useMessages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchConversations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock conversations data
      const mockConversations: Conversation[] = [
        {
          id: '1',
          participants: [
            { id: 'user1', name: 'Sarah Johnson', avatar: '/api/placeholder/32/32' },
            { id: user?.id || 'current', name: 'You' }
          ],
          last_message: 'Thanks for your proposal! When can we start the project?',
          last_message_time: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
          unread_count: 2,
          job_title: 'React Developer for E-commerce Site'
        },
        {
          id: '2',
          participants: [
            { id: 'user2', name: 'Michael Chen', avatar: '/api/placeholder/32/32' },
            { id: user?.id || 'current', name: 'You' }
          ],
          last_message: 'The mockups look great! A few minor adjustments needed.',
          last_message_time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          unread_count: 0,
          job_title: 'Mobile App UI/UX Design'
        },
        {
          id: '3',
          participants: [
            { id: 'user3', name: 'Emma Williams', avatar: '/api/placeholder/32/32' },
            { id: user?.id || 'current', name: 'You' }
          ],
          last_message: 'Project completed successfully. Thank you!',
          last_message_time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          unread_count: 0,
          job_title: 'WordPress Website Development'
        }
      ];
      
      setConversations(mockConversations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch conversations');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      setError(null);
      
      // Mock messages for conversation
      const mockMessages: Message[] = [
        {
          id: '1',
          conversation_id: conversationId,
          sender_id: 'user1',
          sender_name: 'Sarah Johnson',
          content: 'Hi! I saw your proposal for my React project. Your experience looks impressive.',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
          read: true
        },
        {
          id: '2',
          conversation_id: conversationId,
          sender_id: user?.id || 'current',
          sender_name: 'You',
          content: 'Thank you! I\'m excited about this project. I have extensive experience with React and e-commerce platforms.',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          read: true
        },
        {
          id: '3',
          conversation_id: conversationId,
          sender_id: 'user1',
          sender_name: 'Sarah Johnson',
          content: 'Thanks for your proposal! When can we start the project?',
          created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          read: false
        }
      ];
      
      setMessages(mockMessages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch messages');
    }
  };

  const sendMessage = async (conversationId: string, content: string) => {
    try {
      const newMessage: Message = {
        id: Date.now().toString(),
        conversation_id: conversationId,
        sender_id: user?.id || 'current',
        sender_name: 'You',
        content,
        created_at: new Date().toISOString(),
        read: true
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      // Update last message in conversations
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId 
            ? { ...conv, last_message: content, last_message_time: new Date().toISOString() }
            : conv
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return {
    conversations,
    messages,
    loading,
    error,
    fetchConversations,
    fetchMessages,
    sendMessage,
    refetch: fetchConversations
  };
}