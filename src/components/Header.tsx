import spedraLogo from "@/assets/spedra-logo.png";
import GlitchText from "./GlitchText";
import LanguageToggle from "./LanguageToggle";
import FullscreenToggle from "./FullscreenToggle";
import SoundToggle from "./SoundToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSound } from "@/contexts/SoundContext";

const Header = () => {
  const { t } = useLanguage();
  const { playSound, toggleSound } = useSound();

  return (
    <header className="relative py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <SoundToggle onToggle={toggleSound} playSound={playSound} />
          </div>
          <FullscreenToggle />
        </div>
        
        {/* Logo */}
        <div 
          className="relative mb-4 float mt-12 cursor-pointer"
          onMouseEnter={() => playSound("hover")}
          onClick={() => playSound("notification")}
        >
          <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl animate-pulse" />
          <img 
            src={spedraLogo} 
            alt="Spedra Logo" 
            className="relative w-64 h-auto drop-shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Title */}
        <GlitchText 
          text="SPEDRA" 
          as="h1"
          className="text-5xl md:text-7xl font-bold text-primary text-glow tracking-widest mb-2"
        />
        
        {/* Tagline */}
        <p className="font-mono text-muted-foreground text-sm md:text-base tracking-wide animate-fade-in">
          <span className="text-primary">[</span>
          {t.tagline}
          <span className="text-primary">]</span>
        </p>
        
        {/* Decorative line */}
        <div className="mt-6 w-64 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>
    </header>
  );
};

export default Header;
