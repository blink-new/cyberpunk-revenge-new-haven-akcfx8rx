import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../contexts/GameContext';
import { GAME_LEVELS } from '../data/levels';
import PauseMenu from './PauseMenu';

const Game2D: React.FC = () => {
  const { gameState, setGameMode } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [currentLevelData] = useState(GAME_LEVELS[0]);

  const CANVAS_WIDTH = 1200;
  const CANVAS_HEIGHT = 600;

  // Input handling for pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle pause keys
      if (e.key === 'p' || e.key === 'P') {
        setPaused(!paused);
        return;
      }
      
      if (e.key === 'Escape') {
        if (paused) {
          setPaused(false);
        } else {
          setPaused(true);
        }
        return;
      }
      
      // Handle training room toggle
      if (e.key === 't' || e.key === 'T') {
        setGameMode('training');
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paused, setGameMode]);

  // Simple canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw simple cyberpunk background
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#1a0033');
    gradient.addColorStop(0.3, '#2d1b69');
    gradient.addColorStop(0.7, '#8b5cf6');
    gradient.addColorStop(1, '#4c1d95');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw simple player placeholder
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(100, 250, 32, 48);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 250, 32, 48);
    
    // Draw simple ground
    ctx.fillStyle = '#4c1d95';
    ctx.fillRect(0, 500, CANVAS_WIDTH, 100);
    
    // Draw UI text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Cyberpunk Game Demo', CANVAS_WIDTH / 2, 100);
    
    ctx.font = '16px monospace';
    ctx.fillText('Press P or ESC to pause • Press T for Training Room', CANVAS_WIDTH / 2, 140);
    
    if (paused) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = '#00ffff';
      ctx.font = 'bold 48px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('PAUSED', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    }
    
  }, [paused]);

  // Pause menu handlers
  const handleResume = () => {
    setPaused(false);
  };

  const handleRestartLevel = () => {
    setPaused(false);
    // Reset would happen here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-2 border-purple-500 rounded-lg shadow-2xl"
          style={{ imageRendering: 'pixelated' }}
        />
        
        {/* Game title overlay */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
          <h1 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            {currentLevelData.name}
          </h1>
          <p className="text-purple-300 text-sm">
            Level {currentLevelData.id} - {currentLevelData.environment.toUpperCase()} - {gameState.difficulty.toUpperCase()} MODE
          </p>
        </div>
      </div>
      
      {/* Character ability info */}
      <div className="mt-4 text-center">
        <div className="bg-gray-900 bg-opacity-80 rounded-lg p-4 mb-2">
          <h3 className="text-lg font-bold text-white mb-2">
            {gameState.currentCharacter?.class.toUpperCase() || 'SAMURAI'} ABILITIES
          </h3>
          <p className="text-purple-300 text-sm mb-2">
            Pause menu and Training Room integration demo
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm">
            <span className="text-blue-300">Press P to Pause</span>
            <span className="text-yellow-300">Press T for Training</span>
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-2 text-center text-purple-300">
        <p className="mb-2">🎮 {currentLevelData.name} - Demo Mode</p>
        <p>💫 P: Pause • T: Training Room • ESC: Pause Menu • Full game coming soon!</p>
      </div>

      {/* Pause Menu */}
      <PauseMenu
        isOpen={paused}
        onResume={handleResume}
        onRestart={handleRestartLevel}
      />
    </div>
  );
};

export default Game2D;