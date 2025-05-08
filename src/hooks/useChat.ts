import { useState, useCallback } from 'react';
import { MessageType } from '../types/chat';
import { ajithResponses } from '../data/chatResponses';

export const useChat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [lastMessage, setLastMessage] = useState<MessageType | null>(null);

  const generateResponse = (userMessage: string): string => {
    // Simple response logic based on user input
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Check for common greetings
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
      return ajithResponses.greetings[Math.floor(Math.random() * ajithResponses.greetings.length)];
    }
    
    // Check for questions about films or career
    if (lowerCaseMessage.includes('movie') || lowerCaseMessage.includes('film') || lowerCaseMessage.includes('career')) {
      return ajithResponses.films[Math.floor(Math.random() * ajithResponses.films.length)];
    }
    
    // Check for personal questions
    if (lowerCaseMessage.includes('favorite') || lowerCaseMessage.includes('like') || lowerCaseMessage.includes('enjoy')) {
      return ajithResponses.personal[Math.floor(Math.random() * ajithResponses.personal.length)];
    }
    
    // Default responses for anything else
    return ajithResponses.default[Math.floor(Math.random() * ajithResponses.default.length)];
  };

  const sendMessage = useCallback((text: string) => {
    const userMessage: MessageType = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLastMessage(userMessage);
    setIsTyping(true);

    // Simulate AI response time
    setTimeout(() => {
      const botResponse: MessageType = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(text),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setLastMessage(botResponse);
      setIsTyping(false);
    }, 1500 + Math.random() * 1500); // Random delay between 1.5-3s for more natural response
  }, []);

  return {
    messages,
    sendMessage,
    isTyping,
    lastMessage,
  };
};