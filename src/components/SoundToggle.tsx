import { Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SoundToggleProps {
  onToggle: (enabled: boolean) => void;
  playSound: (type: "click") => void;
}

const SoundToggle = ({ onToggle, playSound }: SoundToggleProps) => {
  const { t, isRTL } = useLanguage();
  const [enabled, setEnabled] = useState(() => {
    const saved = localStorage.getItem("spedra-sound");
    return saved !== "false";
  });

  useEffect(() => {
    localStorage.setItem("spedra-sound", String(enabled));
    onToggle(enabled);
  }, [enabled, onToggle]);

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    if (newState) {
      playSound("click");
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        relative p-2 rounded-xl transition-all duration-300
        ${enabled 
          ? "bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20" 
          : "bg-muted/30 border border-muted/50 text-muted-foreground hover:bg-muted/50"
        }
      `}
      title={enabled ? "Mute sounds" : "Enable sounds"}
    >
      {/* Animated sound waves */}
      {enabled && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-8 h-8 rounded-full border border-primary/30 animate-ping opacity-30" />
        </div>
      )}
      
      {enabled ? (
        <Volume2 className="w-5 h-5 relative z-10" />
      ) : (
        <VolumeX className="w-5 h-5 relative z-10" />
      )}
    </button>
  );
};

export default SoundToggle;
