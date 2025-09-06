import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessages } from "@/hooks/useMessages";
import { 
  MessageSquare, 
  Search, 
  Send,
  MoreVertical,
  Phone,
  Video,
  Paperclip
} from "lucide-react";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { conversations, messages, loading, error, fetchMessages, sendMessage } = useMessages();

  useEffect(() => {
    if (conversations.length > 0 && !selectedChat) {
      setSelectedChat(conversations[0].id);
    }
  }, [conversations, selectedChat]);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat);
    }
  }, [selectedChat]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedChat) {
      await sendMessage(selectedChat, newMessage);
      setNewMessage("");
    }
  };

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);
  const filteredConversations = conversations.filter(conv =>
    conv.participants.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-destructive">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Messages</h1>
          <p className="text-muted-foreground">
            Communicate securely with clients and freelancers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <CardTitle>Conversations</CardTitle>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[480px]">
                {filteredConversations.map((conversation) => {
                  const otherParticipant = conversation.participants.find(p => p.id !== 'current');
                  return (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedChat(conversation.id)}
                      className={`p-4 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors ${
                        selectedChat === conversation.id ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={otherParticipant?.avatar} />
                            <AvatarFallback>{otherParticipant?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-background rounded-full"></span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-sm truncate">{otherParticipant?.name}</h3>
                            <span className="text-xs text-muted-foreground">
                              {new Date(conversation.last_message_time).toLocaleTimeString()}
                            </span>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mb-1 truncate">
                            {conversation.job_title}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground truncate flex-1">
                              {conversation.last_message}
                            </p>
                            {conversation.unread_count > 0 && (
                              <Badge className="ml-2 bg-primary text-primary-foreground text-xs">
                                {conversation.unread_count}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 shadow-card flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {selectedConversation && (
                        <>
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={selectedConversation.participants.find(p => p.id !== 'current')?.avatar} />
                            <AvatarFallback>
                              {selectedConversation.participants.find(p => p.id !== 'current')?.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{selectedConversation.participants.find(p => p.id !== 'current')?.name}</h3>
                            <p className="text-xs text-muted-foreground">{selectedConversation.job_title}</p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[400px] p-4">
                    {messages.map((message) => {
                      const isOwn = message.sender_id === 'current';
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
                        >
                          <div className={`max-w-[70%] rounded-lg p-3 ${
                            isOwn 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              isOwn 
                                ? 'text-primary-foreground/70' 
                                : 'text-muted-foreground'
                            }`}>
                              {new Date(message.created_at).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </ScrollArea>
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-gradient-hero text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the left to start messaging
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
  );
};

export default Messages;