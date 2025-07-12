import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  FolderOpen, 
  Trash2, 
  Download, 
  Upload, 
  Home,
  Clock,
  User,
  Calendar,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  FileText,
  Settings
} from 'lucide-react';

interface SaveSlot {
  id: string;
  name: string;
  characterName: string;
  characterClass: string;
  level: number;
  playtime: number;
  saveDate: Date;
  gameState: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  screenshot?: string;
}

const SaveMenu: React.FC = () => {
  const { gameState, setGameMode, saveGame: saveGameToContext, loadGame: loadGameFromContext } = useGame();
  const [saveSlots, setSaveSlots] = useState<SaveSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [saveName, setSaveName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Load save slots from localStorage on component mount
  useEffect(() => {
    const savedSlots = localStorage.getItem('cyberpunk-save-slots');
    if (savedSlots) {
      try {
        const parsed = JSON.parse(savedSlots);
        setSaveSlots(parsed.map((slot: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
          ...slot,
          saveDate: new Date(slot.saveDate)
        })));
      } catch (error) {
        console.error('Error loading save slots:', error);
      }
    }

    // Load auto-save setting
    const autoSaveSetting = localStorage.getItem('cyberpunk-auto-save');
    if (autoSaveSetting) {
      setAutoSaveEnabled(JSON.parse(autoSaveSetting));
    }
  }, []);

  // Save slots to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cyberpunk-save-slots', JSON.stringify(saveSlots));
  }, [saveSlots]);

  // Auto-save setting
  useEffect(() => {
    localStorage.setItem('cyberpunk-auto-save', JSON.stringify(autoSaveEnabled));
  }, [autoSaveEnabled]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const formatPlaytime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const saveGame = (slotId?: string) => {
    if (!gameState.currentCharacter) {
      showNotification('error', 'No character selected to save');
      return;
    }

    // Save to game context first
    saveGameToContext(gameState);

    const currentTime = new Date();
    const saveId = slotId || `save_${Date.now()}`;
    const name = saveName || `${gameState.currentCharacter.name} - ${currentTime.toLocaleDateString()}`;
    
    const newSaveSlot: SaveSlot = {
      id: saveId,
      name,
      characterName: gameState.currentCharacter.name,
      characterClass: gameState.currentCharacter.class,
      level: gameState.currentCharacter.level,
      playtime: Math.floor(Math.random() * 300) + 30, // Mock playtime
      saveDate: currentTime,
      gameState: { ...gameState }
    };

    setSaveSlots(prev => {
      const existingIndex = prev.findIndex(slot => slot.id === saveId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newSaveSlot;
        return updated.sort((a, b) => b.saveDate.getTime() - a.saveDate.getTime());
      } else {
        return [newSaveSlot, ...prev].sort((a, b) => b.saveDate.getTime() - a.saveDate.getTime());
      }
    });

    setSaveName('');
    showNotification('success', `Game saved as "${name}"`);
  };

  const loadGame = (slot: SaveSlot) => {
    try {
      // Actually load the game state
      loadGameFromContext(slot.gameState);
      showNotification('success', `Loading "${slot.name}"...`);
      setTimeout(() => {
        setGameMode('lobby');
      }, 1000);
    } catch {
      showNotification('error', 'Failed to load game');
    }
  };

  const deleteSlot = (slotId: string) => {
    setSaveSlots(prev => prev.filter(slot => slot.id !== slotId));
    setShowDeleteConfirm(null);
    showNotification('success', 'Save slot deleted');
  };

  const exportSave = (slot: SaveSlot) => {
    const dataStr = JSON.stringify(slot, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `cyberpunk_save_${slot.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification('success', 'Save exported successfully');
  };

  const importSave = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSave = JSON.parse(e.target?.result as string);
        if (importedSave.id && importedSave.gameState) {
          const newSave = {
            ...importedSave,
            id: `imported_${Date.now()}`,
            saveDate: new Date()
          };
          setSaveSlots(prev => [newSave, ...prev]);
          showNotification('success', 'Save imported successfully');
        } else {
          showNotification('error', 'Invalid save file format');
        }
      } catch {
        showNotification('error', 'Failed to import save file');
      }
    };
    reader.readAsText(file);
  };

  const quickSave = () => {
    if (!gameState.currentCharacter) {
      showNotification('error', 'No character to save');
      return;
    }
    
    const quickSaveSlot = saveSlots.find(slot => slot.name.includes('Quick Save'));
    if (quickSaveSlot) {
      saveGame(quickSaveSlot.id);
    } else {
      setSaveName('Quick Save');
      saveGame();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-center mb-4">
            <motion.div
              className="bg-gradient-to-r from-cyan-400 to-blue-500 p-4 rounded-full"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Save className="w-12 h-12 text-white" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Save & Load</h1>
          <p className="text-gray-300 text-lg">Manage your cyberpunk adventure saves</p>
        </motion.div>

        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
                notification.type === 'success' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-red-600 text-white'
              }`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
            >
              <div className="flex items-center">
                {notification.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertTriangle className="w-5 h-5 mr-2" />
                )}
                {notification.message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-black/60 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Save Game</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter save name..."
                      value={saveName}
                      onChange={(e) => setSaveName(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <Button
                      onClick={() => saveGame()}
                      disabled={!gameState.currentCharacter}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                  <Button
                    onClick={quickSave}
                    disabled={!gameState.currentCharacter}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Quick Save
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Import/Export</h3>
                  <div className="space-y-2">
                    <label className="block">
                      <input
                        type="file"
                        accept=".json"
                        onChange={importSave}
                        className="hidden"
                      />
                      <Button
                        as="span"
                        className="w-full bg-purple-600 hover:bg-purple-700 cursor-pointer"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Import Save
                      </Button>
                    </label>
                    <Button
                      onClick={() => selectedSlot && exportSave(saveSlots.find(s => s.id === selectedSlot)!)}
                      disabled={!selectedSlot}
                      className="w-full bg-orange-600 hover:bg-orange-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Selected
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Settings</h3>
                  <div className="flex items-center justify-between">
                    <label className="text-gray-300">Auto-save</label>
                    <Button
                      onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
                      variant={autoSaveEnabled ? "default" : "outline"}
                      size="sm"
                    >
                      {autoSaveEnabled ? 'ON' : 'OFF'}
                    </Button>
                  </div>
                  <Button
                    onClick={() => setGameMode('lobby')}
                    className="w-full bg-gray-600 hover:bg-gray-700"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Back to Lobby
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save Slots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-black/60 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center">
                <FolderOpen className="w-5 h-5 mr-2" />
                Save Slots ({saveSlots.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {saveSlots.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No save files found</p>
                  <p className="text-sm">Create your first save to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {saveSlots.map((slot, index) => (
                    <motion.div
                      key={slot.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                        selectedSlot === slot.id 
                          ? 'border-cyan-400 bg-cyan-400/10' 
                          : 'border-gray-600 bg-gray-800/60 hover:border-gray-500'
                      }`}
                      onClick={() => setSelectedSlot(slot.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <User className="w-5 h-5 text-cyan-400 mr-2" />
                          <div>
                            <h3 className="text-white font-semibold text-sm">{slot.name}</h3>
                            <p className="text-gray-400 text-xs">
                              {slot.characterName} - {slot.characterClass}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-cyan-400 font-bold">Lv.{slot.level}</div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-xs text-gray-400">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatPlaytime(slot.playtime)}
                        </div>
                        <div className="flex items-center text-xs text-gray-400">
                          <Calendar className="w-3 h-3 mr-1" />
                          {slot.saveDate.toLocaleDateString()} {slot.saveDate.toLocaleTimeString()}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            loadGame(slot);
                          }}
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <FolderOpen className="w-3 h-3 mr-1" />
                          Load
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            exportSave(slot);
                          }}
                          size="sm"
                          variant="outline"
                          className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteConfirm(slot.id);
                          }}
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gray-900 border-2 border-red-500 rounded-lg p-6 max-w-md w-full mx-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="text-center">
                  <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Delete Save?</h3>
                  <p className="text-gray-300 mb-6">
                    Are you sure you want to delete this save slot? This action cannot be undone.
                  </p>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => setShowDeleteConfirm(null)}
                      variant="outline"
                      className="flex-1 border-gray-500 text-gray-300 hover:bg-gray-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => deleteSlot(showDeleteConfirm)}
                      className="flex-1 bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SaveMenu;