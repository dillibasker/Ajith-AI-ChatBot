import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string;
  delay?: number;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ 
  text, 
  delay = 30 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text.charAt(index));
        setIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [index, text, delay]);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setIndex(0);
  }, [text]);

  return (
    <span>{displayedText}<span className="inline-block w-1 h-4 ml-1 bg-primary-400 animate-pulse"></span></span>
  );
};