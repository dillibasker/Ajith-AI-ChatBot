export interface MessageType {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatContextType {
  messages: MessageType[];
  sendMessage: (message: string) => void;
  isTyping: boolean;
  lastMessage: MessageType | null;
}