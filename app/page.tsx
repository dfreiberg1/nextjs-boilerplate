import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Skull, Eye, Brain, Key, Camera, BookOpen, Clock, Moon, Sun, Zap, Shield, Ghost, Compass, Feather, Flame, Droplet, Wind, Star, Infinity, Sparkles, Users, Home, Map, Puzzle, Diamond, Crown, Sword, Music, Coffee, Cloud, Anchor, Gem, Lock, Unlock } from 'lucide-react';

const REVERIE = () => {
  const [gameState, setGameState] = useState('splash');
  const [identity, setIdentity] = useState({
    coherence: 100,
    traits: { 
      kind: 50, cruel: 50, brave: 50, fearful: 50,
      logical: 50, emotional: 50, orderly: 50, chaotic: 50,
      truthful: 50, deceptive: 50, curious: 50, indifferent: 50
    },
    memories: [],
    artifacts: [],
    fragmentedSelf: [],
    coreMoments: [],
    dreamDepth: 0,
    realityAnchor: 100,
    karma: 0,
    dreamPowers: [],
    relationships: {},
    achievements: [],
    secretsFound: 0,
    temporalLoops: 0,
    identityCore: null,
    dreamCurrency: 0,
    consciousness: 100,
    metamemories: [],
    echoChamber: [],
    dreamCompanions: [],
    voidWhispers: [],
    quantumState: 'stable'
  });
  
  const [currentScene, setCurrentScene] = useState(null);
  const [glitchLevel, setGlitchLevel] = useState(0);
  const [dialogueHistory, setDialogueHistory] = useState([]);
  const [worldSeed, setWorldSeed] = useState(Math.random());
  const [trailerPhase, setTrailerPhase] = useState(0);
  const [timeDistortion, setTimeDistortion] = useState(1);
  const [memoryEchoes, setMemoryEchoes] = useState([]);
  const [dreamLayers, setDreamLayers] = useState(1);
  const [npcMemory, setNpcMemory] = useState({});
  const [audioContext, setAudioContext] = useState(null);
  const [soundscape, setSoundscape] = useState({ volume: 0.3, distortion: 0 });
  const [environmentState, setEnvironmentState] = useState({
    gravity: 1,
    timeFlow: 'forward',
    colorShift: 0,
    reality: 'stable',
    dimension: '3D',
    weather: 'clear',
    temperature: 'neutral'
  });
  const [gamePhase, setGamePhase] = useState('introduction');
  const [specialEvents, setSpecialEvents] = useState([]);
  const [dreamJournal, setDreamJournal] = useState([]);
  const [quantumChoices, setQuantumChoices] = useState([]);
  const [bossEncounters, setBossEncounters] = useState({
    mirrorSelf: false,
    voidWhisperer: false,
    timeWeaver: false,
    identityThief: false,
    dreamArchitect: false
  });
  const [metaProgress, setMetaProgress] = useState({
    playthroughs: 0,
    totalChoices: 0,
    perfectRuns: 0,
    secretEndings: []
  });
  
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const particlesRef = useRef([]);

  // Initialize audio system
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioContext) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(ctx);
    }
  }, [audioContext]);

  // Splash screen timer
  useEffect(() => {
    if (gameState === 'splash') {
      const timer = setTimeout(() => {
        setGameState('trailer');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  // Trailer sequence
  useEffect(() => {
    if (gameState === 'trailer') {
      const phases = [
        { duration: 3000, phase: 1 },
        { duration: 4000, phase: 2 },
        { duration: 4000, phase: 3 },
        { duration: 4000, phase: 4 },
        { duration: 4000, phase: 5 },
        { duration: 4000, phase: 6 },
        { duration: 3000, phase: 7 },
        { duration: 3000, phase: 8 },
        { duration: 3000, phase: 9 }
      ];
      
      let currentTime = 0;
      phases.forEach((p, index) => {
        setTimeout(() => {
          setTrailerPhase(p.phase);
        }, currentTime);
        currentTime += p.duration;
      });
      
      setTimeout(() => {
        setGameState('title');
      }, 30000);
      
      return () => {
        phases.forEach((_, index) => clearTimeout(index));
      };
    }
  }, [gameState]);

  // Advanced particle system for visual effects
  useEffect(() => {
    if (canvasRef.current && gameState === 'playing') {
      const ctx = canvasRef.current.getContext('2d');
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      
      // Initialize particles
      if (particlesRef.current.length === 0) {
        for (let i = 0; i < 100; i++) {
          particlesRef.current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`,
            life: 1,
            type: Math.random() > 0.5 ? 'memory' : 'dream'
          });
        }
      }
      
      const animate = () => {
        // Dynamic background
        const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
        gradient.addColorStop(0, `rgba(0, 0, ${20 + glitchLevel * 10}, ${0.05 + glitchLevel * 0.02})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Update and draw particles
        particlesRef.current.forEach((particle, index) => {
          // Quantum effects at high glitch levels
          if (identity.quantumState === 'unstable') {
            particle.vx += (Math.random() - 0.5) * 0.5;
            particle.vy += (Math.random() - 0.5) * 0.5;
          }
          
          // Environmental effects
          particle.vx *= environmentState.gravity;
          particle.vy *= environmentState.gravity;
          
          // Time distortion
          const timeMultiplier = environmentState.timeFlow === 'backwards' ? -1 : 1;
          particle.x += particle.vx * timeMultiplier * timeDistortion;
          particle.y += particle.vy * timeMultiplier * timeDistortion;
          
          // Wrap around edges
          if (particle.x < 0) particle.x = width;
          if (particle.x > width) particle.x = 0;
          if (particle.y < 0) particle.y = height;
          if (particle.y > height) particle.y = 0;
          
          // Draw particle
          ctx.save();
          ctx.globalAlpha = particle.life * (1 - glitchLevel * 0.1);
          
          if (particle.type === 'memory') {
            // Memory particles glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = particle.color;
          }
          
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          
          // Decay
          particle.life *= 0.995;
          
          // Respawn dead particles
          if (particle.life < 0.1) {
            particle.life = 1;
            particle.x = Math.random() * width;
            particle.y = Math.random() * height;
            particle.color = `hsl(${(Date.now() * 0.1 + index * 30) % 360}, 70%, 50%)`;
          }
        });
        
        // Dream distortion effects
        if (identity.dreamDepth > 0) {
          for (let i = 0; i < identity.dreamDepth * 5; i++) {
            const x = Math.sin(Date.now() * 0.001 + i) * width/2 + width/2;
            const y = Math.cos(Date.now() * 0.001 + i * 1.5) * height/2 + height/2;
            const radius = 20 + Math.sin(Date.now() * 0.002 + i) * 10;
            
            ctx.fillStyle = `hsla(${(Date.now() * 0.1 + i * 60) % 360}, 70%, 50%, 0.05)`;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        // Memory echoes visualization
        memoryEchoes.forEach((echo, i) => {
          const age = Date.now() - echo.timestamp;
          const opacity = Math.max(0, 1 - age / 5000);
          ctx.save();
          ctx.globalAlpha = opacity * 0.3;
          ctx.fillStyle = 'white';
          ctx.font = '14px serif';
          ctx.fillText(echo.text, echo.x, echo.y + Math.sin(age * 0.001) * 10);
          ctx.restore();
        });
        
        // Quantum interference patterns
        if (identity.quantumState === 'superposition') {
          ctx.save();
          ctx.globalAlpha = 0.1;
          for (let i = 0; i < 5; i++) {
            ctx.strokeStyle = `hsl(${i * 72}, 70%, 50%)`;
            ctx.beginPath();
            ctx.arc(width/2, height/2, 50 + i * 30 + Math.sin(Date.now() * 0.001) * 20, 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.restore();
        }
      };
      
      const interval = setInterval(animate, 50);
      return () => clearInterval(interval);
    }
  }, [glitchLevel, gameState, identity.dreamDepth, memoryEchoes, environmentState, identity.quantumState, timeDistortion]);

  // Complex identity degradation system
  useEffect(() => {
    if (gameState === 'playing') {
      const degradeInterval = setInterval(() => {
        setIdentity(prev => {
          // Calculate degradation factors
          const baseDegradation = 0.5;
          const depthPenalty = prev.dreamDepth * 0.2;
          const artifactProtection = prev.artifacts.length * 0.1;
          const companionSupport = prev.dreamCompanions.length * 0.05;
          const karmaEffect = Math.abs(prev.karma) > 50 ? 0.2 : 0;
          const quantumInstability = prev.quantumState === 'unstable' ? 0.3 : 0;
          
          const totalDegradation = baseDegradation + depthPenalty + karmaEffect + 
                                  quantumInstability - artifactProtection - companionSupport;
          
          const newCoherence = Math.max(0, prev.coherence - totalDegradation);
          const newConsciousness = Math.max(0, prev.consciousness - (totalDegradation * 0.5));
          
          // Reality anchor is affected by consciousness
          const anchorDegradation = 0.2 * (1 - newConsciousness / 100);
          const newAnchor = Math.max(0, prev.realityAnchor - anchorDegradation);
          
          // Quantum state changes
          let newQuantumState = prev.quantumState;
          if (newCoherence < 30 && Math.random() > 0.9) {
            newQuantumState = 'unstable';
          } else if (newCoherence < 50 && Math.random() > 0.95) {
            newQuantumState = 'superposition';
          }
          
          return {
            ...prev,
            coherence: newCoherence,
            consciousness: newConsciousness,
            realityAnchor: newAnchor,
            quantumState: newQuantumState
          };
        });
      }, 2000);
      return () => clearInterval(degradeInterval);
    }
  }, [gameState]);

  // Update environment based on multiple factors
  useEffect(() => {
    const newGlitchLevel = Math.floor((100 - identity.coherence) / 15);
    setGlitchLevel(newGlitchLevel);
    
    setEnvironmentState(prev => ({
      ...prev,
      gravity: 1 - (newGlitchLevel * 0.15) + (identity.dreamDepth * 0.1),
      timeFlow: identity.coherence < 30 ? 'backwards' : 
                identity.temporalLoops > 3 ? 'looped' : 'forward',
      colorShift: (100 - identity.coherence) * 3.6 + identity.karma,
      reality: identity.coherence > 70 ? 'stable' : 
               identity.coherence > 40 ? 'fluid' : 
               identity.coherence > 20 ? 'fractured' : 'dissolved',
      dimension: identity.dreamDepth > 3 ? '4D' : '3D',
      weather: identity.karma > 50 ? 'stormy' : 
               identity.karma < -50 ? 'foggy' : 'clear',
      temperature: identity.traits.emotional > 70 ? 'warm' : 
                   identity.traits.logical > 70 ? 'cold' : 'neutral'
    }));
  }, [identity.coherence, identity.dreamDepth, identity.karma, identity.temporalLoops, identity.traits]);

  // Generate dream soundscape with multiple layers
  useEffect(() => {
    if (audioContext && gameState === 'playing') {
      const nodes = [];
      
      // Base tone
      const oscillator1 = audioContext.createOscillator();
      const gainNode1 = audioContext.createGain();
      oscillator1.type = 'sine';
      oscillator1.frequency.setValueAtTime(110 * (1 + glitchLevel * 0.1), audioContext.currentTime);
      gainNode1.gain.setValueAtTime(soundscape.volume * 0.05, audioContext.currentTime);
      oscillator1.connect(gainNode1);
      nodes.push({ osc: oscillator1, gain: gainNode1 });
      
      // Harmony based on karma
      if (Math.abs(identity.karma) > 25) {
        const oscillator2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();
        oscillator2.type = 'triangle';
        oscillator2.frequency.setValueAtTime(
          165 * (identity.karma > 0 ? 1.5 : 0.75), 
          audioContext.currentTime
        );
        gainNode2.gain.setValueAtTime(soundscape.volume * 0.03, audioContext.currentTime);
        oscillator2.connect(gainNode2);
        nodes.push({ osc: oscillator2, gain: gainNode2 });
      }
      
      // Dream depth resonance
      if (identity.dreamDepth > 0) {
        const oscillator3 = audioContext.createOscillator();
        const gainNode3 = audioContext.createGain();
        const lfo = audioContext.createOscillator();
        const lfoGain = audioContext.createGain();
        
        oscillator3.type = 'sawtooth';
        oscillator3.frequency.setValueAtTime(55 * identity.dreamDepth, audioContext.currentTime);
        
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.5 * identity.dreamDepth, audioContext.currentTime);
        lfoGain.gain.setValueAtTime(10, audioContext.currentTime);
        
        lfo.connect(lfoGain);
        lfoGain.connect(oscillator3.frequency);
        
        gainNode3.gain.setValueAtTime(soundscape.volume * 0.02, audioContext.currentTime);
        oscillator3.connect(gainNode3);
        nodes.push({ osc: oscillator3, gain: gainNode3, lfo: lfo });
      }
      
      // Create master filter
      const filter = audioContext.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(
        2000 - (glitchLevel * 200) - (identity.dreamDepth * 100), 
        audioContext.currentTime
      );
      filter.Q.setValueAtTime(5 + glitchLevel, audioContext.currentTime);
      
      // Connect all nodes through filter to destination
      nodes.forEach(node => {
        node.gain.connect(filter);
        node.osc.start();
        if (node.lfo) node.lfo.start();
      });
      
      filter.connect(audioContext.destination);
      
      return () => {
        nodes.forEach(node => {
          node.osc.stop();
          node.osc.disconnect();
          node.gain.disconnect();
          if (node.lfo) {
            node.lfo.stop();
            node.lfo.disconnect();
          }
        });
        filter.disconnect();
      };
    }
  }, [audioContext, glitchLevel, soundscape, gameState, identity.karma, identity.dreamDepth]);

  const startGame = () => {
    setGameState('playing');
    setGamePhase('introduction');
    setCurrentScene(generateScene(identity, worldSeed));
    addMemoryEcho("You begin to dream...", 400, 300);
    
    // Initialize dream journal
    setDreamJournal([{
      entry: "I found myself in a place between sleeping and waking...",
      timestamp: Date.now(),
      coherence: 100
    }]);
  };

  const generateScene = (identity, seed) => {
    const sceneTypes = [
      // Enhanced original scenes
      {
        id: 'mirror_room',
        weight: 1,
        minDepth: 0,
        phase: 'any',
        generate: () => ({
          description: identity.coherence > 70 
            ? "You stand before a pristine mirror. Your reflection gazes back, clear and familiar."
            : identity.coherence > 40
            ? "The mirror before you ripples like water. Your reflection flickers between versions of yourself."
            : "Shattered mirrors surround you. Each fragment shows a different face. Which one is yours?",
          choices: [
            {
              text: "Touch the mirror",
              traits: { brave: 10, fearful: -5 },
              memory: "reached_for_truth",
              consequence: "mirror_touched"
            },
            {
              text: "Turn away",
              traits: { fearful: 10, brave: -5 },
              memory: "avoided_reflection",
              consequence: "mirror_avoided"
            },
            {
              text: "Speak to your reflection",
              traits: { emotional: 10, logical: -5 },
              memory: "questioned_self",
              consequence: "mirror_spoke",
              requirement: identity.coherence < 60
            },
            {
              text: "Shatter all mirrors",
              traits: { chaotic: 20, orderly: -15, cruel: 10 },
              memory: "destroyed_reflections",
              consequence: "mirrors_broken",
              requirement: identity.traits.chaotic > 60,
              special: 'boss_trigger'
            }
          ]
        })
      },
      
      // New ultra-complex scenes
      {
        id: 'quantum_observatory',
        weight: 0.8,
        minDepth: 2,
        phase: 'middle',
        generate: () => ({
          description: "You float in a crystalline dome where parallel universes are visible as glowing threads. " +
            "Each thread shows a different version of your life. Some threads are fraying, others pulse with light.",
          choices: [
            {
              text: "Weave threads together",
              traits: { orderly: 15, logical: 10 },
              memory: "unified_timelines",
              quantumEffect: 'stabilize',
              dreamPower: 'timeline_sight'
            },
            {
              text: "Cut a dark thread",
              traits: { cruel: 15, brave: 10 },
              memory: "severed_possibility",
              karma: -20,
              quantumEffect: 'destabilize'
            },
            {
              text: "Follow a golden thread",
              traits: { curious: 20, brave: 15 },
              memory: "pursued_best_self",
              karma: 20,
              temporalLoop: true
            },
            {
              text: "Become the observatory",
              traits: { logical: 25, emotional: -20 },
              memory: "transcended_observation",
              dreamDepthChange: 2,
              consciousness: 10
            }
          ]
        })
      },
      
      {
        id: 'memory_marketplace',
        weight: 1.2,
        minDepth: 1,
        phase: 'any',
        generate: () => ({
          description: `A bazaar where memories are currency. Merchants hawk experiences in glass orbs. ` +
            `${identity.dreamCurrency > 0 ? `You have ${identity.dreamCurrency} memory shards to spend.` : 'You have no currency here.'}`,
          choices: [
            {
              text: "Buy a childhood memory",
              traits: { emotional: 15, curious: 10 },
              memory: "purchased_innocence",
              cost: 5,
              coherenceChange: 10,
              artifact: { icon: Star, name: "Childhood Wonder", coherenceBoost: 15 }
            },
            {
              text: "Sell your fear",
              traits: { brave: 20, fearful: -30 },
              memory: "sold_fear",
              dreamCurrency: 10,
              removeTraits: { fearful: 20 }
            },
            {
              text: "Steal from a merchant",
              traits: { deceptive: 20, cruel: 10 },
              memory: "memory_thief",
              karma: -30,
              dreamCurrency: 15,
              wanted: true
            },
            {
              text: "Become a memory merchant",
              traits: { deceptive: 15, logical: 15 },
              memory: "joined_traders",
              occupation: 'memory_merchant',
              dreamCurrency: 20
            }
          ]
        })
      },
      
      {
        id: 'void_cathedral',
        weight: 0.6,
        minDepth: 3,
        phase: 'late',
        generate: () => ({
          description: "A cathedral built from absence itself. Pillars of nothing support arches of emptiness. " +
            "In the center, a choir of shadows sings silent hymns. The void whispers your true name.",
          choices: [
            {
              text: "Join the void choir",
              traits: { emotional: -30, chaotic: 20 },
              memory: "sang_silence",
              voidWhisper: "You are nothing. You are everything.",
              consciousness: -20
            },
            {
              text: "Fill the void with light",
              traits: { kind: 30, brave: 25 },
              memory: "illuminated_darkness",
              karma: 40,
              dreamPower: 'light_bearer',
              bossEncounter: 'voidWhisperer'
            },
            {
              text: "Pray to nothingness",
              traits: { emotional: 20, logical: -15 },
              memory: "worshipped_void",
              voidAlignment: true,
              metamemory: "The void remembers when you forget"
            },
            {
              text: "Collapse the cathedral",
              traits: { chaotic: 40, cruel: 20 },
              memory: "destroyed_sanctuary",
              karma: -50,
              environmentChange: { reality: 'shattered' }
            }
          ]
        })
      },
      
      {
        id: 'identity_forge',
        weight: 0.9,
        minDepth: 2,
        phase: 'middle',
        generate: () => ({
          description: "A cosmic forge where identities are hammered into shape on an anvil of starlight. " +
            "The smith has your face but moves with alien grace. Unfinished selves hang from chains.",
          choices: [
            {
              text: "Forge a new identity",
              traits: { brave: 20, chaotic: 15 },
              memory: "reforged_self",
              resetTraits: true,
              newIdentity: true
            },
            {
              text: "Temper your current self",
              traits: { orderly: 20, logical: 15 },
              memory: "strengthened_core",
              coherenceChange: 25,
              makeCore: true
            },
            {
              text: "Free the hanging selves",
              traits: { kind: 25, chaotic: 10 },
              memory: "liberated_identities",
              karma: 30,
              companions: ['freed_self_1', 'freed_self_2']
            },
            {
              text: "Steal the smith's hammer",
              traits: { deceptive: 20, brave: 15 },
              memory: "stole_creation",
              artifact: { icon: Sword, name: "Identity Hammer", special: true },
              wanted: true
            }
          ]
        })
      },
      
      {
        id: 'dream_library_depths',
        weight: 1,
        minDepth: 1,
        phase: 'any',
        generate: () => ({
          description: "The library extends infinitely in all directions. Books write themselves as you watch. " +
            `${identity.secretsFound > 0 ? 'Hidden sections glow with recognition.' : 'Locked doors bar mysterious wings.'}`,
          choices: [
            {
              text: "Read the Book of Names",
              traits: { curious: 15, logical: 10 },
              memory: "learned_true_names",
              secret: 'name_magic',
              dreamPower: 'true_naming'
            },
            {
              text: "Write your story's ending",
              traits: { orderly: 20, emotional: 15 },
              memory: "authored_fate",
              setEnding: 'written',
              karma: 10
            },
            {
              text: "Enter the Forbidden Section",
              traits: { brave: 25, curious: 20 },
              memory: "broke_prohibition",
              requirement: identity.secretsFound >= 3,
              metamemory: "Some knowledge should remain hidden",
              consciousness: -10
            },
            {
              text: "Burn the false histories",
              traits: { truthful: 30, cruel: 10 },
              memory: "purged_lies",
              karma: -20,
              removeMemories: 'false'
            }
          ]
        })
      },
      
      {
        id: 'temporal_garden',
        weight: 1.1,
        minDepth: 0,
        phase: 'any',
        generate: () => ({
          description: `A garden where all seasons exist simultaneously. ${environmentState.timeFlow === 'backwards' ? 
            'Flowers bloom in reverse, returning to seeds.' : 'Time-flowers show past and future in their petals.'}`,
          choices: [
            {
              text: "Plant a memory seed",
              traits: { kind: 10, orderly: 10 },
              memory: "planted_hope",
              artifact: { icon: Feather, name: "Memory Seed", coherenceBoost: 5 },
              futureEvent: 'memory_tree'
            },
            {
              text: "Harvest temporal fruit",
              traits: { brave: 10, chaotic: 5 },
              memory: "stole_time",
              timeEffect: 0.5,
              temporalLoop: Math.random() > 0.7
            },
            {
              text: "Sync with all seasons",
              traits: { orderly: 25, logical: 20 },
              memory: "mastered_seasons",
              dreamPower: 'season_walker',
              environmentChange: { timeFlow: 'all_at_once' }
            },
            {
              text: "Create an eternal moment",
              traits: { emotional: 30, logical: -10 },
              memory: "froze_beauty",
              createSavePoint: true,
              karma: 15
            }
          ]
        })
      },
      
      {
        id: 'consciousness_engine',
        weight: 0.7,
        minDepth: 4,
        phase: 'late',
        generate: () => ({
          description: "A vast machine of thought and dream. Gears of pure idea turn while pistons pump liquid memory. " +
            "At its heart, a seat awaits. The engine recognizes you as a missing component.",
          choices: [
            {
              text: "Become the engine's heart",
              traits: { logical: 40, emotional: -30 },
              memory: "merged_with_machine",
              ending: 'mechanical_transcendence',
              consciousness: 50
            },
            {
              text: "Sabotage the engine",
              traits: { chaotic: 35, cruel: 15 },
              memory: "broke_consciousness",
              karma: -40,
              globalEffect: 'consciousness_crisis'
            },
            {
              text: "Study the blueprints",
              traits: { curious: 25, logical: 30 },
              memory: "understood_consciousness",
              secret: 'engine_truth',
              dreamPower: 'mechanical_insight'
            },
            {
              text: "Free the trapped minds",
              traits: { kind: 35, brave: 20 },
              memory: "liberation_hero",
              karma: 50,
              companions: ['freed_mind_1', 'freed_mind_2', 'freed_mind_3']
            }
          ]
        })
      },
      
      {
        id: 'echo_amphitheater',
        weight: 1,
        minDepth: 1,
        phase: 'any',
        generate: () => ({
          description: "An ancient amphitheater where every word ever spoken still echoes. " +
            `Your past conversations replay in layers. ${identity.echoChamber.length > 0 ? 
            'Your own voice rises above the cacophony.' : 'The silence waits for your voice.'}`,
          choices: [
            {
              text: "Shout your truth",
              traits: { brave: 20, truthful: 25 },
              memory: "declared_truth",
              echoEffect: 'truth_resonance',
              karma: 20
            },
            {
              text: "Whisper a lie",
              traits: { deceptive: 25, fearful: 10 },
              memory: "poisoned_echoes",
              echoEffect: 'lie_cascade',
              karma: -25
            },
            {
              text: "Conduct the echo symphony",
              traits: { orderly: 20, emotional: 15 },
              memory: "harmonized_past",
              dreamPower: 'echo_mastery',
              clearEchoes: false,
              organizeEchoes: true
            },
            {
              text: "Absorb all echoes",
              traits: { curious: 30, chaotic: 15 },
              memory: "consumed_history",
              gainAllMemories: true,
              consciousness: -15
            }
          ]
        })
      },
      
      {
        id: 'dream_court',
        weight: 0.8,
        minDepth: 2,
        phase: 'middle',
        generate: () => ({
          description: "A court where dreams judge nightmares. You stand accused of existing. " +
            "The jury shifts between your past selves. The judge wears your future face.",
          choices: [
            {
              text: "Defend your existence",
              traits: { brave: 25, logical: 20 },
              memory: "justified_being",
              karma: 15,
              trial: 'self_defense'
            },
            {
              text: "Prosecute yourself",
              traits: { cruel: 20, truthful: 15 },
              memory: "self_prosecutor",
              karma: -30,
              fragmentSelf: true
            },
            {
              text: "Call witness: Your Shadow",
              traits: { brave: 30, emotional: 10 },
              memory: "shadow_testimony",
              bossEncounter: 'mirrorSelf',
              requirement: !bossEncounters.mirrorSelf
            },
            {
              text: "Overturn dream law",
              traits: { chaotic: 40, deceptive: 20 },
              memory: "broke_dream_law",
              wanted: true,
              globalEffect: 'lawless_dreams'
            }
          ]
        })
      },
      
      {
        id: 'identity_auction_expanded',
        weight: 0.9,
        minDepth: 2,
        phase: 'any',
        generate: () => ({
          description: "The auction has expanded. Now they bid on potential futures, forgotten pasts, and impossible presents. " +
            `The auctioneer's gavel shapes reality with each strike. ${identity.dreamCurrency > 20 ? 
            'You have enough to bid on something significant.' : 'You can only watch.'}`,
          choices: [
            {
              text: "Bid on perfect memory",
              traits: { orderly: 20, logical: 15 },
              memory: "bought_perfection",
              cost: 30,
              perfectMemory: true,
              coherenceChange: 40
            },
            {
              text: "Auction your nightmares",
              traits: { brave: 25, emotional: -10 },
              memory: "sold_darkness",
              dreamCurrency: 25,
              removeNightmares: true,
              karma: 10
            },
            {
              text: "Buy someone's happiness",
              traits: { cruel: 30, deceptive: 20 },
              memory: "stole_joy",
              cost: 20,
              karma: -40,
              emotionalBoost: 30
            },
            {
              text: "Bid on the auction house",
              traits: { chaotic: 35, curious: 25 },
              memory: "meta_purchase",
              cost: 50,
              requirement: identity.dreamCurrency >= 50,
              controlAuction: true
            }
          ]
        })
      },
      
      {
        id: 'fractal_self',
        weight: 0.7,
        minDepth: 3,
        phase: 'late',
        generate: () => ({
          description: "You encounter a fractal version of yourself - infinite copies nested within copies. " +
            "Each smaller self makes different choices. The pattern extends beyond comprehension.",
          choices: [
            {
              text: "Merge with the pattern",
              traits: { logical: 30, orderly: 25 },
              memory: "became_fractal",
              quantumEffect: 'superposition',
              consciousness: 20,
              infiniteLoop: true
            },
            {
              text: "Break the recursion",
              traits: { chaotic: 30, brave: 20 },
              memory: "shattered_pattern",
              stopLoops: true,
              karma: 20
            },
            {
              text: "Navigate to the smallest self",
              traits: { curious: 35, brave: 15 },
              memory: "found_core_self",
              findTrueSelf: true,
              coherenceChange: 50
            },
            {
              text: "Expand to contain all",
              traits: { emotional: 20, chaotic: 25 },
              memory: "infinite_expansion",
              dreamDepthChange: 3,
              consciousness: -30
            }
          ]
        })
      },
      
      {
        id: 'memory_graveyard',
        weight: 1,
        minDepth: 1,
        phase: 'any',
        generate: () => ({
          description: "A graveyard where forgotten memories are buried. Some graves are fresh, others ancient. " +
            "Ghostly fragments of abandoned experiences drift between headstones. One grave bears your name.",
          choices: [
            {
              text: "Dig up your grave",
              traits: { brave: 30, curious: 25 },
              memory: "unearthed_secret",
              secret: 'buried_self',
              metamemory: "What you bury always returns"
            },
            {
              text: "Commune with memory ghosts",
              traits: { emotional: 25, curious: 15 },
              memory: "spoke_with_forgotten",
              gainLostMemories: true,
              companions: ['memory_ghost']
            },
            {
              text: "Plant new memories",
              traits: { kind: 20, orderly: 15 },
              memory: "seeded_future",
              karma: 25,
              futureEvent: 'memory_bloom'
            },
            {
              text: "Raise the dead memories",
              traits: { chaotic: 35, emotional: 20 },
              memory: "necromancer_of_thought",
              dreamPower: 'memory_necromancy',
              karma: -35
            }
          ]
        })
      },
      
      {
        id: 'paradox_engine',
        weight: 0.6,
        minDepth: 4,
        phase: 'late',
        generate: () => ({
          description: "A machine that runs on contradictions. It exists and doesn't exist simultaneously. " +
            "You must choose between mutually exclusive truths to power it. Your decision will reshape logic itself.",
          choices: [
            {
              text: "You are everyone/no one",
              traits: { logical: -40, emotional: 40 },
              memory: "embraced_paradox",
              paradox: true,
              quantumEffect: 'superposition',
              fragmentSelf: true,
              unifySelves: true
            },
            {
              text: "The dream is real/false",
              traits: { logical: 40, emotional: -40 },
              memory: "solved_reality",
              resolveParadox: 'reality',
              consciousness: 30
            },
            {
              text: "Create new paradox",
              traits: { chaotic: 50, curious: 30 },
              memory: "birthed_impossibility",
              createParadox: true,
              globalEffect: 'logic_breakdown'
            },
            {
              text: "Destroy all paradoxes",
              traits: { orderly: 50, cruel: 10 },
              memory: "enforced_logic",
              karma: -20,
              removeParadoxes: true,
              makeWorldLogical: true
            }
          ]
        })
      }
    ];
    
    // Filter by phase and depth
    let availableScenes = sceneTypes.filter(s => 
      s.minDepth <= identity.dreamDepth &&
      (s.phase === 'any' || s.phase === gamePhase)
    );
    
    // Add boss scenes if triggered
    if (specialEvents.includes('boss_trigger')) {
      availableScenes.push({
        id: 'boss_mirror_self',
        weight: 5,
        generate: () => generateBossScene('mirrorSelf')
      });
    }
    
    // Temporal loop handling
    if (identity.temporalLoops > 0 && Math.random() > 0.7) {
      return generateTemporalLoopScene(identity);
    }
    
    // Weighted random selection
    const totalWeight = availableScenes.reduce((sum, s) => sum + s.weight, 0);
    let random = seed * totalWeight;
    
    for (let scene of availableScenes) {
      random -= scene.weight;
      if (random <= 0) {
        return scene.generate();
      }
    }
    
    return availableScenes[0].generate();
  };

  const generateBossScene = (bossType) => {
    const bosses = {
      mirrorSelf: {
        description: "Your reflection steps out of the mirror, moving independently. It speaks with your voice but its words are backwards. " +
          "'You forgot who we were,' it says. 'Let me remind you.'",
        choices: [
          {
            text: "Embrace your shadow",
            traits: { brave: 40, emotional: 30 },
            memory: "unified_shadow",
            karma: 30,
            healingShadow: true,
            coherenceChange: 50
          },
          {
            text: "Battle your reflection",
            traits: { brave: 30, cruel: 20 },
            memory: "fought_shadow",
            karma: -20,
            combat: true,
            possibleRewards: ['shadow_blade', 'mirror_shield']
          },
          {
            text: "Swap places",
            traits: { chaotic: 40, curious: 30 },
            memory: "became_reflection",
            invertTraits: true,
            newPerspective: true
          },
          {
            text: "Shatter both of you",
            traits: { cruel: 40, chaotic: 30 },
            memory: "mutual_destruction",
            karma: -50,
            fragmentSelf: true,
            damageCoherence: 30
          }
        ]
      },
      voidWhisperer: {
        description: "The Void Whisperer materializes from nothingness, a being of pure absence. " +
          "Its voice is the sound of forgetting. 'Join the quiet,' it beckons. 'Names are pain.'",
        choices: [
          {
            text: "Speak your true name loudly",
            traits: { brave: 50, truthful: 40 },
            memory: "named_against_void",
            karma: 40,
            dreamPower: 'true_name_protection',
            defeatBoss: true
          },
          {
            text: "Listen to the whispers",
            traits: { curious: 20, fearful: 30 },
            memory: "heard_void_truth",
            voidWhisper: "You were never real",
            consciousness: -40,
            voidMark: true
          },
          {
            text: "Fill void with memories",
            traits: { kind: 30, brave: 25 },
            memory: "gave_substance",
            useMemories: 10,
            karma: 50,
            convertBoss: true
          },
          {
            text: "Become void yourself",
            traits: { logical: -50, chaotic: 40 },
            memory: "embraced_nothingness",
            becomeVoid: true,
            ending: 'void_awakening'
          }
        ]
      }
    };
    
    const boss = bosses[bossType];
    setBossEncounters(prev => ({ ...prev, [bossType]: true }));
    return boss;
  };

  const generateTemporalLoopScene = (identity) => {
    return {
      description: `You've been here before. The scene flickers between past and future versions. ` +
        `This is temporal loop ${identity.temporalLoops + 1}. You can feel time fraying at the edges.`,
      choices: [
        {
          text: "Break the loop violently",
          traits: { chaotic: 30, brave: 20 },
          memory: "shattered_time",
          breakLoop: true,
          karma: -20,
          timeEffect: 2.0
        },
        {
          text: "Accept the eternal return",
          traits: { orderly: 30, logical: 20 },
          memory: "embraced_cycles",
          karma: 30,
          dreamPower: 'loop_master',
          stableLoop: true
        },
        {
          text: "Leave message for next loop",
          traits: { curious: 20, kind: 15 },
          memory: "warned_future_self",
          futureMessage: true,
          karma: 20
        },
        {
          text: "Merge all loop iterations",
          traits: { chaotic: 40, logical: 30 },
          memory: "collapsed_timelines",
          mergeLoops: true,
          consciousness: 20,
          possibleParadox: true
        }
      ]
    };
  };

  const makeChoice = (choice) => {
    // Track total choices for meta progression
    setMetaProgress(prev => ({ ...prev, totalChoices: prev.totalChoices + 1 }));
    
    // Check for quantum choices
    if (identity.quantumState === 'superposition' && Math.random() > 0.5) {
      makeQuantumChoice(choice);
      return;
    }
    
    // Standard choice processing
    const newTraits = { ...identity.traits };
    const traitChanges = [];
    
    Object.entries(choice.traits).forEach(([trait, value]) => {
      const oldValue = newTraits[trait];
      newTraits[trait] = Math.max(0, Math.min(100, newTraits[trait] + value));
      if (Math.abs(value) > 10) {
        traitChanges.push({ trait, change: value, newValue: newTraits[trait] });
      }
    });

    // Special trait removals
    if (choice.removeTraits) {
      Object.entries(choice.removeTraits).forEach(([trait, value]) => {
        newTraits[trait] = Math.max(0, newTraits[trait] - value);
      });
    }

    // Reset traits entirely
    if (choice.resetTraits) {
      Object.keys(newTraits).forEach(trait => {
        newTraits[trait] = 50;
      });
    }

    // Invert traits (for mirror battles)
    if (choice.invertTraits) {
      Object.keys(newTraits).forEach(trait => {
        newTraits[trait] = 100 - newTraits[trait];
      });
    }

    // Create memory with metadata
    const newMemory = {
      id: choice.memory,
      strength: identity.coherence,
      timestamp: Date.now(),
      traits: choice.traits,
      scene: currentScene.id,
      dreamDepth: identity.dreamDepth,
      karma: choice.karma || 0,
      special: choice.special || null
    };

    // Check for contradictions
    const contradictions = findContradictions(identity.memories, newMemory);
    let coherenceChange = choice.coherenceChange || (contradictions.length > 0 ? -15 : 5);
    
    // Karma effects
    let karmaChange = choice.karma || 0;
    if (Math.abs(identity.karma + karmaChange) > 100) {
      addSpecialEvent('karma_extreme');
    }
    
    // Dream depth changes
    let newDreamDepth = identity.dreamDepth;
    if (choice.dreamDepthChange) {
      newDreamDepth = Math.max(0, Math.min(10, identity.dreamDepth + choice.dreamDepthChange));
      if (newDreamDepth >= 5 && !specialEvents.includes('deep_dream')) {
        addSpecialEvent('deep_dream');
      }
    }
    
    // Handle fragmenting/merging
    let newFragmentedSelf = [...identity.fragmentedSelf];
    if (choice.fragmentSelf) {
      newFragmentedSelf.push({
        traits: { ...newTraits },
        splitTime: Date.now(),
        memories: identity.memories.slice(-5)
      });
    }
    
    if (choice.unifySelves && newFragmentedSelf.length > 0) {
      // Complex merging logic
      const unified = newFragmentedSelf.reduce((acc, fragment) => {
        Object.entries(fragment.traits).forEach(([trait, value]) => {
          acc[trait] = (acc[trait] || 0) + value;
        });
        return acc;
      }, {});
      
      Object.entries(unified).forEach(([trait, total]) => {
        newTraits[trait] = Math.min(100, total / (newFragmentedSelf.length + 1));
      });
      
      newFragmentedSelf = [];
      coherenceChange += 30;
    }
    
    // Handle dream powers
    let newDreamPowers = [...identity.dreamPowers];
    if (choice.dreamPower && !newDreamPowers.includes(choice.dreamPower)) {
      newDreamPowers.push(choice.dreamPower);
      addMemoryEcho(`Gained power: ${choice.dreamPower}`, 400, 200);
    }
    
    // Handle companions
    let newCompanions = [...identity.dreamCompanions];
    if (choice.companions) {
      choice.companions.forEach(companion => {
        if (!newCompanions.find(c => c.id === companion)) {
          newCompanions.push({
            id: companion,
            loyalty: 50,
            joinedAt: Date.now()
          });
        }
      });
    }
    
    // Currency changes
    let newCurrency = identity.dreamCurrency;
    if (choice.dreamCurrency) {
      newCurrency += choice.dreamCurrency;
    }
    if (choice.cost) {
      if (newCurrency < choice.cost) {
        setDialogueHistory(prev => [...prev, { 
          type: 'system', 
          text: "You don't have enough dream currency for this choice." 
        }]);
        return;
      }
      newCurrency -= choice.cost;
    }
    
    // Consciousness changes
    let newConsciousness = identity.consciousness;
    if (choice.consciousness) {
      newConsciousness = Math.max(0, Math.min(100, newConsciousness + choice.consciousness));
    }
    
    // Quantum effects
    let newQuantumState = identity.quantumState;
    if (choice.quantumEffect) {
      newQuantumState = choice.quantumEffect === 'stabilize' ? 'stable' : 
                       choice.quantumEffect === 'destabilize' ? 'unstable' :
                       'superposition';
    }
    
    // Achievement checking
    const newAchievements = checkAchievements(identity, choice, newTraits);
    
    // Update identity
    setIdentity(prev => ({
      ...prev,
      coherence: Math.max(0, Math.min(100, prev.coherence + coherenceChange)),
      traits: newTraits,
      memories: [...prev.memories, newMemory].slice(-30),
      dreamDepth: newDreamDepth,
      fragmentedSelf: newFragmentedSelf,
      artifacts: choice.artifact ? [...prev.artifacts, choice.artifact] : prev.artifacts,
      karma: Math.max(-100, Math.min(100, prev.karma + karmaChange)),
      dreamPowers: newDreamPowers,
      dreamCompanions: newCompanions,
      dreamCurrency: newCurrency,
      consciousness: newConsciousness,
      quantumState: newQuantumState,
      achievements: [...prev.achievements, ...newAchievements],
      temporalLoops: choice.temporalLoop ? prev.temporalLoops + 1 : prev.temporalLoops,
      voidWhispers: choice.voidWhisper ? [...prev.voidWhispers, choice.voidWhisper] : prev.voidWhispers,
      secretsFound: choice.secret ? prev.secretsFound + 1 : prev.secretsFound
    }));

    // Generate complex NPC response
    const npcResponse = generateComplexNPCResponse(identity, choice, contradictions, traitChanges);
    setDialogueHistory(prev => [...prev, { type: 'npc', text: npcResponse }]);
    
    // Update NPC memory with relationship tracking
    if (currentScene.id) {
      setNpcMemory(prev => ({
        ...prev,
        [currentScene.id]: {
          lastChoice: choice.memory,
          relationship: (prev[currentScene.id]?.relationship || 0) + (choice.karma || 0) / 10,
          encounters: (prev[currentScene.id]?.encounters || 0) + 1
        }
      }));
    }
    
    // Add memory echo with emotional weight
    const echoColor = choice.karma > 0 ? 'golden' : choice.karma < 0 ? 'crimson' : 'silver';
    addMemoryEcho(choice.text, Math.random() * 600 + 100, Math.random() * 400 + 100, echoColor);

    // Environmental changes
    if (choice.environmentChange) {
      setEnvironmentState(prev => ({ ...prev, ...choice.environmentChange }));
    }
    
    // Time effects
    if (choice.timeEffect) {
      setTimeDistortion(choice.timeEffect);
      setTimeout(() => setTimeDistortion(1), 5000);
    }
    
    // Journal entry
    if (choice.memory.includes('significant') || Math.random() > 0.8) {
      setDreamJournal(prev => [...prev, {
        entry: `I chose to ${choice.text.toLowerCase()}. ${npcResponse}`,
        timestamp: Date.now(),
        coherence: identity.coherence,
        karma: identity.karma
      }]);
    }
    
    // Boss encounter handling
    if (choice.bossEncounter && !bossEncounters[choice.bossEncounter]) {
      setCurrentScene(generateBossScene(choice.bossEncounter));
      return;
    }
    
    // Special event triggers
    if (choice.special === 'boss_trigger') {
      addSpecialEvent('boss_trigger');
    }
    
    // Move to next scene
    setWorldSeed(Math.random());
    setCurrentScene(generateScene(identity, Math.random()));
  };

  const makeQuantumChoice = (choice) => {
    // In superposition, both choices happen simultaneously
    setQuantumChoices(prev => [...prev, {
      choice1: choice,
      choice2: generateAlternateChoice(choice),
      timestamp: Date.now()
    }]);
    
    setDialogueHistory(prev => [...prev, { 
      type: 'system', 
      text: "Reality splits. You chose both paths simultaneously. The universe struggles to reconcile." 
    }]);
    
    // Apply partial effects from both choices
    const halfEffect = (value) => Math.floor(value / 2);
    
    const quantumTraits = { ...identity.traits };
    Object.entries(choice.traits).forEach(([trait, value]) => {
      quantumTraits[trait] = Math.max(0, Math.min(100, quantumTraits[trait] + halfEffect(value)));
    });
    
    setIdentity(prev => ({
      ...prev,
      traits: quantumTraits,
      coherence: Math.max(0, prev.coherence - 10), // Quantum states are unstable
      quantumState: Math.random() > 0.7 ? 'collapsed' : 'superposition'
    }));
  };

  const generateAlternateChoice = (originalChoice) => {
    // Generate the "opposite" choice
    const oppositeTraits = {};
    Object.entries(originalChoice.traits).forEach(([trait, value]) => {
      oppositeTraits[trait] = -value;
    });
    
    return {
      ...originalChoice,
      traits: oppositeTraits,
      karma: -(originalChoice.karma || 0),
      memory: `anti_${originalChoice.memory}`
    };
  };

  const findContradictions = (memories, newMemory) => {
    const contradictionPairs = [
      ['showed_compassion', 'chose_indifference'],
      ['reached_for_truth', 'avoided_reflection'],
      ['destroyed_history', 'created_truth'],
      ['embraced_order', 'chose_chaos'],
      ['saved_entity', 'destroyed_entity'],
      ['spoke_truth', 'told_lie'],
      ['unified_selves', 'fragmented_self']
    ];
    
    return memories.filter(m => {
      return contradictionPairs.some(([a, b]) => 
        (m.id === a && newMemory.id === b) || 
        (m.id === b && newMemory.id === a)
      );
    });
  };

  const generateComplexNPCResponse = (identity, choice, contradictions, traitChanges) => {
    // Determine response based on multiple factors
    const coherenceLevel = identity.coherence > 70 ? 'high' : 
                          identity.coherence > 40 ? 'medium' : 'low';
    const karmaLevel = identity.karma > 50 ? 'light' : 
                       identity.karma < -50 ? 'dark' : 'neutral';
    const hasCompanions = identity.dreamCompanions.length > 0;
    const deepDream = identity.dreamDepth > 3;
    
    // Build response based on context
    let response = "";
    
    // Coherence-based opening
    if (coherenceLevel === 'high') {
      response += karmaLevel === 'light' ? 
        "Your noble spirit shines through the dream. " :
        karmaLevel === 'dark' ?
        "Your consistent darkness troubles even the shadows. " :
        "You maintain your center amidst the chaos. ";
    } else if (coherenceLevel === 'medium') {
      response += contradictions.length > 0 ?
        "You contradict yourself... but perhaps that's human. " :
        "Your image flickers between states of being. ";
    } else {
      response += "You're dissolving... becoming dream-stuff... ";
    }
    
    // Trait change reactions
    if (traitChanges.length > 0) {
      const majorChange = traitChanges.find(c => Math.abs(c.change) > 20);
      if (majorChange) {
        response += `Such a dramatic shift in your ${majorChange.trait}! `;
      }
    }
    
    // Companion reactions
    if (hasCompanions) {
      const loyalCompanion = identity.dreamCompanions.find(c => c.loyalty > 70);
      if (loyalCompanion) {
        response += `Your companion ${loyalCompanion.id} nods approvingly. `;
      }
    }
    
    // Deep dream effects
    if (deepDream) {
      response += "At this depth, reality bends to your will... or you to its. ";
    }
    
    // Quantum state observations
    if (identity.quantumState === 'superposition') {
      response += "You exist in multiple states simultaneously. Fascinating and terrifying. ";
    }
    
    // Add specific warnings or encouragements
    if (identity.coherence < 20) {
      response += "HURRY. Find yourself before you're lost forever! ";
    } else if (identity.consciousness < 30) {
      response += "Your awareness dims. Stay awake! ";
    }
    
    return response || "The dream watches, waiting...";
  };

  const checkAchievements = (identity, choice, newTraits) => {
    const achievements = [];
    
    // Check for new achievements
    if (identity.artifacts.length >= 10 && !identity.achievements.includes('collector')) {
      achievements.push('collector');
    }
    
    if (identity.karma >= 100 && !identity.achievements.includes('saint')) {
      achievements.push('saint');
    }
    
    if (identity.karma <= -100 && !identity.achievements.includes('nightmare')) {
      achievements.push('nightmare');
    }
    
    if (identity.dreamDepth >= 5 && !identity.achievements.includes('deep_dreamer')) {
      achievements.push('deep_dreamer');
    }
    
    if (identity.fragmentedSelf.length >= 5 && !identity.achievements.includes('shattered')) {
      achievements.push('shattered');
    }
    
    if (identity.dreamPowers.length >= 5 && !identity.achievements.includes('dream_master')) {
      achievements.push('dream_master');
    }
    
    if (Object.values(newTraits).every(t => t === 50) && !identity.achievements.includes('perfect_balance')) {
      achievements.push('perfect_balance');
    }
    
    return achievements;
  };

  const findArtifact = () => {
    const artifacts = [
      { icon: Camera, name: "Faded Photograph", coherenceBoost: 10, description: "A picture of someone you might have been" },
      { icon: BookOpen, name: "Journal Page", coherenceBoost: 15, description: "Your handwriting, but the words keep changing" },
      { icon: Key, name: "Familiar Key", coherenceBoost: 8, description: "It feels warm in your hand" },
      { icon: Compass, name: "Broken Compass", coherenceBoost: 12, description: "All directions point to you" },
      { icon: Moon, name: "Dream Fragment", coherenceBoost: 20, description: "A piece of lucid awareness" },
      { icon: Shield, name: "Memory Shield", coherenceBoost: 5, realityAnchorBoost: 15, description: "Protects against forgetting" },
      { icon: Star, name: "Core Memory", coherenceBoost: 25, description: "A defining moment of your existence", rare: true },
      { icon: Infinity, name: "Eternal Moment", coherenceBoost: 30, timeEffect: 0, description: "Time stops when held", rare: true },
      { icon: Crown, name: "Identity Crown", coherenceBoost: 40, description: "Worn by your truest self", rare: true },
      { icon: Diamond, name: "Crystallized Thought", coherenceBoost: 15, consciousnessBoost: 10, description: "Pure understanding made solid" },
      { icon: Anchor, name: "Reality Anchor", realityAnchorBoost: 30, description: "Keeps you tethered to existence" },
      { icon: Gem, name: "Karma Crystal", karmaBalance: true, description: "Balances your moral essence" }
    ];
    
    // Weighted selection based on current needs
    let selectedArtifact;
    if (identity.coherence < 30 && Math.random() > 0.3) {
      selectedArtifact = artifacts.find(a => a.coherenceBoost > 20) || artifacts[0];
    } else if (identity.realityAnchor < 30 && Math.random() > 0.5) {
      selectedArtifact = artifacts.find(a => a.realityAnchorBoost) || artifacts[0];
    } else {
      const rareChance = identity.dreamDepth > 3 ? 0.2 : 0.05;
      if (Math.random() < rareChance) {
        const rareArtifacts = artifacts.filter(a => a.rare);
        selectedArtifact = rareArtifacts[Math.floor(Math.random() * rareArtifacts.length)];
      } else {
        selectedArtifact = artifacts[Math.floor(Math.random() * artifacts.length)];
      }
    }
    
    // Apply effects
    setIdentity(prev => ({
      ...prev,
      coherence: Math.min(100, prev.coherence + (selectedArtifact.coherenceBoost || 0)),
      realityAnchor: selectedArtifact.realityAnchorBoost 
        ? Math.min(100, prev.realityAnchor + selectedArtifact.realityAnchorBoost)
        : prev.realityAnchor,
      consciousness: selectedArtifact.consciousnessBoost
        ? Math.min(100, prev.consciousness + selectedArtifact.consciousnessBoost)
        : prev.consciousness,
      karma: selectedArtifact.karmaBalance
        ? Math.floor(prev.karma / 2)
        : prev.karma,
      artifacts: [...prev.artifacts, selectedArtifact]
    }));
    
    if (selectedArtifact.timeEffect !== undefined) {
      setTimeDistortion(selectedArtifact.timeEffect);
    }
    
    setDialogueHistory(prev => [...prev, { 
      type: 'system', 
      text: `You found: ${selectedArtifact.name}. ${selectedArtifact.description} ${selectedArtifact.rare ? '(RARE)' : ''}` 
    }]);
    
    // Achievement for rare artifact
    if (selectedArtifact.rare) {
      checkAchievements(identity, { special: 'rare_find' }, identity.traits);
    }
  };

  const addMemoryEcho = (text, x, y, color = 'white') => {
    setMemoryEchoes(prev => [...prev, { 
      text, 
      x, 
      y, 
      timestamp: Date.now(),
      color
    }].slice(-20));
  };

  const addSpecialEvent = (event) => {
    setSpecialEvents(prev => [...prev, event]);
  };

  const enterDeeperDream = () => {
    if (identity.dreamDepth >= 10) {
      setDialogueHistory(prev => [...prev, { 
        type: 'system', 
        text: "You cannot go deeper. This is the abyss of consciousness itself." 
      }]);
      return;
    }
    
    setIdentity(prev => ({
      ...prev,
      dreamDepth: prev.dreamDepth + 1,
      coherence: Math.max(0, prev.coherence - 15),
      consciousness: Math.max(0, prev.consciousness - 10)
    }));
    
    setDreamLayers(prev => prev + 1);
    setGlitchLevel(prev => Math.min(7, prev + 1));
    
    // Chance for special deep dream events
    if (identity.dreamDepth + 1 === 5) {
      setGamePhase('deep');
      addSpecialEvent('entered_deep_dreams');
    }
    
    addMemoryEcho("Descending deeper into dream...", 400, 300, 'purple');
  };

  const useDreamPower = (power) => {
    const powers = {
      timeline_sight: () => {
        setDialogueHistory(prev => [...prev, { 
          type: 'system', 
          text: "You glimpse parallel timelines. In one, you never started dreaming. In another, you became the dream itself." 
        }]);
        setIdentity(prev => ({ ...prev, consciousness: Math.min(100, prev.consciousness + 10) }));
      },
      true_naming: () => {
        const trueName = generateTrueName(identity);
        setDialogueHistory(prev => [...prev, { 
          type: 'system', 
          text: `You speak your true name: "${trueName}". Reality solidifies around you.` 
        }]);
        setIdentity(prev => ({ ...prev, coherence: Math.min(100, prev.coherence + 20) }));
      },
      echo_mastery: () => {
        setMemoryEchoes([]);
        setDialogueHistory(prev => [...prev, { 
          type: 'system', 
          text: "You conduct the symphony of echoes into silence. Peace, at last." 
        }]);
      },
      memory_necromancy: () => {
        const resurrectedMemory = identity.memories[Math.floor(Math.random() * Math.min(5, identity.memories.length))];
        if (resurrectedMemory) {
          setDialogueHistory(prev => [...prev, { 
            type: 'system', 
            text: `You resurrect a dead memory: "${resurrectedMemory.id}". It shambles back to life, changed.` 
          }]);
          setIdentity(prev => ({ 
            ...prev, 
            memories: [...prev.memories, { ...resurrectedMemory, id: `undead_${resurrectedMemory.id}`, strength: 50 }]
          }));
        }
      }
    };
    
    if (powers[power]) {
      powers[power]();
    }
  };

  const generateTrueName = (identity) => {
    const prefixes = ['Dream', 'Echo', 'Mirror', 'Void', 'Star', 'Time'];
    const middles = identity.traits.kind > 70 ? ['heart', 'light', 'hope'] :
                   identity.traits.cruel > 70 ? ['shadow', 'thorn', 'ash'] :
                   ['walker', 'seeker', 'keeper'];
    const suffixes = identity.coherence > 70 ? ['eternal', 'unbroken', 'true'] :
                    identity.coherence < 30 ? ['fading', 'lost', 'forgotten'] :
                    ['wandering', 'shifting', 'becoming'];
    
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]}-${
      middles[Math.floor(Math.random() * middles.length)]}-${
      suffixes[Math.floor(Math.random() * suffixes.length)]}`;
  };

  // Multiple endings system
  const getEnding = () => {
    // Priority-based ending checks
    if (identity.coherence <= 0 && identity.consciousness <= 0) {
      return {
        type: 'oblivion',
        title: 'TOTAL OBLIVION',
        description: 'You have ceased to exist in any form. Even the dream cannot remember you.',
        canRestart: true,
        music: 'silence'
      };
    }
    
    if (identity.coherence >= 90 && identity.artifacts.length >= 10 && identity.karma > 50) {
      return {
        type: 'enlightened',
        title: 'DREAM ENLIGHTENMENT',
        description: 'You have transcended the dream while maintaining your true self. You are awake within sleep.',
        canRestart: false,
        special: true,
        unlock: 'enlightened_start'
      };
    }
    
    if (identity.quantumState === 'superposition' && quantumChoices.length > 5) {
      return {
        type: 'quantum',
        title: 'QUANTUM EXISTENCE',
        description: 'You exist in all states simultaneously. Every choice and its opposite are equally you.',
        canRestart: true,
        special: true,
        unlock: 'quantum_start'
      };
    }
    
    if (identity.fragmentedSelf.length >= 7) {
      return {
        type: 'shattered',
        title: 'INFINITE FRACTURE',
        description: 'You have become a constellation of selves, each star a different you.',
        canRestart: true,
        unlock: 'fractal_mode'
      };
    }
    
    if (identity.dreamDepth >= 10) {
      return {
        type: 'abyss',
        title: 'DREAM ABYSS',
        description: 'You have descended beyond all boundaries. Here, at the bottom of consciousness, you find...',
        canRestart: true,
        special: true,
        unlock: 'abyss_knowledge'
      };
    }
    
    if (identity.karma <= -100) {
      return {
        type: 'nightmare_lord',
        title: 'NIGHTMARE INCARNATE',
        description: 'You have become the terror that haunts all dreams. The darkness bows to you.',
        canRestart: true,
        unlock: 'nightmare_powers'
      };
    }
    
    if (identity.voidWhispers.length > 5) {
      return {
        type: 'void_merged',
        title: 'ONE WITH VOID',
        description: 'The whispers were true. You were nothing all along. And nothing is everything.',
        canRestart: true,
        special: true
      };
    }
    
    if (identity.dreamCompanions.length >= 5 && identity.karma > 70) {
      return {
        type: 'dream_family',
        title: 'FOUND FAMILY',
        description: 'You may have lost yourself, but you found others. Together, you create a new reality.',
        canRestart: false,
        special: true
      };
    }
    
    if (identity.temporalLoops > 10) {
      return {
        type: 'eternal_return',
        title: 'ETERNAL RECURSION',
        description: 'You are the loop. The loop is you. Beginning is end is beginning is...',
        canRestart: true,
        unlock: 'loop_mastery'
      };
    }
    
    // Default endings based on state
    if (identity.coherence <= 0) {
      return {
        type: 'forgotten',
        title: 'FORGOTTEN',
        description: 'The dream no longer remembers you. You have become nothing.',
        canRestart: true
      };
    }
    
    return null;
  };

  const ending = getEnding();

  // Render ending screen
  if (ending) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Ending-specific background effects */}
        {ending.type === 'enlightened' && (
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-radial from-golden-500 via-transparent to-transparent opacity-30 animate-pulse" />
          </div>
        )}
        
        {ending.type === 'quantum' && (
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="absolute inset-0 opacity-20" 
                   style={{
                     transform: `scale(${1 + i * 0.1}) rotate(${i * 72}deg)`,
                     animation: `spin ${10 + i * 2}s linear infinite`
                   }}>
                <div className="w-full h-full bg-gradient-conic from-purple-500 via-blue-500 to-purple-500" />
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center z-10 max-w-2xl px-8">
          <h1 className={`text-6xl font-serif mb-8 ${
            ending.special ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse' : 
            'text-white opacity-20'
          }`}>
            {ending.title}
          </h1>
          
          <p className="text-gray-400 mb-8 text-lg leading-relaxed">{ending.description}</p>
          
          {/* Ending statistics */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8 text-sm text-gray-600">
            <div>Total Choices: {metaProgress.totalChoices}</div>
            <div>Artifacts Found: {identity.artifacts.length}</div>
            <div>Dream Depth Reached: {identity.dreamDepth}</div>
            <div>Secrets Discovered: {identity.secretsFound}</div>
            <div>Final Karma: {identity.karma}</div>
            <div>Companions: {identity.dreamCompanions.length}</div>
            {identity.dreamPowers.length > 0 && (
              <div className="col-span-2">Powers: {identity.dreamPowers.join(', ')}</div>
            )}
            {ending.unlock && (
              <div className="col-span-2 text-purple-400">Unlocked: {ending.unlock}</div>
            )}
          </div>
          
          {/* Restart options */}
          {ending.canRestart && (
            <div className="space-y-4">
              <button 
                onClick={() => window.location.reload()} 
                className="text-white opacity-50 hover:opacity-100 transition-opacity"
              >
                Begin anew...
              </button>
              
              {ending.unlock && (
                <p className="text-purple-400 text-sm">
                  Your next dream will remember this achievement
                </p>
              )}
            </div>
          )}
          
          {!ending.canRestart && (
            <div className="mt-8">
              <p className="text-gold-400 text-lg">You have achieved true awakening.</p>
              <p className="text-gray-600 text-sm mt-2">The dream can no longer hold you.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Splash screen
  if (gameState === 'splash') {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center animate-pulse">
          <h2 className="text-2xl text-gray-600 tracking-[0.5em]">
            A DREAM ENGINE PRODUCTION
          </h2>
        </div>
      </div>
    );
  }

  // Trailer
  if (gameState === 'trailer') {
    return (
      <div className="w-full h-screen bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className={`w-full h-full ${trailerPhase % 2 === 0 ? 'bg-red-900' : ''}`} 
               style={{
                 animation: trailerPhase > 5 ? 'pulse 0.3s infinite' : 'none',
                 filter: `hue-rotate(${trailerPhase * 45}deg)`
               }} />
        </div>
        
        {trailerPhase === 1 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500 italic text-xl transition-opacity duration-1000">
              "Who... were you again?"
            </p>
          </div>
        )}
        
        {trailerPhase === 2 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 transition-opacity duration-1000">
              <Clock className="w-16 h-16 mx-auto text-gray-400 animate-spin" style={{animationDirection: 'reverse'}} />
              <p className="text-gray-400">Time flows backwards here...</p>
            </div>
          </div>
        )}
        
        {trailerPhase === 3 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-3xl font-serif transition-opacity duration-1000">
              Every choice reveals who you are...
            </h3>
          </div>
        )}
        
        {trailerPhase === 4 && (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="max-w-lg transition-opacity duration-1000 space-y-4">
              <p className="text-yellow-300">"You said you'd protect me. Or... did you hurt me?"</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>[Memory conflict detected]</span>
                <span className="text-red-400">[Identity unstable]</span>
              </div>
            </div>
          </div>
        )}
        
        {trailerPhase === 5 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-3xl font-serif transition-opacity duration-1000 text-red-300">
              ...but this world forgets.
            </h3>
          </div>
        )}
        
        {trailerPhase === 6 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-8 text-center transition-opacity duration-1000">
              <Brain className="w-20 h-20 mx-auto text-red-500 animate-pulse" />
              <div className="space-y-2">
                <p className="text-2xl" style={{
                  textShadow: '0.05em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.05em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75)'
                }}>IDENTITY NOT FOUND</p>
                <p className="text-gray-500">Reconstructing dream...</p>
              </div>
            </div>
          </div>
        )}
        
        {trailerPhase === 7 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-3xl transition-opacity duration-1000">
              "No—wait. That's me. <span className="opacity-50">That's me.</span>"
            </p>
          </div>
        )}
        
        {trailerPhase === 8 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 transition-opacity duration-1000">
              <h1 className="text-8xl font-serif tracking-widest" style={{
                textShadow: '0.05em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.05em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75)'
              }}>REVERIE</h1>
              <p className="text-xl text-gray-400">The Game That Forgets You</p>
            </div>
          </div>
        )}
        
        {trailerPhase === 9 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-center space-y-8 transition-opacity duration-1000">
              <Key className="w-12 h-12 mx-auto text-gray-600 animate-pulse" />
              <p className="text-gray-400 text-lg">Remember, or be forgotten.</p>
            </div>
          </div>
        )}
        
        <button 
          onClick={() => setGameState('title')}
          className="absolute bottom-4 right-4 text-gray-600 text-sm hover:text-white transition-colors"
        >
          Skip →
        </button>
      </div>
    );
  }

  // Title screen
  if (gameState === 'title') {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, black 100%)',
            filter: 'url(#distortion)'
          }}
        />
        
        <svg width="0" height="0">
          <filter id="distortion">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="5" result="turbulence"/>
            <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="10" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </svg>
        
        <div className="text-center z-10">
          <h1 className="text-8xl font-serif text-white mb-4 tracking-widest opacity-90">
            REVERIE
          </h1>
          <p className="text-xl text-gray-400 mb-12 italic">The Game That Forgets You</p>
          
          <button
            onClick={startGame}
            className="px-8 py-4 bg-white bg-opacity-10 text-white border border-white border-opacity-30 
                     hover:bg-opacity-20 transition-all duration-500 text-lg tracking-wide"
          >
            BEGIN DREAM
          </button>
          
          {metaProgress.playthroughs > 0 && (
            <div className="mt-8 text-gray-600 text-sm">
              <p>Dreams remembered: {metaProgress.playthroughs}</p>
              {metaProgress.secretEndings.length > 0 && (
                <p>Secret endings found: {metaProgress.secretEndings.length}</p>
              )}
            </div>
          )}
          
          <p className="text-gray-600 mt-8 text-sm">Remember, or be forgotten.</p>
        </div>
      </div>
    );
  }

  // Main game screen
  return (
    <div className="w-full h-screen bg-black text-white relative overflow-hidden">
      {/* Background distortion canvas */}
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600} 
        className="absolute inset-0 w-full h-full opacity-30"
        style={{
          filter: `hue-rotate(${environmentState.colorShift}deg)`,
          transform: `scale(${2 - environmentState.gravity}) ${environmentState.dimension === '4D' ? 'rotateX(10deg)' : ''}`
        }}
      />
      
      {/* Multi-layered glitch overlays */}
      <div 
        className={`absolute inset-0 pointer-events-none ${glitchLevel > 2 ? 'animate-pulse' : ''}`}
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 0, 0, ${glitchLevel * 0.02}) 2px,
            rgba(255, 0, 0, ${glitchLevel * 0.02}) 3px
          )`,
          filter: glitchLevel > 3 ? 'hue-rotate(90deg)' : 'none',
          animation: timeDistortion !== 1 ? `spin ${2 / timeDistortion}s linear infinite` : 'none'
        }}
      />
      
      {glitchLevel > 5 && (
        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-20">
          <div className="w-full h-full bg-gradient-to-b from-red-500 via-transparent to-blue-500 animate-pulse" />
        </div>
      )}
      
      {/* Environmental effects */}
      {environmentState.weather === 'stormy' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="lightning" />
        </div>
      )}
      
      {environmentState.weather === 'foggy' && (
        <div className="absolute inset-0 pointer-events-none bg-gray-500 opacity-20 animate-pulse" />
      )}
      
      {/* Status indicators */}
      <div className="absolute top-4 left-4 z-20 space-y-2">
        {identity.dreamDepth > 0 && (
          <div className="flex items-center gap-2 text-purple-400">
            <Moon className="w-5 h-5" />
            <span className="text-sm">Dream Layer {identity.dreamDepth}</span>
          </div>
        )}
        
        {identity.quantumState !== 'stable' && (
          <div className="flex items-center gap-2 text-cyan-400">
            <Zap className="w-5 h-5" />
            <span className="text-sm">Quantum: {identity.quantumState}</span>
          </div>
        )}
        
        {identity.temporalLoops > 0 && (
          <div className="flex items-center gap-2 text-yellow-400">
            <Clock className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loop #{identity.temporalLoops}</span>
          </div>
        )}
      </div>
      
      {/* Dream powers quick access */}
      {identity.dreamPowers.length > 0 && (
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          {identity.dreamPowers.slice(0, 5).map((power, i) => (
            <button
              key={i}
              onClick={() => useDreamPower(power)}
              className="p-2 bg-purple-900 bg-opacity-50 border border-purple-500 border-opacity-50 
                       hover:bg-opacity-70 transition-all rounded-full group relative"
            >
              <Sparkles className="w-4 h-4" />
              <div className="absolute top-full mt-2 right-0 bg-black bg-opacity-90 text-white text-xs 
                            p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {power.replace(/_/g, ' ')}
              </div>
            </button>
          ))}
        </div>
      )}
      
      {/* Game UI */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Expanded Status Bar */}
        <div className="p-4 bg-black bg-opacity-50 border-b border-gray-800">
          <div className="grid grid-cols-3 gap-4">
            {/* Left: Core stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Brain className={`w-6 h-6 ${identity.coherence < 30 ? 'text-red-500 animate-pulse' : 'text-white'}`} />
                <div>
                  <div className="text-xs text-gray-400">Coherence</div>
                  <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        identity.coherence > 70 ? 'bg-green-500' :
                        identity.coherence > 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${identity.coherence}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Shield className={`w-6 h-6 ${identity.realityAnchor < 30 ? 'text-purple-500 animate-pulse' : 'text-blue-400'}`} />
                <div>
                  <div className="text-xs text-gray-400">Reality</div>
                  <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-400 transition-all duration-1000"
                      style={{ width: `${identity.realityAnchor}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Eye className={`w-6 h-6 ${identity.consciousness < 30 ? 'text-orange-500 animate-pulse' : 'text-orange-400'}`} />
                <div>
                  <div className="text-xs text-gray-400">Awareness</div>
                  <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-400 transition-all duration-1000"
                      style={{ width: `${identity.consciousness}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Center: Karma and currency */}
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-xs text-gray-400">Karma</div>
                <div className="text-lg font-bold">
                  <span className={identity.karma > 0 ? 'text-blue-400' : identity.karma < 0 ? 'text-red-400' : 'text-gray-400'}>
                    {identity.karma > 0 ? '+' : ''}{identity.karma}
                  </span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-xs text-gray-400">Dream Shards</div>
                <div className="text-lg font-bold text-purple-400">
                  <Gem className="inline w-4 h-4 mr-1" />
                  {identity.dreamCurrency}
                </div>
              </div>
            </div>
            
            {/* Right: Artifacts and companions */}
            <div className="flex items-center justify-end gap-4">
              <div className="flex gap-1">
                {identity.dreamCompanions.slice(0, 3).map((companion, i) => (
                  <div key={i} className="relative group">
                    <Users className="w-5 h-5 text-green-400" />
                    <div className="absolute bottom-full mb-2 right-0 bg-black bg-opacity-90 text-white text-xs 
                                  p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {companion.id} (Loyalty: {companion.loyalty})
                    </div>
                  </div>
                ))}
                {identity.dreamCompanions.length > 3 && (
                  <span className="text-xs text-gray-400">+{identity.dreamCompanions.length - 3}</span>
                )}
              </div>
              
              <div className="flex gap-1">
                {identity.artifacts.slice(-6).map((artifact, i) => {
                  const Icon = artifact.icon;
                  return (
                    <div key={i} className="relative group">
                      <Icon className={`w-5 h-5 ${artifact.rare ? 'text-yellow-400' : 'text-blue-400'}`} />
                      <div className="absolute bottom-full mb-2 right-0 bg-black bg-opacity-90 text-white text-xs 
                                    p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        <div className="font-bold">{artifact.name}</div>
                        <div className="text-gray-400">{artifact.description}</div>
                      </div>
                    </div>
                  );
                })}
                {identity.artifacts.length > 6 && (
                  <span className="text-xs text-gray-400">+{identity.artifacts.length - 6}</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Environment status */}
          <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-500">
            <span>Reality: {environmentState.reality}</span>
            <span>Time: {environmentState.timeFlow}</span>
            <span>Dimension: {environmentState.dimension}</span>
            <span>Phase: {gamePhase}</span>
          </div>
        </div>
        
        {/* Main Game Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
          {/* Void whispers overlay */}
          {identity.voidWhispers.length > 0 && Math.random() > 0.9 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-gray-800 text-6xl font-serif opacity-20 animate-pulse">
                {identity.voidWhispers[Math.floor(Math.random() * identity.voidWhispers.length)]}
              </p>
            </div>
          )}
          
          {currentScene && (
            <div className="max-w-3xl w-full">
              {/* Scene description with dynamic styling */}
              <p className={`text-xl mb-8 leading-relaxed transition-all duration-500 ${
                glitchLevel > 2 ? 'blur-[0.5px]' : ''
              } ${environmentState.timeFlow === 'backwards' ? 'animate-pulse' : ''}
              ${environmentState.temperature === 'cold' ? 'text-blue-100' : 
                environmentState.temperature === 'warm' ? 'text-orange-100' : 'text-white'}`}>
                {currentScene.description}
              </p>
              
              {/* Choice grid */}
              <div className="grid gap-4">
                {currentScene.choices.filter(choice => 
                  !choice.requirement || choice.requirement
                ).map((choice, i) => (
                  <button
                    key={i}
                    onClick={() => makeChoice(choice)}
                    disabled={choice.cost && identity.dreamCurrency < choice.cost}
                    className={`w-full p-4 border transition-all duration-300 text-left
                             hover:shadow-lg relative overflow-hidden group
                             ${choice.cost && identity.dreamCurrency < choice.cost ? 
                               'bg-gray-900 border-gray-700 opacity-50 cursor-not-allowed' :
                               choice.special === 'boss_trigger' ? 
                               'bg-red-900 bg-opacity-20 border-red-500 border-opacity-50 hover:bg-opacity-30' :
                               choice.karma && choice.karma > 20 ?
                               'bg-blue-900 bg-opacity-10 border-blue-500 border-opacity-30 hover:bg-opacity-20' :
                               choice.karma && choice.karma < -20 ?
                               'bg-red-900 bg-opacity-10 border-red-500 border-opacity-30 hover:bg-opacity-20' :
                               'bg-white bg-opacity-5 border-white border-opacity-20 hover:bg-opacity-10'}`}
                    style={{
                      animation: environmentState.gravity < 1 ? 'float 3s ease-in-out infinite' : 'none',
                      animationDelay: `${i * 0.5}s`
                    }}
                  >
                    {/* Choice ripple effect */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 
                                  transition-opacity duration-300 rounded" />
                    
                    {/* Choice text */}
                    <div className="relative z-10">
                      {choice.text}
                      
                      {/* Choice metadata */}
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        {choice.cost && (
                          <span className="text-purple-400">
                            <Gem className="inline w-3 h-3 mr-1" />
                            Cost: {choice.cost}
                          </span>
                        )}
                        {choice.karma && Math.abs(choice.karma) > 10 && (
                          <span className={choice.karma > 0 ? 'text-blue-400' : 'text-red-400'}>
                            Karma: {choice.karma > 0 ? '+' : ''}{choice.karma}
                          </span>
                        )}
                        {choice.dreamPower && (
                          <span className="text-purple-400">
                            <Sparkles className="inline w-3 h-3 mr-1" />
                            Grants power
                          </span>
                        )}
                        {choice.artifact && (
                          <span className="text-yellow-400">
                            <Star className="inline w-3 h-3 mr-1" />
                            Contains artifact
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
                
                {/* Special actions */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {Math.random() > 0.6 && (
                    <button
                      onClick={findArtifact}
                      className="p-3 bg-blue-900 bg-opacity-20 border border-blue-500 border-opacity-30
                               hover:bg-opacity-30 transition-all duration-300 text-blue-300 text-sm"
                    >
                      <Eye className="inline w-4 h-4 mr-2" />
                      Search for memories...
                    </button>
                  )}
                  
                  {identity.dreamDepth < 10 && identity.coherence < 60 && (
                    <button
                      onClick={enterDeeperDream}
                      className="p-3 bg-purple-900 bg-opacity-20 border border-purple-500 border-opacity-30
                               hover:bg-opacity-30 transition-all duration-300 text-purple-300 text-sm"
                    >
                      <Moon className="inline w-4 h-4 mr-2" />
                      Descend deeper...
                    </button>
                  )}
                  
                  {identity.memories.length > 10 && (
                    <button
                      onClick={() => setGameState('journal')}
                      className="p-3 bg-green-900 bg-opacity-20 border border-green-500 border-opacity-30
                               hover:bg-opacity-30 transition-all duration-300 text-green-300 text-sm"
                    >
                      <BookOpen className="inline w-4 h-4 mr-2" />
                      Dream journal...
                    </button>
                  )}
                  
                  {identity.fragmentedSelf.length > 0 && (
                    <button
                      className="p-3 bg-red-900 bg-opacity-20 border border-red-500 border-opacity-30
                               hover:bg-opacity-30 transition-all duration-300 text-red-300 text-sm"
                    >
                      <Ghost className="inline w-4 h-4 mr-2" />
                      {identity.fragmentedSelf.length} fragments drift nearby...
                    </button>
                  )}
                </div>
              </div>
              
              {/* Achievement notifications */}
              {identity.achievements.length > 0 && identity.achievements[identity.achievements.length - 1] && (
                <div className="mt-6 p-4 bg-yellow-900 bg-opacity-20 border border-yellow-500 border-opacity-30 animate-pulse">
                  <p className="text-yellow-300 text-sm">
                    <Crown className="inline w-4 h-4 mr-2" />
                    Achievement Unlocked: {identity.achievements[identity.achievements.length - 1]}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Enhanced Dialogue History */}
        <div className="h-48 bg-black bg-opacity-50 border-t border-gray-800 p-4 overflow-y-auto">
          <div className="space-y-2">
            {dialogueHistory.slice(-5).map((dialogue, i) => (
              <div key={i} className={`text-sm ${
                dialogue.type === 'npc' ? 'text-yellow-300' : 
                dialogue.type === 'system' ? 'text-blue-300' : 'text-gray-400'
              } ${i === dialogueHistory.length - 1 ? 'animate-pulse' : ''}`}>
                {dialogue.type === 'npc' && <span className="text-gray-600 mr-2">[Entity]</span>}
                {dialogue.type === 'system' && <span className="text-gray-600 mr-2">[System]</span>}
                {dialogue.text}
              </div>
            ))}
          </div>
          
          {/* Companion comments */}
          {identity.dreamCompanions.length > 0 && Math.random() > 0.8 && (
            <div className="text-sm text-green-300 mt-2 italic">
              {identity.dreamCompanions[0].id} whispers: "I'm still here with you..."
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .lightning {
          position: absolute;
          top: 0;
          left: 50%;
          width: 2px;
          height: 100%;
          background: white;
          opacity: 0;
          animation: lightning 4s infinite;
        }
        
        @keyframes lightning {
          0%, 90%, 100% { opacity: 0; }
          95% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default REVERIE;
