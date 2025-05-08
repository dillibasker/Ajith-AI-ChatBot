import React from 'react';
import { motion } from 'framer-motion';
import { MessageType } from '../../types/chat';
import { TypewriterEffect } from '../UI/TypewriterEffect';

interface ChatMessageProps {
  message: MessageType;
  isTyping?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isTyping = false }) => {
  const { sender, text, timestamp } = message;
  const isBot = sender === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={isBot ? 'chat-bubble-bot' : 'chat-bubble-user'}
      >
        <div>
          {isBot && isTyping ? (
            <TypewriterEffect text={text} />
          ) : (
            <p>{text}</p>
          )}
        </div>
        <div className={`text-xs mt-1 ${isBot ? 'text-gray-400' : 'text-primary-200'}`}>
          {formatTime(timestamp)}
        </div>
      </div>
    </motion.div>
  );
};

const formatTime = (timestamp: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(timestamp);
};