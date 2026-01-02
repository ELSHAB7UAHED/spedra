import developerPhoto from "@/assets/developer-photo.png";
import { Globe, Mail, Phone, Code2, Terminal, Cpu, Rocket, Shield, Wifi, Database, Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSound } from "@/contexts/SoundContext";

const DeveloperCard = () => {
  const { t, isRTL } = useLanguage();
  const { playSound } = useSound();

  const skills = ["React", "TypeScript", "Node.js", "Next.js", "AI/ML"];

  const handleHover = () => {
    playSound("keypress");
  };

  return (
    <section className="py-16 px-4 relative">
      {/* Background cyber grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Floating binary decoration */}
        <div className="absolute -top-8 left-0 font-mono text-xs text-primary/20 select-none animate-pulse">
          01001000 01000001 01000011 01001011
        </div>
        <div className="absolute -top-8 right-0 font-mono text-xs text-secondary/20 select-none animate-pulse" style={{ animationDelay: '0.5s' }}>
          01010011 01011001 01010011 01010100
        </div>

        {/* Title - Terminal Style */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card/80 border border-primary/40 backdrop-blur-sm font-mono text-sm mb-4">
            <span className="text-green-400">root@spedra</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-primary">~</span>
            <span className="text-muted-foreground">$</span>
            <span className="text-foreground ml-1">./show_developer.sh</span>
            <span className="w-2 h-4 bg-primary animate-pulse" />
          </div>
          
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-primary/10 via-card/80 to-secondary/10 border border-primary/30 backdrop-blur-sm">
            <Terminal className="w-5 h-5 text-green-400" />
            <span className="font-display text-xl text-foreground">{t.developedBy}</span>
            <Shield className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Main Card */}
        <div className="relative group animate-scale-in" style={{ animationDelay: '0.1s' }}>
          {/* Animated border glow */}
          <div className="absolute -inset-[2px] bg-gradient-to-r from-primary via-green-400 to-secondary rounded-2xl opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute -inset-[1px] bg-gradient-to-r from-primary via-green-400 to-secondary rounded-2xl opacity-40" />
          
          <div className="relative bg-[#0a0f0a]/95 backdrop-blur-xl rounded-2xl overflow-hidden border border-green-400/20">
            {/* Top bar - Terminal header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#1a1f1a] border-b border-green-400/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="font-mono text-xs text-green-400/60 flex items-center gap-2">
                <Lock className="w-3 h-3" />
                <span>secure_connection</span>
                <Wifi className="w-3 h-3 animate-pulse" />
              </div>
              <div className="font-mono text-xs text-primary/60">
                PID: 1337
              </div>
            </div>

            {/* Scan line effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/5 to-transparent h-[200%] animate-[scan_4s_linear_infinite]" />
            </div>
            
            <div className="p-8 md:p-12 relative">
              <div className="flex flex-col lg:flex-row items-center gap-10">
                {/* Photo Container - Hexagonal style */}
                <div className="relative flex-shrink-0 group/photo">
                  {/* Rotating ring */}
                  <div className="absolute inset-[-12px] rounded-full border-2 border-dashed border-primary/30 animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-[-20px] rounded-full border border-green-400/20 animate-[spin_30s_linear_infinite_reverse]" />
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/40 via-primary/40 to-secondary/40 rounded-full blur-xl group-hover/photo:blur-2xl transition-all duration-500" />
                  
                  {/* Photo frame */}
                  <div className="relative w-40 h-40 md:w-48 md:h-48">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 via-primary to-secondary p-[3px]">
                      <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0f0a]">
                        <img 
                          src={developerPhoto} 
                          alt={t.developerName}
                          className="w-full h-full object-cover object-top group-hover/photo:scale-110 transition-transform duration-700 mix-blend-normal"
                        />
                        {/* Overlay scan effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-green-400/10 via-transparent to-green-400/10 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    
                    {/* Corner decorations */}
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-green-400" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-green-400" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-green-400" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-green-400" />
                  </div>
                  
                  {/* Status indicator */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a0f0a]/90 backdrop-blur-sm border border-green-400/40">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-xs font-mono text-green-400">ACTIVE</span>
                  </div>
                </div>

                {/* Info */}
                <div className={`flex-1 text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
                  {/* Access granted message */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-green-400/10 border border-green-400/30 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-mono text-xs text-green-400">ACCESS GRANTED</span>
                  </div>
                  
                  <h3 className="font-display text-4xl md:text-5xl font-bold mb-2 relative">
                    <span className="bg-gradient-to-r from-green-400 via-primary to-secondary bg-clip-text text-transparent">
                      {t.developerName}
                    </span>
                  </h3>
                  
                  <p className="font-mono text-lg md:text-xl text-green-400 mb-1 flex items-center justify-center lg:justify-start gap-2">
                    <Code2 className="w-5 h-5" />
                    <span>Full Stack Developer</span>
                  </p>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 font-mono text-sm text-muted-foreground">
                    <Database className="w-4 h-4 text-primary" />
                    <span>{t.location}</span>
                    <span className="text-xl">🇪🇬</span>
                  </div>
                  
                  {/* Skills - Chip style */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
                    {skills.map((skill, index) => (
                      <span 
                        key={skill}
                        onMouseEnter={handleHover}
                        className="group/skill relative px-4 py-2 rounded-lg bg-green-400/5 border border-green-400/30 text-sm font-mono text-green-400 hover:bg-green-400/15 hover:border-green-400/60 transition-all duration-300 cursor-default overflow-hidden"
                      >
                        {/* Hover shine effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent -translate-x-full group-hover/skill:translate-x-full transition-transform duration-500" />
                        <span className="relative flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400/60 group-hover/skill:bg-green-400 transition-colors" />
                          {skill}
                        </span>
                      </span>
                    ))}
                  </div>
                  
                  {/* Contact Links - Terminal commands style */}
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <a 
                      href="https://ahmednour.vercel.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onMouseEnter={handleHover}
                      className="group/link flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1a1f1a] border border-green-400/30 text-foreground hover:border-green-400 hover:bg-green-400/10 transition-all duration-300"
                    >
                      <Globe className="w-4 h-4 text-green-400 group-hover/link:animate-pulse" />
                      <span className="font-mono text-sm text-green-400">./portfolio</span>
                    </a>
                    
                    <a 
                      href="mailto:amedelshab7@gmail.com"
                      onMouseEnter={handleHover}
                      className="group/link flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1a1f1a] border border-primary/30 text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300"
                    >
                      <Mail className="w-4 h-4 text-primary group-hover/link:animate-pulse" />
                      <span className="font-mono text-sm text-primary">./email</span>
                    </a>
                    
                    <a 
                      href="tel:+201014812328"
                      onMouseEnter={handleHover}
                      className="group/link flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1a1f1a] border border-secondary/30 text-foreground hover:border-secondary hover:bg-secondary/10 transition-all duration-300"
                    >
                      <Phone className="w-4 h-4 text-secondary group-hover/link:animate-pulse" />
                      <span className="font-mono text-sm text-secondary" dir="ltr">./call</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Stats Bar */}
            <div className="px-6 pb-6">
              <div className="flex flex-wrap items-center justify-center gap-4 py-3 px-4 rounded-lg bg-[#1a1f1a] border border-green-400/20">
                <div onMouseEnter={handleHover} className="flex items-center gap-2 px-3 py-1 rounded bg-green-400/10 cursor-default">
                  <Cpu className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-mono text-green-400">5+ {isRTL ? 'سنوات' : 'YRS'}</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-green-400/30" />
                <div onMouseEnter={handleHover} className="flex items-center gap-2 px-3 py-1 rounded bg-primary/10 cursor-default">
                  <Rocket className="w-4 h-4 text-primary" />
                  <span className="text-sm font-mono text-primary">50+ {isRTL ? 'مشروع' : 'PROJECTS'}</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-green-400/30" />
                <div onMouseEnter={handleHover} className="flex items-center gap-2 px-3 py-1 rounded bg-secondary/10 cursor-default">
                  <Terminal className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-mono text-secondary">{isRTL ? 'متاح' : 'AVAILABLE'}</span>
                </div>
              </div>
            </div>

            {/* Bottom terminal line */}
            <div className="px-4 py-2 bg-[#1a1f1a] border-t border-green-400/20 font-mono text-xs text-green-400/40 flex items-center gap-2">
              <span className="text-green-400">❯</span>
              <span>system.ready</span>
              <span className="flex-1" />
              <span className="text-muted-foreground">[encrypted]</span>
            </div>
          </div>
        </div>

        {/* Bottom binary decoration */}
        <div className="mt-6 text-center font-mono text-xs text-primary/10 select-none">
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        </div>
      </div>
    </section>
  );
};

export default DeveloperCard;
