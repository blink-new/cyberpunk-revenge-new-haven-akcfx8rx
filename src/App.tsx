import React from 'react';
import { GameProvider, useGame } from './contexts/GameContext';
import CyberpunkLobby from './components/CyberpunkLobby';
import CharacterSelect from './components/CharacterSelect';
import Game2D from './components/Game2D';
import LevelSelect from './components/LevelSelect';
import Inventory from './components/Inventory';
import SkillTree from './components/SkillTree';
import Shop from './components/Shop';
import TrainingRoom from './components/TrainingRoom';
import SaveMenu from './components/SaveMenu';

const GameRouter: React.FC = () => {
  const { gameState } = useGame();

  switch (gameState.gameMode) {
    case 'lobby':
      return <CyberpunkLobby />;
    case 'characterSelect':
      return <CharacterSelect />;
    case 'shop':
      return <Shop />;
    case 'inventory':
      return <Inventory />;
    case 'skillTree':
      return <SkillTree />;
    case 'levelSelect':
      return <LevelSelect />;
    case 'training':
      return <TrainingRoom />;
    case 'saveMenu':
      return <SaveMenu />;
    case 'game':
      return <Game2D />;
    default:
      return <CyberpunkLobby />;
  }
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-black">
        <GameRouter />
      </div>
    </GameProvider>
  );
};

export default App;