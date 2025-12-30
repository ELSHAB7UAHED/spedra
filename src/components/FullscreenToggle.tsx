import { useFullscreen } from "@/hooks/useFullscreen";
import { useLanguage } from "@/contexts/LanguageContext";
import { Maximize, Minimize } from "lucide-react";

const FullscreenToggle = () => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { t } = useLanguage();

  return (
    <button
      onClick={toggleFullscreen}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-secondary/30 
                 hover:border-secondary hover:shadow-[0_0_20px_hsl(var(--secondary)/0.3)] 
                 transition-all duration-300 group"
      title={isFullscreen ? t.exitFullscreen : t.fullscreen}
    >
      {isFullscreen ? (
        <Minimize className="w-4 h-4 text-secondary group-hover:animate-pulse" />
      ) : (
        <Maximize className="w-4 h-4 text-secondary group-hover:animate-pulse" />
      )}
    </button>
  );
};

export default FullscreenToggle;
