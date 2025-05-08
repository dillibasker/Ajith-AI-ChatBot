import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Image, PauseCircle } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { AnimatedAvatar } from '../3D/AnimatedAvatar';
import { useChat } from '../../hooks/useChat';
import { TypewriterEffect } from '../UI/TypewriterEffect';
import { motion } from 'framer-motion';

export const ChatInterface: React.FC = () => {
  const { messages, sendMessage, isTyping, lastMessage } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    sendMessage(input);
    setInput('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus the input on component mount
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full h-[calc(100vh-12rem)] gap-4">
      {/* 3D Avatar Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel w-full md:w-2/5 h-60 md:h-full overflow-hidden flex items-center justify-center"
      >
        <AnimatedAvatar isTyping={isTyping} />
      </motion.div>

      {/* Chat Section */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-panel flex-1 flex flex-col h-full"
      >
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-display font-bold text-gray-200 mb-4"
              >
                Chat with Ajith AI
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-gray-400 max-w-md"
              >
                Ask me anything about Ajith's films, career, interests, or just say hello!
              </motion.p>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage 
                key={index} 
                message={message} 
                isTyping={isTyping && index === messages.length - 1} 
              />
            ))
          )}
          {isTyping && (
            <div className="chat-bubble-bot inline-flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <button 
              type="button"
              className="btn-secondary p-2"
              aria-label="Attach image"
            >
              <Image size={20} className="text-gray-400" />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-surface-light/70 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 border border-white/10"
            />
            <button 
              type="button"
              className="btn-secondary p-2"
              aria-label="Voice input"
            >
              <Mic size={20} className="text-gray-400" />
            </button>
            <button 
              type="submit"
              className="btn-primary p-2"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};