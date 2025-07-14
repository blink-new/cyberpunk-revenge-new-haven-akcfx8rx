import React from 'react';
import { cn } from '../../lib/utils';

interface CyberpunkIconProps {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const CyberpunkIcon: React.FC<CyberpunkIconProps> = ({
  icon,
  size = 'md',
  active = false,
  onClick,
  disabled = false,
  className
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg'
  };

  return (
    <div
      className={cn(
        'relative border border-cyan-500/30 bg-gray-900/50 backdrop-blur-sm',
        'flex items-center justify-center cursor-pointer transition-all duration-300',
        'hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/30',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-cyan-500/5 before:to-transparent',
        active && 'border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/40',
        disabled && 'opacity-50 cursor-not-allowed hover:border-cyan-500/30 hover:bg-gray-900/50',
        sizeStyles[size],
        className
      )}
      onClick={disabled ? undefined : onClick}
    >
      {/* Corner glow effects */}
      <div className="absolute top-0 left-0 w-1 h-1 bg-cyan-400 rounded-full opacity-60" />
      <div className="absolute top-0 right-0 w-1 h-1 bg-cyan-400 rounded-full opacity-60" />
      <div className="absolute bottom-0 left-0 w-1 h-1 bg-cyan-400 rounded-full opacity-60" />
      <div className="absolute bottom-0 right-0 w-1 h-1 bg-cyan-400 rounded-full opacity-60" />
      
      {/* Icon */}
      <div className="relative z-10 text-cyan-300">
        {icon}
      </div>
    </div>
  );
};

interface CyberpunkIconGridProps {
  icons: Array<{
    id: string;
    icon: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick?: () => void;
  }>;
  columns?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CyberpunkIconGrid: React.FC<CyberpunkIconGridProps> = ({
  icons,
  columns = 8,
  size = 'md',
  className
}) => {
  return (
    <div
      className={cn(
        'grid gap-2 p-4 bg-black/50 border border-cyan-500/30 rounded-lg',
        'backdrop-blur-sm',
        className
      )}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {icons.map((iconData) => (
        <CyberpunkIcon
          key={iconData.id}
          icon={iconData.icon}
          size={size}
          active={iconData.active}
          disabled={iconData.disabled}
          onClick={iconData.onClick}
        />
      ))}
    </div>
  );
};

export default CyberpunkIconGrid;