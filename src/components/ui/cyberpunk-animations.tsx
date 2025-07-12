import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CyberpunkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  glowColor?: string;
}

export const CyberpunkButton: React.FC<CyberpunkButtonProps> = ({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  glowColor
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
    secondary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    danger: 'bg-gradient-to-r from-red-500 to-orange-500 text-white',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-md',
    lg: 'px-8 py-4 text-lg',
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <motion.button
      className={cn(
        'relative overflow-hidden font-semibold rounded-lg transition-all duration-300',
        'border-2 border-transparent hover:border-current',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        boxShadow: isHovered
          ? `0 0 20px ${glowColor || (variant === 'primary' ? '#00ffff' : '#ff00ff')}`
          : 'none',
      }}
    >
      {/* Animated background overlay */}
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ x: '-100%' }}
        animate={isHovered ? { x: '100%' } : { x: '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      
      {/* Glow effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(circle at center, ${glowColor || '#00ffff'}20, transparent)`,
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-current opacity-50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-current opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-current opacity-50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-current opacity-50" />
    </motion.button>
  );
};

interface CyberpunkCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export const CyberpunkCard: React.FC<CyberpunkCardProps> = ({
  children,
  className,
  glowColor = '#00ffff',
  hoverable = false,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        'relative bg-black/90 backdrop-blur-sm border-2 border-gray-600 rounded-lg overflow-hidden',
        hoverable && 'cursor-pointer transition-all duration-300',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={hoverable ? { scale: 1.02 } : {}}
      style={{
        boxShadow: isHovered
          ? `0 0 30px ${glowColor}40, inset 0 0 30px ${glowColor}10`
          : `0 0 10px ${glowColor}20`,
        borderColor: isHovered ? glowColor : '#4B5563',
      }}
    >
      {/* Content */}
      <div className="relative z-10 p-4">
        {children}
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-current opacity-30" />
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-current opacity-30" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-current opacity-30" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-current opacity-30" />
    </motion.div>
  );
};

interface HologramTextProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  glitchEffect?: boolean;
}

export const HologramText: React.FC<HologramTextProps> = ({
  children,
  className,
  color = '#00ffff',
  glitchEffect = false
}) => {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    if (glitchEffect) {
      const interval = setInterval(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 100);
      }, 3000 + Math.random() * 2000);
      
      return () => clearInterval(interval);
    }
  }, [glitchEffect]);

  return (
    <motion.div
      className={cn(
        'relative inline-block',
        glitchActive && 'animate-pulse',
        className
      )}
      style={{
        color,
        textShadow: glitchActive
          ? `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}, 2px 0 0 #ff0000, -2px 0 0 #0000ff`
          : `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}`,
      }}
    >
      {children}
      
      {/* Scanlines effect */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            ${color}20 2px,
            ${color}20 4px
          )`,
        }}
      />
    </motion.div>
  );
};

interface ParticleFieldProps {
  count?: number;
  className?: string;
  color?: string;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 50,
  className,
  color = '#00ffff'
}) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5,
  }));

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: color,
            boxShadow: `0 0 ${particle.size * 2}px ${color}`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

interface CyberpunkProgressBarProps {
  value: number;
  max: number;
  className?: string;
  color?: string;
  label?: string;
  animated?: boolean;
}

export const CyberpunkProgressBar: React.FC<CyberpunkProgressBarProps> = ({
  value,
  max,
  className,
  color = '#00ffff',
  label,
  animated = true
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('relative w-full', className)}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          <span className="text-sm font-medium text-white">{value}/{max}</span>
        </div>
      )}
      
      <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-600">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              ${color}20,
              ${color}20 4px,
              transparent 4px,
              transparent 8px
            )`,
          }}
        />
        
        {/* Progress fill */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 10px ${color}80`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 1 : 0, ease: 'easeInOut' }}
        />
        
        {/* Animated highlight */}
        <motion.div
          className="absolute top-0 left-0 h-full w-full rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Glowing edge */}
        <div
          className="absolute top-0 right-0 h-full w-1 rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 6px ${color}`,
            left: `${percentage}%`,
            transform: 'translateX(-50%)',
          }}
        />
      </div>
    </div>
  );
};