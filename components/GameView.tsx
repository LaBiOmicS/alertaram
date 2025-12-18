
import React, { useState, useEffect, useRef } from 'react';
import { Shield, Pill, Droplets, Play, RefreshCw, ShieldAlert, Zap, Syringe, HeartPulse, BookOpen, FlaskConical, Trophy, CheckCircle2, Smile, Meh, Frown, Skull, AlertTriangle } from 'lucide-react';

type EntityType = 'empty' | 'bacteria_pos' | 'bacteria_neg' | 'virus' | 'superbug';

interface GridSlot {
  id: number;
  type: EntityType;
  health: number;
}

interface FloatingText {
  id: number;
  text: string;
  type: 'good' | 'bad' | 'info' | 'combo';
  x: number;
  y: number;
}

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  maxLevel: number;
  icon: React.ReactNode;
  effect: (val: number) => number;
}

interface GameEvent {
  id: string;
  title: string;
  description: string;
  type: 'positive' | 'negative';
  duration: number;
}

interface LevelConfig {
  day: number;
  title: string;
  description: string;
  duration: number; // seconds to survive
  allowedTypes: EntityType[];
  spawnRateMod: number;
  winCondition: string;
  initialSpawns: number; // How many enemies start on grid
}

const LEVELS: LevelConfig[] = [
  {
    day: 1,
    title: "Dia 1: O Início",
    description: "Bactérias comuns (Gram+) foram detectadas. Use o antibiótico Roxo. Seja rápido!",
    duration: 30,
    allowedTypes: ['bacteria_pos'],
    spawnRateMod: 0.8, // Reduced from 1.0
    winCondition: "Sobreviva 30s",
    initialSpawns: 2 
  },
  {
    day: 2,
    title: "Dia 2: Complexidade",
    description: "Bactérias Gram- (Rosa) apareceram. Elas precisam de tratamento diferente!",
    duration: 40,
    allowedTypes: ['bacteria_pos', 'bacteria_neg'],
    spawnRateMod: 1.0, // Reduced from 1.2
    winCondition: "Sobreviva 40s",
    initialSpawns: 3 
  },
  {
    day: 3,
    title: "Dia 3: Temporada de Gripe",
    description: "Vírus detectados! NÃO use antibióticos neles. Use Vacinas (Amarelo).",
    duration: 50,
    allowedTypes: ['bacteria_pos', 'bacteria_neg', 'virus'],
    spawnRateMod: 1.2, // Reduced from 1.4
    winCondition: "Sobreviva 50s",
    initialSpawns: 3 // Reduced from 4
  },
  {
    day: 4,
    title: "Dia 4: Ameaça Invisível",
    description: "A resistência subiu. Superbactérias (Vermelhas) imunes a tudo surgiram. Use Higiene!",
    duration: 60,
    allowedTypes: ['bacteria_pos', 'bacteria_neg', 'virus', 'superbug'],
    spawnRateMod: 1.4, // Reduced from 1.6
    winCondition: "Sobreviva 60s",
    initialSpawns: 4 // Reduced from 5
  },
  {
    day: 5,
    title: "Dia 5: Pandemia Global",
    description: "Caos total. Use tudo o que aprendeu. Gestão de crise máxima!",
    duration: 60,
    allowedTypes: ['bacteria_pos', 'bacteria_neg', 'virus', 'superbug'],
    spawnRateMod: 1.8,
    winCondition: "Sobreviva 60s",
    initialSpawns: 5 // Reduced from 6
  }
];

export const GameView: React.FC = () => {
  const GRID_SIZE = 25; // 5x5 Grid
  const [grid, setGrid] = useState<GridSlot[]>([]);
  const [selectedTool, setSelectedTool] = useState<'antibiotic_pos' | 'antibiotic_neg' | 'hygiene' | 'vaccine'>('antibiotic_pos');
  const [score, setScore] = useState(0);
  const [researchPoints, setResearchPoints] = useState(0);
  const [infection, setInfection] = useState(0);
  const [resistance, setResistance] = useState(0);
  
  // Game Flow States
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [levelTimeLeft, setLevelTimeLeft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState<'infection' | 'resistance'>('infection');
  const [isPaused, setIsPaused] = useState(false);
  const [showLab, setShowLab] = useState(false);
  const [screenShake, setScreenShake] = useState(false);

  // FX
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [activeEvent, setActiveEvent] = useState<GameEvent | null>(null);
  
  // Stats
  const [energy, setEnergy] = useState(0);
  const [combo, setCombo] = useState(0);
  const [cooldowns, setCooldowns] = useState({ antibiotic_pos: 0, antibiotic_neg: 0, vaccine: 0, hygiene: 0 });

  // Upgrades
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    {
      id: 'diagnostics',
      name: 'Diagnóstico Rápido',
      description: 'Reduz o tempo de recarga das ferramentas em 20%.',
      cost: 150,
      level: 0,
      maxLevel: 3,
      icon: <Zap size={18} />,
      effect: (baseCooldown) => baseCooldown * 0.8
    },
    {
      id: 'education',
      name: 'Educação Pública',
      description: 'Reduz o ganho de resistência ao errar em 30%.',
      cost: 200,
      level: 0,
      maxLevel: 3,
      icon: <BookOpen size={18} />,
      effect: (baseResistance) => baseResistance * 0.7
    },
    {
      id: 'surveillance',
      name: 'Vigilância Sanitária',
      description: 'Retarda a propagação da infecção.',
      cost: 300,
      level: 0,
      maxLevel: 2,
      icon: <Shield size={18} />,
      effect: (spreadChance) => spreadChance * 0.5
    }
  ]);

  const stateRef = useRef({
    grid: [] as GridSlot[],
    score: 0,
    infection: 0,
    resistance: 0,
    isPlaying: false,
    gameOver: false,
    levelComplete: false,
    gameWon: false,
    isPaused: false,
    energy: 0,
    selectedTool: 'antibiotic_pos' as 'antibiotic_pos' | 'antibiotic_neg' | 'hygiene' | 'vaccine',
    activeEvent: null as GameEvent | null,
    upgrades: [] as Upgrade[],
    currentLevelIdx: 0,
    levelTimeLeft: 0
  });

  useEffect(() => {
    stateRef.current = { 
      grid, score, infection, resistance, isPlaying, gameOver, levelComplete, gameWon, isPaused, energy, selectedTool, activeEvent, upgrades, currentLevelIdx, levelTimeLeft
    };
  }, [grid, score, infection, resistance, isPlaying, gameOver, levelComplete, gameWon, isPaused, energy, selectedTool, activeEvent, upgrades, currentLevelIdx, levelTimeLeft]);

  // Level Timer & Progression
  useEffect(() => {
    if (!isPlaying || isPaused || gameOver || levelComplete) return;

    const timer = setInterval(() => {
      setLevelTimeLeft(prev => {
        if (prev <= 1) {
          // Level Won Logic
          setIsPlaying(false);
          if (currentLevelIdx >= LEVELS.length - 1) {
            setGameWon(true);
          } else {
            setLevelComplete(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, isPaused, gameOver, levelComplete, currentLevelIdx]);

  // Initialize
  useEffect(() => {
    resetGame(true);
  }, []);

  const triggerShake = () => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 500);
  };

  const generateEnemies = (count: number, allowedTypes: EntityType[]) => {
    const spawns: {index: number, type: EntityType}[] = [];
    const availableSlots = Array.from({length: GRID_SIZE}, (_, i) => i);
    
    for(let i=0; i<count; i++) {
        if (availableSlots.length === 0) break;
        const randIndex = Math.floor(Math.random() * availableSlots.length);
        const slotId = availableSlots.splice(randIndex, 1)[0];
        
        // Pick random type from allowed
        const type = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
        spawns.push({index: slotId, type});
    }
    return spawns;
  };

  const resetGame = (fullReset = false) => {
    // Determine initial grid state
    const levelConfig = LEVELS[fullReset ? 0 : currentLevelIdx];
    const initialSpawns = generateEnemies(levelConfig.initialSpawns, levelConfig.allowedTypes);
    
    const newGrid = Array.from({ length: GRID_SIZE }, (_, i) => {
      const spawn = initialSpawns.find(s => s.index === i);
      return {
        id: i,
        type: spawn ? spawn.type : 'empty' as EntityType,
        health: 100
      };
    });

    setGrid(newGrid);
    
    if (fullReset) {
        setInfection(0);
        setResistance(0);
        setScore(0);
        setResearchPoints(0);
        setCurrentLevelIdx(0);
        setLevelTimeLeft(LEVELS[0].duration);
        setUpgrades(prev => prev.map(u => ({...u, level: 0})));
    } else {
        // Retry level: Reset infection for fairness on retry
        setInfection(0);
        // Do not reset resistance completely, but maybe punish slightly less? No, keep resistance as is for challenge.
        setLevelTimeLeft(LEVELS[currentLevelIdx].duration);
    }

    setGameOver(false);
    setLevelComplete(false);
    setGameWon(false);
    setFloatingTexts([]);
    setIsPlaying(false);
    setIsPaused(false);
    setEnergy(0);
    setCombo(0);
    setActiveEvent(null);
    setCooldowns({ antibiotic_pos: 0, antibiotic_neg: 0, vaccine: 0, hygiene: 0 });
  };

  const startNextLevel = () => {
    const nextIdx = currentLevelIdx + 1;
    setCurrentLevelIdx(nextIdx);
    setLevelTimeLeft(LEVELS[nextIdx].duration);
    setLevelComplete(false);
    setIsPlaying(true);
    
    // Create new grid BUT populate it immediately
    // IMPORTANT: We do NOT reset infection here. It carries over!
    const levelConfig = LEVELS[nextIdx];
    const initialSpawns = generateEnemies(levelConfig.initialSpawns, levelConfig.allowedTypes);
    
    const newGrid = Array.from({ length: GRID_SIZE }, (_, i) => {
      const spawn = initialSpawns.find(s => s.index === i);
      return {
        id: i,
        type: spawn ? spawn.type : 'empty' as EntityType,
        health: 100
      };
    });
    
    setGrid(newGrid);
  };

  const togglePause = () => setIsPaused(!isPaused);

  const spawnFloatingText = (text: string, type: 'good' | 'bad' | 'info' | 'combo', index: number) => {
    const row = Math.floor(index / 5);
    const col = index % 5;
    const newText: FloatingText = {
      id: Date.now() + Math.random(),
      text,
      type,
      x: col, 
      y: row 
    };
    setFloatingTexts(prev => [...prev, newText]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== newText.id));
    }, 1500);
  };

  const buyUpgrade = (upgradeId: string) => {
    const upgradeIndex = upgrades.findIndex(u => u.id === upgradeId);
    if (upgradeIndex === -1) return;
    const upgrade = upgrades[upgradeIndex];
    if (researchPoints >= upgrade.cost && upgrade.level < upgrade.maxLevel) {
      setResearchPoints(prev => prev - upgrade.cost);
      const newUpgrades = [...upgrades];
      newUpgrades[upgradeIndex] = { ...upgrade, level: upgrade.level + 1, cost: Math.round(upgrade.cost * 1.5) };
      setUpgrades(newUpgrades);
      spawnFloatingText("UPGRADE ADQUIRIDO!", "good", 12);
    }
  };

  const triggerRandomEvent = () => {
    const events: GameEvent[] = [
      { id: 'fake_news', title: 'Fake News Viraliza', description: 'Automedicação aumentou! Resistência sobe mais rápido.', type: 'negative', duration: 12 },
      { id: 'outbreak', title: 'Surto em Escola', description: 'Vírus se espalhando em dobro! Cuidado!', type: 'negative', duration: 10 },
      { id: 'funding', title: 'Verba para Ciência', description: 'Investimento liberado! Pontos de pesquisa dobrados.', type: 'positive', duration: 15 },
      { id: 'awareness', title: 'Campanha de Vacinação', description: 'Comunidade protegida. Propagação desacelerada.', type: 'positive', duration: 15 },
      { id: 'superbug_alert', title: 'Alerta Hospitalar', description: 'Surtos de Superbactérias detectados em várias alas!', type: 'negative', duration: 8 },
    ];
    
    // Only trigger if level allows enough complexity
    if (currentLevelIdx < 1) return; 

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    setActiveEvent(randomEvent);
    setTimeout(() => {
      setActiveEvent(prev => prev?.id === randomEvent.id ? null : prev);
    }, randomEvent.duration * 1000);
  };

  // Event Loop
  useEffect(() => {
    if (!isPlaying || isPaused || gameOver || levelComplete) return;
    const eventTimer = setInterval(triggerRandomEvent, 20000); // More frequent events
    return () => clearInterval(eventTimer);
  }, [isPlaying, isPaused, gameOver, levelComplete]);

  // Main Game Loop
  useEffect(() => {
    if (!isPlaying || isPaused || gameOver || levelComplete) return;

    const loop = setInterval(() => {
      const { grid, resistance, score, infection, activeEvent, upgrades, currentLevelIdx } = stateRef.current;
      const currentLevel = LEVELS[currentLevelIdx];
      
      let newGrid = [...grid];
      let newInfection = infection;
      
      // Upgrade Effects
      const surveillanceLevel = upgrades.find(u => u.id === 'surveillance')?.level || 0;
      const spreadMultiplier = Math.pow(0.5, surveillanceLevel); 

      // Event Multipliers
      let spawnRateMultiplier = 1;
      if (activeEvent?.id === 'outbreak') spawnRateMultiplier = 2;
      if (activeEvent?.id === 'superbug_alert') spawnRateMultiplier = 1.5;

      // Spawn Logic
      const baseSpawnChance = 0.08; // Reduced from 0.12 for better pacing
      const spawnChance = (baseSpawnChance * currentLevel.spawnRateMod * spawnRateMultiplier) + (score * 0.0001);
      
      if (Math.random() < spawnChance) {
        const emptySlots = newGrid.filter(s => s.type === 'empty');
        if (emptySlots.length > 0) {
          const randomSlot = emptySlots[Math.floor(Math.random() * emptySlots.length)];
          
          // Determine spawn type based on Level Allowed Types and Probability
          const allowed = currentLevel.allowedTypes;
          const superbugAllowed = allowed.includes('superbug');
          const virusAllowed = allowed.includes('virus');
          const negAllowed = allowed.includes('bacteria_neg');

          let spawnType: EntityType = 'bacteria_pos';
          const roll = Math.random();
          
          let superbugChance = superbugAllowed ? (0.02 + (resistance / 300)) : 0;
          if (activeEvent?.id === 'superbug_alert') superbugChance += 0.2;

          if (superbugAllowed && roll > (1 - superbugChance)) {
            spawnType = 'superbug';
          } else if (virusAllowed && roll < 0.3) {
            spawnType = 'virus';
          } else if (negAllowed && roll < 0.6) {
            spawnType = 'bacteria_neg';
          } else {
            spawnType = 'bacteria_pos';
          }

          if (allowed.includes(spawnType)) {
             newGrid[randomSlot.id] = { ...randomSlot, type: spawnType };
          }
        }
      }

      // Spread Logic
      const germCount = newGrid.filter(s => s.type !== 'empty').length;
      if (germCount > 0) {
        let spreadFactor = 0.12; 
        if (activeEvent?.id === 'awareness') spreadFactor = 0.05;

        newInfection += (germCount * spreadFactor * spreadMultiplier);
        
        // Spread to neighbors (Contagion)
        newGrid.forEach((slot, idx) => {
          if (slot.type !== 'empty' && Math.random() < (0.05 * spreadMultiplier)) {
            const neighbors = [idx - 5, idx + 5, idx % 5 !== 0 ? idx - 1 : -1, idx % 5 !== 4 ? idx + 1 : -1]
              .filter(n => n >= 0 && n < GRID_SIZE && newGrid[n].type === 'empty');
            
            if (neighbors.length > 0) {
              const target = neighbors[Math.floor(Math.random() * neighbors.length)];
              newGrid[target] = { ...newGrid[target], type: slot.type };
            }
          }
        });
      }

      // Check Game Over State IMMEDIATELY inside loop
      if (newInfection >= 100) {
          setInfection(100);
          setGameOverReason('infection');
          setGameOver(true);
          setIsPlaying(false);
          triggerShake();
          clearInterval(loop);
          return;
      }

      if (resistance >= 100) {
        setResistance(100);
        setGameOverReason('resistance');
        setGameOver(true);
        setIsPlaying(false);
        triggerShake();
        clearInterval(loop);
        return;
      }

      setGrid(newGrid);
      setInfection(newInfection);

    }, 500);

    return () => clearInterval(loop);
  }, [isPlaying, isPaused, gameOver, levelComplete]);

  const switchTool = (tool: 'antibiotic_pos' | 'antibiotic_neg' | 'hygiene' | 'vaccine') => {
    setSelectedTool(tool);
  };

  const activateSpecial = () => {
    if (energy < 100) return;
    setEnergy(0);
    setInfection(prev => Math.max(0, prev - 40));
    setResistance(prev => Math.max(0, prev - 20));
    setGrid(prev => prev.map(slot => {
      if (slot.type === 'superbug' || (slot.type !== 'empty' && Math.random() > 0.5)) return { ...slot, type: 'empty' as EntityType };
      return slot;
    }));
    spawnFloatingText("INTERVENÇÃO ONE HEALTH!", "combo", 12);
    triggerShake();
  };

  const handleSlotClick = (index: number) => {
    if (!isPlaying || isPaused || gameOver || levelComplete) return;
    
    if (cooldowns[selectedTool] > 0) {
      spawnFloatingText("Carregando...", "info", index);
      return;
    }

    const slot = grid[index];
    if (slot.type === 'empty') return;

    const { upgrades, activeEvent } = stateRef.current;
    const diagnosticsLevel = upgrades.find(u => u.id === 'diagnostics')?.level || 0;
    const educationLevel = upgrades.find(u => u.id === 'education')?.level || 0;
    
    const cooldownMultiplier = Math.pow(0.8, diagnosticsLevel);
    const resistancePenaltyMultiplier = Math.pow(0.7, educationLevel);

    const baseTime = selectedTool === 'hygiene' ? 200 : 500;
    const cooldownTime = baseTime * cooldownMultiplier;
    
    setCooldowns(prev => ({ ...prev, [selectedTool]: Date.now() + cooldownTime }));
    setTimeout(() => setCooldowns(prev => ({ ...prev, [selectedTool]: 0 })), cooldownTime);

    let newGrid = [...grid];
    let scoreChange = 0;
    let researchChange = 0;
    let resistanceChange = 0;
    let infectionChange = 0;
    let energyChange = 0;
    let hitSuccess = false;

    const isFundingEvent = activeEvent?.id === 'funding';
    const isFakeNewsEvent = activeEvent?.id === 'fake_news';

    // Interaction Logic
    if (selectedTool === 'antibiotic_pos') {
      if (slot.type === 'bacteria_pos') {
        newGrid[index] = { ...slot, type: 'empty' };
        scoreChange = 10 + (combo * 2);
        researchChange = isFundingEvent ? 10 : 5;
        infectionChange = -2;
        energyChange = 10;
        hitSuccess = true;
        spawnFloatingText("Gram+ Eliminada", "good", index);
      } else {
        resistanceChange = 15 * resistancePenaltyMultiplier;
        energyChange = -10;
        hitSuccess = false;
        spawnFloatingText("Erro! Resistência Up", "bad", index);
      }
    } else if (selectedTool === 'antibiotic_neg') {
      if (slot.type === 'bacteria_neg') {
        newGrid[index] = { ...slot, type: 'empty' };
        scoreChange = 15 + (combo * 2);
        researchChange = isFundingEvent ? 12 : 6;
        infectionChange = -2;
        energyChange = 12;
        hitSuccess = true;
        spawnFloatingText("Gram- Eliminada", "good", index);
      } else {
        resistanceChange = 15 * resistancePenaltyMultiplier;
        energyChange = -10;
        hitSuccess = false;
        spawnFloatingText("Erro! Resistência Up", "bad", index);
      }
    } else if (selectedTool === 'hygiene') {
       newGrid[index] = { ...slot, type: 'empty' };
       scoreChange = slot.type === 'superbug' ? 40 : 5;
       researchChange = slot.type === 'superbug' ? (isFundingEvent ? 40 : 20) : 1;
       energyChange = slot.type === 'superbug' ? 20 : 2;
       hitSuccess = true;
       spawnFloatingText(slot.type === 'superbug' ? "Superbactéria Eliminada!" : "Limpo", "good", index);
    } else if (selectedTool === 'vaccine') {
       if (slot.type === 'virus') {
         newGrid[index] = { ...slot, type: 'empty' };
         scoreChange = 20 + (combo * 2);
         researchChange = isFundingEvent ? 16 : 8;
         energyChange = 15;
         hitSuccess = true;
         spawnFloatingText("Vírus Prevenido", "good", index);
       } else {
         energyChange = -5;
         hitSuccess = false;
         spawnFloatingText("Ineficaz aqui", "info", index);
       }
    }

    if (isFakeNewsEvent && resistanceChange > 0) resistanceChange *= 1.5;

    if (hitSuccess) {
      setCombo(c => c + 1);
    } else {
      setCombo(0);
      triggerShake();
    }
    
    setGrid(newGrid);
    setScore(s => s + scoreChange);
    setResearchPoints(rp => rp + researchChange);
    setEnergy(e => Math.min(100, Math.max(0, e + energyChange)));
    setResistance(r => Math.min(100, r + resistanceChange));
    setInfection(i => Math.max(0, Math.min(100, i + infectionChange)));
  };

  const getPatientStatus = () => {
    if (infection < 30) return { 
      icon: <Smile size={24} className="text-emerald-500" />, 
      label: 'Estável', 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50',
      pulse: 'animate-none'
    };
    if (infection < 60) return { 
      icon: <Meh size={24} className="text-yellow-500" />, 
      label: 'Alerta', 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-50',
      pulse: 'animate-pulse'
    };
    if (infection < 85) return { 
      icon: <Frown size={24} className="text-orange-500" />, 
      label: 'Febril', 
      color: 'text-orange-600', 
      bg: 'bg-orange-50',
      pulse: 'animate-pulse' 
    };
    return { 
      icon: <Skull size={24} className="text-red-600" />, 
      label: 'CRÍTICO', 
      color: 'text-red-700', 
      bg: 'bg-red-50',
      pulse: 'animate-bounce' 
    };
  };

  const patientStatus = getPatientStatus();
  const urgencyClass = infection > 70 ? 'bg-red-900/10' : '';
  const shakeClass = screenShake ? 'animate-[shake_0.5s_cubic-bezier(.36,.07,.19,.97)_both]' : '';

  const availableUpgrade = upgrades.some(u => researchPoints >= u.cost && u.level < u.maxLevel);
  const activeUpgrades = upgrades.filter(u => u.level > 0);

  return (
    <div className={`w-full h-[calc(100vh-64px)] overflow-hidden animate-fade-in transition-colors duration-1000 ${urgencyClass} ${shakeClass} relative flex flex-col font-sans bg-slate-50`}>
      
      {/* Research Lab Modal */}
      {showLab && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 border border-slate-700 shadow-2xl">
            <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <FlaskConical className="text-cyan-400" size={32} />
                Laboratório de Pesquisa
              </h2>
              <div className="bg-slate-900 px-6 py-3 rounded-xl border border-cyan-500/30">
                <span className="text-cyan-400 font-mono font-bold text-xl">{researchPoints} Pontos</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {upgrades.map((upgrade) => (
                <div key={upgrade.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all group relative overflow-hidden">
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="p-3 bg-slate-800 rounded-xl text-cyan-400 group-hover:text-white group-hover:bg-cyan-600 transition-colors shadow-lg">
                      {upgrade.icon}
                    </div>
                    <div className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded">
                      Lvl {upgrade.level}/{upgrade.maxLevel}
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 relative z-10">{upgrade.name}</h3>
                  <p className="text-slate-400 text-sm mb-6 min-h-[40px] relative z-10 leading-relaxed">{upgrade.description}</p>
                   <button
                    onClick={() => buyUpgrade(upgrade.id)}
                    disabled={researchPoints < upgrade.cost || upgrade.level >= upgrade.maxLevel}
                    className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all relative z-10
                      ${researchPoints >= upgrade.cost && upgrade.level < upgrade.maxLevel
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg' 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'}`}
                  >
                    {upgrade.level >= upgrade.maxLevel ? 'MAXIMIZADO' : `Pesquisar (${upgrade.cost})`} 
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button 
                onClick={() => setShowLab(false)}
                className="px-10 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg"
              >
                Voltar ao Jogo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP HEADER */}
      <div className="flex shrink-0 items-center justify-between px-3 py-2 bg-white border-b border-slate-200 z-30 shadow-sm h-14 md:h-16">
         {/* Left: Identity */}
         <div className="flex items-center gap-2">
           <h2 className="text-lg font-black text-slate-800 hidden md:block">DEFESA ONE HEALTH</h2>
           <h2 className="text-lg font-black text-slate-800 md:hidden">DOH</h2>
           <div className="h-4 w-px bg-slate-300 mx-2"></div>
           <div className="flex flex-col">
             <span className="text-[10px] text-slate-400 font-bold uppercase leading-none">Nível</span>
             <span className="text-xs font-bold text-brand-600 leading-none truncate max-w-[100px]">{LEVELS[currentLevelIdx].title.split(':')[1]}</span>
           </div>
           
           {/* Active Buffs Indicators */}
           <div className="hidden sm:flex items-center gap-1 ml-4">
             {activeUpgrades.map(u => (
               <div key={u.id} className="p-1 bg-cyan-50 rounded text-cyan-600" title={`${u.name}: Ativo`}>
                 {React.cloneElement(u.icon as React.ReactElement, { size: 14 })}
               </div>
             ))}
           </div>
         </div>

         {/* Center: Vital Stats */}
         <div className="flex items-center gap-4 flex-1 justify-center max-w-md px-2">
            <div className="flex-1">
               <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-0.5">
                 <span>Infecção</span>
                 <span className={infection > 80 ? "text-red-600 animate-pulse" : ""}>{Math.round(infection)}%</span>
               </div>
               <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200">
                  <div className={`h-full transition-all duration-300 ${infection > 70 ? 'bg-red-600' : 'bg-brand-500'}`} style={{ width: `${infection}%` }}></div>
               </div>
            </div>
            <div className="flex-1"> {/* Removed hidden sm:block to show on mobile */}
               <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-0.5">
                 <span>Resistência</span>
                 <span className={resistance > 80 ? "text-purple-600 animate-pulse" : ""}>{Math.round(resistance)}%</span>
               </div>
               <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200">
                  <div className={`h-full bg-purple-600 transition-all duration-300 ${resistance >= 100 ? 'bg-slate-900' : ''}`} style={{ width: `${resistance}%` }}></div>
               </div>
            </div>
         </div>

         {/* Right: Controls & Timer */}
         <div className="flex items-center gap-2">
           {isPlaying && !gameOver && (
             <div className="font-mono font-bold text-lg text-slate-800">
               00:{levelTimeLeft.toString().padStart(2, '0')}
             </div>
           )}
           <button onClick={() => resetGame(true)} className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200" title="Reiniciar Jogo">
             <RefreshCw size={18} />
           </button>
           
           <button 
             onClick={() => setShowLab(true)} 
             className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${availableUpgrade ? 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100' : 'bg-slate-900 text-cyan-400 hover:bg-slate-800 border-slate-900'}`}
           >
             <FlaskConical size={18} className={availableUpgrade ? "animate-pulse" : ""} />
             <span className="font-mono font-bold text-xs">{researchPoints}</span>
             {availableUpgrade && (
               <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
             )}
             {availableUpgrade && (
               <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
             )}
           </button>
         </div>
      </div>

      {/* MAIN GAME AREA */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* NEWS TICKER */}
        {activeEvent && (
          <div className="absolute top-0 left-0 right-0 z-20 bg-slate-900 text-white px-3 py-1 flex items-center justify-center text-xs shadow-md">
             <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase mr-2 ${activeEvent.type === 'negative' ? 'bg-red-600' : 'bg-emerald-600'}`}>
               PLANTÃO
             </span>
             <span className="truncate">{activeEvent.title}: {activeEvent.description}</span>
          </div>
        )}

        {/* GAME GRID CONTAINER */}
        <div className="flex-1 relative flex items-center justify-center bg-slate-100 p-2 sm:p-4 overflow-hidden">
             
           {/* Overlays */}
           {(!isPlaying && !gameOver && !levelComplete && !gameWon) && (
             <div className="absolute inset-0 z-30 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
               <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center">
                 <h3 className="text-xl font-black text-slate-900 mb-2">{LEVELS[currentLevelIdx].title}</h3>
                 <p className="text-sm text-slate-600 mb-6">{LEVELS[currentLevelIdx].description}</p>
                 <button onClick={() => setIsPlaying(true)} className="w-full py-3 bg-brand-600 text-white font-bold rounded-xl shadow-lg hover:bg-brand-700 flex items-center justify-center gap-2">
                   <Play size={20} /> COMEÇAR
                 </button>
               </div>
             </div>
           )}

           {gameOver && (
              <div className="absolute inset-0 z-30 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="text-center text-white max-w-md">
                  {gameOverReason === 'infection' ? (
                     <>
                        <Skull size={64} className="mx-auto mb-4 text-red-500 animate-pulse" />
                        <h3 className="text-3xl font-black mb-2 text-red-500">INFECÇÃO GENERALIZADA</h3>
                        <p className="text-slate-300 mb-6">O paciente não resistiu à infecção. As bactérias se multiplicaram mais rápido do que o tratamento.</p>
                     </>
                  ) : (
                     <>
                        <AlertTriangle size={64} className="mx-auto mb-4 text-purple-500 animate-pulse" />
                        <h3 className="text-3xl font-black mb-2 text-purple-500">SUPERBACTÉRIA IMORTAL</h3>
                        <p className="text-slate-300 mb-6">O uso incorreto de antibióticos criou uma cepa Pan-resistente. Nenhum medicamento funciona mais. Fim da linha.</p>
                     </>
                  )}
                  <button onClick={() => resetGame(true)} className="mt-4 px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 shadow-lg">Tentar Novamente</button>
                </div>
              </div>
           )}
           
           {gameWon && (
              <div className="absolute inset-0 z-30 bg-brand-900/90 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="text-center text-white">
                  <Trophy size={48} className="mx-auto mb-4 animate-bounce" />
                  <h3 className="text-3xl font-black mb-2">VITÓRIA!</h3>
                  <button onClick={() => resetGame(true)} className="mt-4 px-6 py-2 bg-white text-brand-900 font-bold rounded-lg hover:bg-brand-50">Jogar Novamente</button>
                </div>
              </div>
           )}

           {levelComplete && (
              <div className="absolute inset-0 z-30 bg-green-900/90 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="text-center text-white">
                  <CheckCircle2 size={48} className="mx-auto mb-4" />
                  <h3 className="text-2xl font-black mb-2">DIA CONCLUÍDO!</h3>
                  <button onClick={startNextLevel} className="mt-4 px-6 py-2 bg-white text-green-900 font-bold rounded-lg hover:bg-green-50">Próximo Dia</button>
                </div>
              </div>
           )}

           {/* THE GRID */}
           <div className="aspect-square h-full max-h-full max-w-full grid grid-cols-5 gap-1 sm:gap-2">
              {grid.map((slot, idx) => (
                 <button
                   key={slot.id}
                   onClick={() => handleSlotClick(slot.id)}
                   className={`relative rounded-lg border transition-all flex items-center justify-center overflow-hidden
                     ${slot.type === 'empty' ? 'bg-white border-slate-200 hover:bg-slate-50' : 'bg-slate-800 border-slate-600 active:scale-95'}
                   `}
                 >
                   {/* Floating Text Render */}
                   {floatingTexts.filter(ft => ft.x === idx % 5 && ft.y === Math.floor(idx / 5)).map(ft => (
                      <div key={ft.id} className={`absolute inset-0 flex items-center justify-center font-black text-sm z-50 animate-[floatUp_0.8s_ease-out_forwards] ${ft.type === 'good' ? 'text-green-500' : 'text-red-500'}`}>
                        {ft.text}
                      </div>
                   ))}

                   {slot.type === 'bacteria_pos' && (
                    <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] drop-shadow-md animate-pulse">
                      <defs>
                        <radialGradient id="gradPos" cx="30%" cy="30%" r="70%">
                          <stop offset="0%" stopColor="#d8b4fe" />
                          <stop offset="100%" stopColor="#7e22ce" />
                        </radialGradient>
                      </defs>
                      <circle cx="50" cy="50" r="45" fill="url(#gradPos)" stroke="#581c87" strokeWidth="2" />
                      <circle cx="35" cy="35" r="5" fill="#e9d5ff" opacity="0.5" />
                      <circle cx="65" cy="65" r="8" fill="#e9d5ff" opacity="0.3" />
                    </svg>
                   )}
                   {slot.type === 'bacteria_neg' && (
                    <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] drop-shadow-md animate-bounce-slow">
                      <defs>
                        <linearGradient id="gradNeg" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f472b6" />
                          <stop offset="100%" stopColor="#db2777" />
                        </linearGradient>
                      </defs>
                      <rect x="20" y="10" width="60" height="80" rx="30" fill="url(#gradNeg)" stroke="#9d174d" strokeWidth="2" />
                      <path d="M20,20 L10,15 M80,20 L90,15 M20,80 L10,85 M80,80 L90,85" stroke="#db2777" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                   )}
                   {slot.type === 'virus' && (
                    <svg viewBox="0 0 100 100" className="w-[70%] h-[70%] animate-[spin_3s_linear_infinite] drop-shadow-md">
                      <defs>
                        <radialGradient id="gradVirus" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#facc15" />
                          <stop offset="100%" stopColor="#ca8a04" />
                        </radialGradient>
                      </defs>
                      <circle cx="50" cy="50" r="30" fill="url(#gradVirus)" />
                      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                        <rect key={deg} x="46" y="5" width="8" height="90" fill="#a16207" rx="4" transform={`rotate(${deg} 50 50)`} />
                      ))}
                      <circle cx="50" cy="50" r="30" fill="url(#gradVirus)" stroke="#a16207" strokeWidth="2" />
                    </svg>
                   )}
                   {slot.type === 'superbug' && (
                    <svg viewBox="0 0 100 100" className="w-[90%] h-[90%] animate-pulse drop-shadow-lg">
                      <defs>
                        <radialGradient id="gradSuper" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="100%" stopColor="#7f1d1d" />
                        </radialGradient>
                      </defs>
                      <polygon points="50,0 63,38 100,50 63,62 50,100 37,62 0,50 37,38" fill="url(#gradSuper)" stroke="#450a0a" strokeWidth="2" />
                      <circle cx="35" cy="45" r="5" fill="#fee2e2" />
                      <circle cx="65" cy="45" r="5" fill="#fee2e2" />
                      <path d="M30,35 L40,40 M70,35 L60,40" stroke="#000" strokeWidth="2" />
                    </svg>
                   )}
                 </button>
               ))}
           </div>
        </div>

        {/* TOOLS */}
        <div className="bg-white border-t lg:border-t-0 lg:border-l border-slate-200 lg:w-64 shrink-0 flex flex-row lg:flex-col p-2 gap-2 overflow-x-auto lg:overflow-y-auto items-center lg:justify-start z-40">
           
           {/* Desktop Stats & Patient Status Combined */}
           <div className="hidden lg:block w-full space-y-2 mb-2">
             <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase text-slate-500">Score</span>
                  <span className="font-mono font-bold text-xl">{score}</span>
                </div>
                {combo > 1 && <div className="text-center text-xs font-bold text-yellow-600 bg-yellow-100 rounded py-1">COMBO x{combo}</div>}
             </div>
             
             {/* Patient Face Status (Desktop) */}
             <div className={`p-4 rounded-xl border ${patientStatus.bg} ${patientStatus.color} border-current/20 flex items-center justify-between`}>
                <div className={`p-2 bg-white rounded-full ${patientStatus.pulse}`}>
                  {patientStatus.icon}
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold opacity-70">Paciente</div>
                  <div className="font-black text-sm">{patientStatus.label}</div>
                </div>
             </div>
           </div>

           {/* Tool Buttons */}
           <div className="flex lg:grid lg:grid-cols-2 gap-2 flex-1 lg:flex-none lg:w-full min-w-0">
              {[
                  { id: 'antibiotic_pos', icon: Pill, color: 'bg-purple-600', ring: 'ring-purple-200', label: 'Gram+', sub: 'Roxo' },
                  { id: 'antibiotic_neg', icon: Pill, color: 'bg-pink-500', ring: 'ring-pink-200', label: 'Gram-', sub: 'Rosa' },
                  { id: 'vaccine', icon: Syringe, color: 'bg-yellow-500', ring: 'ring-yellow-200', label: 'Vacina', sub: 'Vírus' },
                  { id: 'hygiene', icon: Droplets, color: 'bg-teal-500', ring: 'ring-teal-200', label: 'Higiene', sub: 'Limpar' }
                ].map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => switchTool(tool.id as any)}
                    className={`relative flex-1 lg:flex-none p-2 lg:p-4 rounded-xl flex flex-col items-center justify-center gap-1 transition-all min-w-[60px] lg:aspect-square ${selectedTool === tool.id ? `${tool.color} text-white shadow-lg ring-2 ${tool.ring} -translate-y-1` : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
                  >
                    {cooldowns[tool.id as keyof typeof cooldowns] > 0 && <div className="absolute inset-0 bg-slate-900/50 z-20 rounded-xl" />}
                    <tool.icon size={20} className="lg:w-8 lg:h-8" />
                    <span className="text-[10px] font-bold uppercase leading-none">{tool.label}</span>
                  </button>
              ))}
           </div>
           
           {/* Special & Mobile Patient Status */}
           <div className="ml-2 lg:ml-0 flex lg:grid lg:grid-cols-1 gap-2 shrink-0 lg:w-full">
             {/* Patient Face (Mobile Only) */}
             <div className={`lg:hidden p-2 rounded-xl flex flex-col items-center justify-center min-w-[50px] ${patientStatus.bg} ${patientStatus.color}`}>
                <div className={`${patientStatus.pulse} mb-1`}>
                  {React.cloneElement(patientStatus.icon as React.ReactElement, { size: 18 })}
                </div>
             </div>

             <button 
                onClick={activateSpecial} 
                disabled={energy < 100} 
                className={`relative p-2 lg:py-4 px-4 rounded-xl flex flex-col items-center justify-center gap-1 min-w-[60px] transition-all overflow-hidden ${energy >= 100 ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white animate-pulse shadow-lg ring-2 ring-red-300' : 'bg-slate-100 text-slate-300'}`}
             >
                <HeartPulse size={20} className={energy >= 100 ? "animate-bounce" : ""} />
                <span className="text-[9px] font-bold uppercase">{energy >= 100 ? "ULTIMATE" : `${Math.round(energy)}%`}</span>
                {energy >= 100 && <span className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite]"></span>}
             </button>
           </div>
        </div>
      </div>
      
      <style>{`
        .clip-star { clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); }
        @keyframes floatUp { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-30px); } }
      `}</style>
    </div>
  );
};
