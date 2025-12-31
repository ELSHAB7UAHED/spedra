import React, { createContext, useContext, ReactNode, useCallback } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

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

interface SoundContextType {
  playSound: (type: SoundType) => Promise<void>;
  toggleSound: (enabled: boolean) => void;
  isSoundEnabled: () => boolean;
  initAudioContext: () => AudioContext;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const soundEffects = useSoundEffects();

  return (
    <SoundContext.Provider value={soundEffects}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
