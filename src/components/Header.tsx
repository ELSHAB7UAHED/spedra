import spedraLogo from "@/assets/spedra-logo.png";
import GlitchText from "./GlitchText";

const Header = () => {
  return (
    <header className="relative py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Logo */}
        <div className="relative mb-4 float">
          <img 
            src={spedraLogo} 
            alt="Spedra Logo" 
            className="w-64 h-auto drop-shadow-[0_0_30px_hsl(var(--primary)/0.5)]"
          />
        </div>
        
        {/* Title */}
        <GlitchText 
          text="SPEDRA" 
          as="h1"
          className="text-5xl md:text-7xl font-bold text-primary text-glow tracking-widest mb-2"
        />
        
        {/* Tagline */}
        <p className="font-mono text-muted-foreground text-sm md:text-base tracking-wide">
          <span className="text-primary">[</span>
          قياس سرعة الإنترنت المتقدم
          <span className="text-primary">]</span>
        </p>
        
        {/* Decorative line */}
        <div className="mt-6 w-64 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>
    </header>
  );
};

export default Header;
