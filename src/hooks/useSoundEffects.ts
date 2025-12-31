import { useCallback, useRef, useEffect } from "react";

type SoundType = 
  | "start" 
  | "complete" 
  | "ping" 
  | "download" 
  | "upload" 
  | "click" 
  | "hover" 
  | "success" 
  | "error"
  | "notification";

interface SoundConfig {
  frequencies: number[];
  durations: number[];
  types: OscillatorType[];
  volumes: number[];
  delays: number[];
}

const SOUND_CONFIGS: Record<SoundType, SoundConfig> = {
  start: {
    frequencies: [440, 880, 1320],
    durations: [0.1, 0.1, 0.15],
    types: ["sine", "sine", "sine"],
    volumes: [0.3, 0.25, 0.2],
    delays: [0, 0.08, 0.16],
  },
  complete: {
    frequencies: [523, 659, 784, 1047],
    durations: [0.15, 0.15, 0.15, 0.3],
    types: ["sine", "sine", "sine", "sine"],
    volumes: [0.25, 0.25, 0.25, 0.3],
    delays: [0, 0.1, 0.2, 0.3],
  },
  ping: {
    frequencies: [1000, 1200],
    durations: [0.05, 0.08],
    types: ["sine", "sine"],
    volumes: [0.2, 0.15],
    delays: [0, 0.03],
  },
  download: {
    frequencies: [600, 800, 1000],
    durations: [0.08, 0.08, 0.1],
    types: ["sine", "triangle"],
    volumes: [0.2, 0.18, 0.15],
    delays: [0, 0.05, 0.1],
  },
  upload: {
    frequencies: [800, 1000, 1200],
    durations: [0.08, 0.08, 0.1],
    types: ["sine", "triangle"],
    volumes: [0.2, 0.18, 0.15],
    delays: [0, 0.05, 0.1],
  },
  click: {
    frequencies: [800, 1200],
    durations: [0.03, 0.05],
    types: ["sine", "sine"],
    volumes: [0.15, 0.1],
    delays: [0, 0.02],
  },
  hover: {
    frequencies: [1500],
    durations: [0.02],
    types: ["sine"],
    volumes: [0.08],
    delays: [0],
  },
  success: {
    frequencies: [523, 659, 784],
    durations: [0.1, 0.1, 0.2],
    types: ["sine", "sine", "sine"],
    volumes: [0.2, 0.2, 0.25],
    delays: [0, 0.08, 0.16],
  },
  error: {
    frequencies: [200, 150],
    durations: [0.15, 0.2],
    types: ["sawtooth", "sawtooth"],
    volumes: [0.15, 0.12],
    delays: [0, 0.1],
  },
  notification: {
    frequencies: [880, 1100, 880],
    durations: [0.08, 0.08, 0.1],
    types: ["sine", "sine", "sine"],
    volumes: [0.18, 0.2, 0.15],
    delays: [0, 0.08, 0.16],
  },
};

export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef<boolean>(true);

  // Initialize AudioContext on first user interaction
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Resume audio context if suspended
  const resumeAudioContext = useCallback(async () => {
    const ctx = initAudioContext();
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
    return ctx;
  }, [initAudioContext]);

  // Play a single tone
  const playTone = useCallback((
    ctx: AudioContext,
    frequency: number,
    duration: number,
    type: OscillatorType,
    volume: number,
    delay: number
  ) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + delay);

    // Envelope for smoother sound
    gainNode.gain.setValueAtTime(0, ctx.currentTime + delay);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

    oscillator.start(ctx.currentTime + delay);
    oscillator.stop(ctx.currentTime + delay + duration + 0.01);
  }, []);

  // Play a sound effect
  const playSound = useCallback(async (type: SoundType) => {
    if (!enabledRef.current) return;

    try {
      const ctx = await resumeAudioContext();
      const config = SOUND_CONFIGS[type];

      config.frequencies.forEach((freq, index) => {
        playTone(
          ctx,
          freq,
          config.durations[index] || config.durations[0],
          config.types[index % config.types.length] || "sine",
          config.volumes[index] || config.volumes[0],
          config.delays[index] || 0
        );
      });
    } catch (error) {
      console.log("Sound effect error:", error);
    }
  }, [resumeAudioContext, playTone]);

  // Toggle sound on/off
  const toggleSound = useCallback((enabled: boolean) => {
    enabledRef.current = enabled;
  }, []);

  // Get sound enabled state
  const isSoundEnabled = useCallback(() => {
    return enabledRef.current;
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    playSound,
    toggleSound,
    isSoundEnabled,
    initAudioContext,
  };
};

// Create a singleton context for sound effects
let globalPlaySound: ((type: SoundType) => Promise<void>) | null = null;

export const setGlobalPlaySound = (fn: (type: SoundType) => Promise<void>) => {
  globalPlaySound = fn;
};

export const playGlobalSound = (type: SoundType) => {
  if (globalPlaySound) {
    globalPlaySound(type);
  }
};
