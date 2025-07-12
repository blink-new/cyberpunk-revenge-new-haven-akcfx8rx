import React from 'react';
import { cn } from '../../lib/utils';

interface CyberpunkPanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'warning' | 'danger';
  glowColor?: string;
  animated?: boolean;
}

export const CyberpunkPanel: React.FC<CyberpunkPanelProps> = ({
  children,
  className,
  variant = 'default',
  glowColor,
  animated = true
}) => {
  const variantStyles = {
    default: 'border-cyan-500/50 bg-gray-900/70',
    primary: 'border-blue-500/50 bg-blue-900/20',
    secondary: 'border-purple-500/50 bg-purple-900/20',
    warning: 'border-yellow-500/50 bg-yellow-900/20',
    danger: 'border-red-500/50 bg-red-900/20'
  };

  const glowStyles = {
    default: 'shadow-cyan-500/25',
    primary: 'shadow-blue-500/25',
    secondary: 'shadow-purple-500/25',
    warning: 'shadow-yellow-500/25',
    danger: 'shadow-red-500/25'
  };

  return (
    <div
      className={cn(
        'relative border-2 backdrop-blur-md rounded-lg',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent',
        'before:animate-pulse before:rounded-lg',
        variantStyles[variant],
        animated && 'transition-all duration-300 hover:scale-[1.02]',
        animated && `hover:shadow-lg hover:${glowStyles[variant]}`,
        className
      )}
      style={{
        boxShadow: glowColor ? `0 0 20px ${glowColor}25` : undefined
      }}
    >
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400 rounded-br-lg" />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
};

export default CyberpunkPanel;