import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { CyberpunkPanel } from './ui/cyberpunk-panel';
import { CyberpunkIconGrid } from './ui/cyberpunk-icon-grid';
import { 
  User, 
  ShoppingCart, 
  Package, 
  Zap, 
  Target, 
  Sword, 
  Shield, 
  Heart, 
  Star,
  Settings,
  Save,
  Map,
  Trophy,
  Gamepad2,
  Skull,
  Crosshair,
  Flame,
  Orbit,
  Cpu,
  Database,
  Wifi,
  Battery,
  Eye,
  Radar,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Play,
  Pause,
  Square,
  Circle,
  Triangle,
  Hexagon
} from 'lucide-react';

const CyberpunkLobby: React.FC = () => {
  const { gameState, setGameMode } = useGame();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hackingProgress, setHackingProgress] = useState(0);
  const [systemStatus] = useState('ONLINE');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setHackingProgress(prev => (prev + 1) % 101);
    }, 100);
    return () => clearInterval(progressTimer);
  }, []);

  const decorativeIcons = [
    { id: 'user', icon: <User size={16} />, active: !!gameState.currentCharacter },
    { id: 'shield', icon: <Shield size={16} /> },
    { id: 'heart', icon: <Heart size={16} /> },
    { id: 'star', icon: <Star size={16} /> },
    { id: 'settings', icon: <Settings size={16} /> },
    { id: 'map', icon: <Map size={16} /> },
    { id: 'trophy', icon: <Trophy size={16} /> },
    { id: 'gamepad', icon: <Gamepad2 size={16} /> },
    { id: 'skull', icon: <Skull size={16} /> },
    { id: 'crosshair', icon: <Crosshair size={16} /> },
    { id: 'flame', icon: <Flame size={16} /> },
    { id: 'orbit', icon: <Orbit size={16} /> },
    { id: 'cpu', icon: <Cpu size={16} /> },
    { id: 'database', icon: <Database size={16} /> },
    { id: 'wifi', icon: <Wifi size={16} /> },
    { id: 'battery', icon: <Battery size={16} /> },
    { id: 'eye', icon: <Eye size={16} /> },
    { id: 'radar', icon: <Radar size={16} /> },
    { id: 'lock', icon: <Lock size={16} /> },
    { id: 'unlock', icon: <Unlock size={16} /> },
    { id: 'volume2', icon: <Volume2 size={16} /> },
    { id: 'volumex', icon: <VolumeX size={16} /> },
    { id: 'maximize', icon: <Maximize size={16} /> },
    { id: 'minimize', icon: <Minimize size={16} /> },
    { id: 'play', icon: <Play size={16} />, active: true },
    { id: 'pause', icon: <Pause size={16} /> },
    { id: 'square', icon: <Square size={16} /> },
    { id: 'circle', icon: <Circle size={16} /> },
    { id: 'triangle', icon: <Triangle size={16} /> },
    { id: 'hexagon', icon: <Hexagon size={16} /> }
  ];

  const mainActions = [
    {
      id: 'characterSelect',
      title: 'CHAR_SELECT',
      subtitle: 'Initialize Agent',
      icon: <User size={24} />,
      action: () => setGameMode('characterSelect'),
      color: 'from-cyan-500 to-blue-600',
      disabled: false
    },
    {
      id: 'shop',
      title: 'CYBER_SHOP',
      subtitle: 'Acquire Hardware',
      icon: <ShoppingCart size={24} />,
      action: () => setGameMode('shop'),
      color: 'from-purple-500 to-pink-600',
      disabled: !gameState.currentCharacter
    },
    {
      id: 'inventory',
      title: 'STORAGE',
      subtitle: 'Data Vault',
      icon: <Package size={24} />,
      action: () => setGameMode('inventory'),
      color: 'from-orange-500 to-red-600',
      disabled: !gameState.currentCharacter
    },
    {
      id: 'skills',
      title: 'AUGMENT',
      subtitle: 'Neural Upgrade',
      icon: <Zap size={24} />,
      action: () => setGameMode('skillTree'),
      color: 'from-green-500 to-emerald-600',
      disabled: !gameState.currentCharacter
    },
    {
      id: 'levels',
      title: 'MISSIONS',
      subtitle: 'Select Target',
      icon: <Target size={24} />,
      action: () => setGameMode('levelSelect'),
      color: 'from-indigo-500 to-purple-600',
      disabled: !gameState.currentCharacter
    },
    {
      id: 'saveMenu',
      title: 'SAVE_LOAD',
      subtitle: 'Data Management',
      icon: <Save size={24} />,
      action: () => setGameMode('saveMenu'),
      color: 'from-gray-500 to-slate-600',
      disabled: false
    },
    {
      id: 'deploy',
      title: 'DEPLOY',
      subtitle: 'Execute Protocol',
      icon: <Sword size={24} />,
      action: () => setGameMode('game'),
      color: 'from-red-500 to-pink-600',
      disabled: !gameState.currentCharacter
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-purple-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,0,128,0.1),transparent)] animate-pulse" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header System Bar */}
        <div className="flex justify-between items-center mb-6">
          <CyberpunkPanel variant="primary" className="flex-1 mr-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-cyan-300 text-sm font-mono">NEW_HAVEN_TERMINAL</div>
                <div className="text-gray-400 text-xs">
                  {currentTime.toLocaleString()} | STATUS: {systemStatus}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">ONLINE</span>
                </div>
                <div className="text-cyan-300 text-sm font-mono">
                  {gameState.currentCharacter ? 
                    `AGENT_${gameState.currentCharacter.name.toUpperCase()}` : 
                    'NO_AGENT'
                  }
                </div>
              </div>
            </div>
          </CyberpunkPanel>
          
          <CyberpunkPanel variant="secondary" className="w-48">
            <div className="text-center">
              <div className="text-purple-300 text-lg font-mono">2077</div>
              <div className="text-gray-400 text-xs">YEAR_ACTIVE</div>
            </div>
          </CyberpunkPanel>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-8xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            NEW HAVEN
          </h1>
          <div className="text-2xl text-cyan-300 font-mono tracking-wider">
            CYBERPUNK_REVENGE.EXE
          </div>
          <div className="text-gray-400 text-sm mt-2 max-w-2xl mx-auto">
            &gt; SHIMOTO_GANG.target_acquired | REVENGE_PROTOCOL.initiated
          </div>
        </div>

        {/* System Status Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Character Stats */}
          <CyberpunkPanel variant="primary">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-cyan-300 text-sm font-mono">AGENT_STATUS</span>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
              {gameState.currentCharacter ? (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>CLASS:</span>
                    <span className="text-cyan-300">{gameState.currentCharacter.class.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>LEVEL:</span>
                    <span className="text-green-400">{gameState.currentCharacter.level}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>CREDITS:</span>
                    <span className="text-yellow-400">{gameState.currentCharacter.credits}</span>
                  </div>
                </div>
              ) : (
                <div className="text-red-400 text-xs">NO_AGENT_SELECTED</div>
              )}
            </div>
          </CyberpunkPanel>

          {/* Mission Status */}
          <CyberpunkPanel variant="warning">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-yellow-300 text-sm font-mono">MISSION_DATA</span>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>TARGET:</span>
                  <span className="text-red-400">SHIMOTO_BOSS</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>LOCATION:</span>
                  <span className="text-yellow-400">MAKA_CITY</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>PROGRESS:</span>
                  <span className="text-green-400">{hackingProgress}%</span>
                </div>
              </div>
            </div>
          </CyberpunkPanel>

          {/* System Resources */}
          <CyberpunkPanel variant="danger">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-red-300 text-sm font-mono">SYS_RESOURCES</span>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>MEMORY:</span>
                  <span className="text-cyan-400">87%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>NEURAL:</span>
                  <span className="text-green-400">92%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>THREAT:</span>
                  <span className="text-red-400">HIGH</span>
                </div>
              </div>
            </div>
          </CyberpunkPanel>
        </div>

        {/* Icon Grid */}
        <div className="mb-8">
          <CyberpunkIconGrid
            icons={decorativeIcons}
            columns={10}
            size="sm"
            className="mx-auto max-w-2xl"
          />
        </div>

        {/* Main Action Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mainActions.map((action) => (
            <CyberpunkPanel
              key={action.id}
              variant={action.disabled ? 'default' : 'primary'}
              className={`cursor-pointer transition-all duration-300 ${
                action.disabled 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-105 hover:shadow-xl'
              }`}
              animated={!action.disabled}
            >
              <div 
                className="text-center space-y-4"
                onClick={action.disabled ? undefined : action.action}
              >
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${action.color}`}>
                  {action.icon}
                </div>
                <div>
                  <div className="text-cyan-300 text-lg font-mono">{action.title}</div>
                  <div className="text-gray-400 text-sm">{action.subtitle}</div>
                </div>
              </div>
            </CyberpunkPanel>
          ))}
        </div>

        {/* Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CyberpunkPanel variant="secondary">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-purple-300">HACKING_PROGRESS</span>
                <span className="text-cyan-300">{hackingProgress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-100"
                  style={{ width: `${hackingProgress}%` }}
                />
              </div>
            </div>
          </CyberpunkPanel>

          <CyberpunkPanel variant="primary">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-cyan-300">SYSTEM_INTEGRITY</span>
                <span className="text-green-400">94%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full"
                  style={{ width: '94%' }}
                />
              </div>
            </div>
          </CyberpunkPanel>
        </div>
      </div>
    </div>
  );
};

export default CyberpunkLobby;