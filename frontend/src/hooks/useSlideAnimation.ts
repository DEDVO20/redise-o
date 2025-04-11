import { useState, useEffect } from 'react';

interface SlideAnimationProps {
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}

export const useSlideAnimation = ({ delay = 0, direction = 'up' }: SlideAnimationProps = {}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getSlideClass = () => {
    const baseClasses = 'transition-all duration-500 ease-out';
    const visibilityClass = isVisible ? 'opacity-100' : 'opacity-0';
    
    const directionClass = {
      left: isVisible ? 'translate-x-0' : '-translate-x-full',
      right: isVisible ? 'translate-x-0' : 'translate-x-full',
      up: isVisible ? 'translate-y-0' : '-translate-y-full',
      down: isVisible ? 'translate-y-0' : 'translate-y-full'
    }[direction];

    return `${baseClasses} ${visibilityClass} ${directionClass}`;
  };

  return { isVisible, getSlideClass };
};