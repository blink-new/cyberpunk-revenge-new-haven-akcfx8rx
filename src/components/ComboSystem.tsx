import React, { useState, useEffect, useCallback } from 'react';

export interface ComboState {
  count: number;
  tier: ComboTier;
  multiplier: number;
  isActive: boolean;
  timeRemaining: number;
  maxTime: number;
}

export type ComboTier = 'NONE' | 'C' | 'B' | 'A' | 'S' | 'SS';

interface ComboSystemProps {
  onComboChange?: (combo: ComboState) => void;
  className?: string;
}

const COMBO_TIERS: Record<number, { tier: ComboTier; multiplier: number; color: string; glowColor: string }> = {
  0: { tier: 'NONE', multiplier: 1.0, color: '#ffffff', glowColor: '#ffffff' },
  5: { tier: 'C', multiplier: 1.2, color: '#22c55e', glowColor: '#16a34a' },
  10: { tier: 'B', multiplier: 1.5, color: '#3b82f6', glowColor: '#1d4ed8' },
  20: { tier: 'A', multiplier: 2.0, color: '#f59e0b', glowColor: '#d97706' },
  35: { tier: 'S', multiplier: 2.5, color: '#ef4444', glowColor: '#dc2626' },
  50: { tier: 'SS', multiplier: 3.0, color: '#a855f7', glowColor: '#7c3aed' }
};

const COMBO_DECAY_TIME = 120; // 2 seconds at 60fps

export const useComboSystem = () => {
  const [combo, setCombo] = useState<ComboState>({
    count: 0,
    tier: 'NONE',
    multiplier: 1.0,
    isActive: false,
    timeRemaining: 0,
    maxTime: COMBO_DECAY_TIME
  });

  // Get current tier based on combo count
  const getCurrentTier = useCallback((count: number) => {
    let currentTier = COMBO_TIERS[0];
    Object.keys(COMBO_TIERS).forEach(threshold => {
      const thresholdNum = parseInt(threshold);
      if (count >= thresholdNum) {
        currentTier = COMBO_TIERS[thresholdNum];
      }
    });
    return currentTier;
  }, []);

  // Add hit to combo
  const addHit = useCallback(() => {
    setCombo(prev => {
      const newCount = prev.count + 1;
      const tierData = getCurrentTier(newCount);
      
      return {
        count: newCount,
        tier: tierData.tier,
        multiplier: tierData.multiplier,
        isActive: true,
        timeRemaining: COMBO_DECAY_TIME,
        maxTime: COMBO_DECAY_TIME
      };
    });
  }, [getCurrentTier]);

  // Break combo
  const breakCombo = useCallback(() => {
    setCombo({
      count: 0,
      tier: 'NONE',
      multiplier: 1.0,
      isActive: false,
      timeRemaining: 0,
      maxTime: COMBO_DECAY_TIME
    });
  }, []);

  // Update combo timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (combo.isActive && combo.timeRemaining > 0) {
      interval = setInterval(() => {
        setCombo(prev => {
          const newTimeRemaining = Math.max(0, prev.timeRemaining - 1);
          
          if (newTimeRemaining <= 0) {
            // Combo broken
            return {
              count: 0,
              tier: 'NONE',
              multiplier: 1.0,
              isActive: false,
              timeRemaining: 0,
              maxTime: COMBO_DECAY_TIME
            };
          }
          
          return {
            ...prev,
            timeRemaining: newTimeRemaining
          };
        });
      }, 16); // ~60fps
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [combo.isActive, combo.timeRemaining]);

  return {
    combo,
    addHit,
    breakCombo,
    getDamageMultiplier: () => combo.multiplier,
    isComboActive: () => combo.isActive && combo.count > 0
  };
};

const ComboSystem: React.FC<ComboSystemProps> = ({ onComboChange, className = '' }) => {
  const { combo } = useComboSystem();

  useEffect(() => {
    if (onComboChange) {
      onComboChange(combo);
    }
  }, [combo, onComboChange]);

  if (!combo.isActive || combo.count === 0) {
    return null;
  }

  const tierData = COMBO_TIERS[Math.max(...Object.keys(COMBO_TIERS).map(Number).filter(t => combo.count >= t))];
  const timePercent = (combo.timeRemaining / combo.maxTime) * 100;

  return (
    <div className={`combo-display ${className}`}>
      {/* Combo Counter */}
      <div 
        className="combo-counter"
        style={{
          color: tierData.color,
          textShadow: `0 0 20px ${tierData.glowColor}, 0 0 40px ${tierData.glowColor}`,
          filter: `drop-shadow(0 0 10px ${tierData.glowColor})`
        }}
      >
        <div className="combo-text">
          <span className="combo-hits">{combo.count}</span>
          <span className="combo-label">HIT COMBO</span>
        </div>
        
        {/* Tier Display */}
        {combo.tier !== 'NONE' && (
          <div 
            className="combo-tier"
            style={{
              color: tierData.color,
              textShadow: `0 0 15px ${tierData.glowColor}`,
            }}
          >
            <span className="tier-badge">{combo.tier} RANK</span>
          </div>
        )}
        
        {/* Multiplier */}
        <div className="combo-multiplier">
          <span style={{ color: tierData.color }}>×{combo.multiplier.toFixed(1)}</span>
        </div>
      </div>
      
      {/* Combo Timer Bar */}
      <div className="combo-timer-container">
        <div 
          className="combo-timer-bar"
          style={{
            width: `${timePercent}%`,
            backgroundColor: tierData.color,
            boxShadow: `0 0 10px ${tierData.glowColor}`,
            transition: 'width 0.1s ease-out'
          }}
        />
        <div className="combo-timer-bg" />
      </div>
      
      {/* Combo Effects */}
      {combo.tier === 'SS' && (
        <div className="combo-effects">
          <div className="ss-glow" style={{ backgroundColor: tierData.glowColor }} />
          <div className="ss-particles">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="particle" 
                style={{
                  backgroundColor: tierData.color,
                  animationDelay: `${i * 0.1}s`
                }} 
              />
            ))}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .combo-display {
          position: fixed;
          top: 50px;
          right: 50px;
          z-index: 1000;
          font-family: 'Courier New', monospace;
          text-align: center;
          pointer-events: none;
        }
        
        .combo-counter {
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid currentColor;
          border-radius: 10px;
          padding: 15px 20px;
          margin-bottom: 10px;
          backdrop-filter: blur(10px);
          animation: comboGlow 0.5s ease-out;
        }
        
        .combo-text {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .combo-hits {
          font-size: 3rem;
          font-weight: bold;
          line-height: 1;
          margin-bottom: 5px;
          animation: comboNumber 0.3s ease-out;
        }
        
        .combo-label {
          font-size: 0.8rem;
          letter-spacing: 2px;
          opacity: 0.9;
        }
        
        .combo-tier {
          margin: 10px 0;
        }
        
        .tier-badge {
          font-size: 1.2rem;
          font-weight: bold;
          letter-spacing: 1px;
          padding: 5px 10px;
          border: 1px solid currentColor;
          border-radius: 5px;
          background: rgba(0, 0, 0, 0.5);
          animation: tierGlow 0.5s ease-out;
        }
        
        .combo-multiplier {
          font-size: 1.1rem;
          font-weight: bold;
          margin-top: 5px;
        }
        
        .combo-timer-container {
          position: relative;
          width: 200px;
          height: 8px;
          margin: 0 auto;
        }
        
        .combo-timer-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        
        .combo-timer-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          border-radius: 4px;
          z-index: 1;
        }
        
        .combo-effects {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        
        .ss-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          border-radius: 50%;
          opacity: 0.3;
          animation: ssGlow 2s ease-in-out infinite;
        }
        
        .ss-particles {
          position: relative;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          animation: particle 1s ease-out infinite;
        }
        
        .particle:nth-child(1) { transform: rotate(0deg) translateX(60px); }
        .particle:nth-child(2) { transform: rotate(45deg) translateX(60px); }
        .particle:nth-child(3) { transform: rotate(90deg) translateX(60px); }
        .particle:nth-child(4) { transform: rotate(135deg) translateX(60px); }
        .particle:nth-child(5) { transform: rotate(180deg) translateX(60px); }
        .particle:nth-child(6) { transform: rotate(225deg) translateX(60px); }
        .particle:nth-child(7) { transform: rotate(270deg) translateX(60px); }
        .particle:nth-child(8) { transform: rotate(315deg) translateX(60px); }
        
        @keyframes comboGlow {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes comboNumber {
          0% { transform: scale(0.5); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes tierGlow {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes ssGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.4; }
        }
        
        @keyframes particle {
          0% { opacity: 1; transform: rotate(var(--rotation)) translateX(40px) scale(1); }
          100% { opacity: 0; transform: rotate(var(--rotation)) translateX(80px) scale(0); }
        }
      `}</style>
    </div>
  );
};

export default ComboSystem;