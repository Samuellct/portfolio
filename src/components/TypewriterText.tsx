import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 0,
  speed = 100,
  onComplete,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Start typing animation after delay
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true);
      setShowCursor(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  // Typing effect
  useEffect(() => {
    if (hasStarted && currentIndex < text.length && !isComplete) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentIndex >= text.length && !isComplete && hasStarted) {
      setIsComplete(true);
      // Hide cursor after completion
      setTimeout(() => {
        setShowCursor(false);
        onComplete?.();
      }, 500);
    }
  }, [currentIndex, text, speed, onComplete, isComplete, hasStarted]);

  // Cursor blinking effect
  useEffect(() => {
    if (hasStarted && !isComplete) {
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);

      return () => clearInterval(cursorTimer);
    }
  }, [isComplete, hasStarted]);

  return (
    <span className={className}>
      {displayText}
      <AnimatePresence>
        {showCursor && hasStarted && (
          <motion.span
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-block w-0.5 h-[1em] bg-blue-400 ml-1 align-middle"
          />
        )}
      </AnimatePresence>
    </span>
  );
};

export default TypewriterText;