import developerPhoto from "@/assets/developer-photo.png";
import { Globe, Mail, Phone, Code2, Terminal, Cpu, Rocket, Sparkles, Zap, Star, Heart, Coffee, Braces, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

const DeveloperCard = () => {
  const { t, isRTL } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const skills = [
    { name: "React", icon: Code2, color: "from-primary to-cyan-400" },
    { name: "TypeScript", icon: Braces, color: "from-secondary to-blue-400" },
    { name: "Node.js", icon: Layers, color: "from-green-400 to-emerald-500" },
    { name: "Next.js", icon: Rocket, color: "from-foreground to-gray-400" },
    { name: "AI/ML", icon: Cpu, color: "from-accent to-pink-400" },
  ];

  const floatingIcons = [
    { Icon: Code2, delay: 0, duration: 12, size: 40, color: "primary" },
    { Icon: Terminal, delay: 2, duration: 10, size: 35, color: "secondary" },
    { Icon: Cpu, delay: 4, duration: 14, size: 38, color: "accent" },
    { Icon: Rocket, delay: 1, duration: 11, size: 36, color: "primary" },
    { Icon: Zap, delay: 3, duration: 13, size: 32, color: "neon-orange" },
    { Icon: Star, delay: 5, duration: 9, size: 30, color: "secondary" },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const card = document.getElementById('developer-card');
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 20;
        const y = (e.clientY - rect.top - rect.height / 2) / 20;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Epic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[120px] animate-electric-pulse" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 cyber-grid opacity-30" />
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(${160 + Math.random() * 160} 100% 50%)`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              boxShadow: `0 0 10px hsl(${160 + Math.random() * 160} 100% 50%)`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Epic Title */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            {/* Lightning effects */}
            <div className="absolute -inset-8 animate-lightning">
              <Zap className="absolute -top-4 -left-4 w-8 h-8 text-primary" />
              <Zap className="absolute -top-4 -right-4 w-8 h-8 text-secondary" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <div className="relative inline-flex items-center gap-4 px-8 py-4 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/30 backdrop-blur-xl overflow-hidden">
              {/* Scan line */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 w-full h-8 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent animate-cyber-scan" />
              </div>
              
              <Terminal className="w-6 h-6 text-primary animate-bounce" />
              <span className="font-display text-2xl md:text-3xl animate-text-flicker bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t.developedBy}
              </span>
              <Code2 className="w-6 h-6 text-accent animate-bounce" style={{ animationDelay: "0.3s" }} />
            </div>
          </div>
        </div>

        {/* Main Epic Card */}
        <div 
          id="developer-card"
          className="relative group perspective-1000"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated border gradient */}
          <div className="absolute -inset-[3px] rounded-[2rem] bg-gradient-to-r from-primary via-secondary via-accent to-primary bg-[length:200%_auto] animate-border-flow opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Electric field effect */}
          <div className="absolute -inset-6 rounded-[3rem] animate-glow-wave opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Main card */}
          <div 
            className="relative bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-2xl rounded-[2rem] border border-primary/30 overflow-hidden transition-transform duration-300"
            style={{
              transform: isHovered 
                ? `rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg) translateZ(20px)`
                : 'rotateX(0) rotateY(0) translateZ(0)',
            }}
          >
            {/* Top gradient bar with animation */}
            <div className="h-2 bg-gradient-to-r from-primary via-secondary via-accent to-primary bg-[length:200%_auto] animate-border-flow" />
            
            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none animate-holographic" />
            
            {/* Animated scan line */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-cyber-scan" />
            </div>
            
            {/* Floating particles inside card */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full animate-particle-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(var(--secondary))' : 'hsl(var(--accent))',
                    animationDelay: `${Math.random() * 6}s`,
                    animationDuration: `${4 + Math.random() * 4}s`,
                    opacity: 0.6,
                  }}
                />
              ))}
            </div>

            <div className="p-10 md:p-14 lg:p-20">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                {/* Photo Section with Epic Effects */}
                <div className="relative flex-shrink-0">
                  {/* Orbiting icons */}
                  <div className="absolute inset-0 w-full h-full">
                    {floatingIcons.map((item, i) => (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          animation: i % 2 === 0 ? `orbit ${item.duration}s linear infinite` : `orbit-reverse ${item.duration}s linear infinite`,
                          animationDelay: `${item.delay}s`,
                        }}
                      >
                        <div className={`w-12 h-12 rounded-2xl bg-card/80 backdrop-blur-sm border border-${item.color}/50 flex items-center justify-center shadow-lg animate-pulse`}>
                          <item.Icon className={`w-6 h-6 text-${item.color}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Multiple orbital rings */}
                  <svg className="absolute -inset-20 w-[calc(100%+10rem)] h-[calc(100%+10rem)] animate-[rotate_30s_linear_infinite]">
                    <defs>
                      <linearGradient id="ring1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                        <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
                      </linearGradient>
                    </defs>
                    <circle cx="50%" cy="50%" r="48%" fill="none" stroke="url(#ring1)" strokeWidth="2" strokeDasharray="10 20" />
                  </svg>
                  
                  <svg className="absolute -inset-14 w-[calc(100%+7rem)] h-[calc(100%+7rem)] animate-[rotate_20s_linear_infinite_reverse]">
                    <circle cx="50%" cy="50%" r="48%" fill="none" stroke="hsl(var(--secondary))" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="5 15" />
                  </svg>
                  
                  <svg className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] animate-[rotate_15s_linear_infinite]">
                    <circle cx="50%" cy="50%" r="48%" fill="none" stroke="hsl(var(--accent))" strokeOpacity="0.4" strokeWidth="1" />
                  </svg>
                  
                  {/* Photo frame with epic glow */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-full blur-xl opacity-60 animate-electric-pulse" />
                    <div className="absolute -inset-2 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 rounded-full animate-pulse" />
                    
                    <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden p-1.5 bg-gradient-to-br from-primary via-secondary to-accent animate-glow-wave">
                      <div className="w-full h-full rounded-full overflow-hidden bg-card p-1">
                        <img 
                          src={developerPhoto} 
                          alt={t.developerName}
                          className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-110"
                          style={{ objectPosition: "center 20%" }}
                        />
                      </div>
                    </div>
                    
                    {/* Status indicator */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-primary/30">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                      </span>
                      <span className="text-xs font-mono text-green-400">Online</span>
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className={`flex-1 text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
                  {/* Name with epic gradient */}
                  <div className="relative inline-block mb-4">
                    <h3 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold">
                      <span className="bg-gradient-to-r from-primary via-secondary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer">
                        {t.developerName}
                      </span>
                    </h3>
                    <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-primary animate-bounce" />
                  </div>
                  
                  {/* Title with glow */}
                  <div className="relative mb-3">
                    <p className="font-mono text-2xl md:text-3xl text-secondary animate-text-flicker">
                      Full Stack Developer
                    </p>
                  </div>
                  
                  {/* Location with flag */}
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-10">
                    <span className="text-4xl animate-bounce">🇪🇬</span>
                    <span className="text-xl font-mono text-muted-foreground">{t.location}</span>
                  </div>
                  
                  {/* Epic Skills */}
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
                    {skills.map((skill, index) => (
                      <div 
                        key={skill.name}
                        className="relative group/skill"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className={`absolute -inset-1 bg-gradient-to-r ${skill.color} rounded-2xl blur opacity-40 group-hover/skill:opacity-100 transition-opacity duration-300`} />
                        <div className="relative flex items-center gap-3 px-5 py-3 rounded-2xl bg-card border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:scale-105">
                          <skill.icon className="w-5 h-5 text-foreground group-hover/skill:animate-bounce" />
                          <span className="text-sm font-display text-foreground">{skill.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Epic Contact Links */}
                  <div className="flex flex-wrap gap-5 justify-center lg:justify-start">
                    <a 
                      href="https://ahmednour.vercel.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative group/link overflow-hidden"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-400 rounded-2xl blur opacity-50 group-hover/link:opacity-100 transition-opacity duration-300 animate-pulse" />
                      <div className="relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 hover:border-primary transition-all duration-300">
                        <Globe className="w-6 h-6 text-primary group-hover/link:animate-spin" style={{ animationDuration: '2s' }} />
                        <span className="font-display text-foreground">Portfolio</span>
                        <Rocket className="w-4 h-4 text-primary opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </div>
                    </a>
                    
                    <a 
                      href="mailto:amedelshab7@gmail.com"
                      className="relative group/link overflow-hidden"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-blue-400 rounded-2xl blur opacity-50 group-hover/link:opacity-100 transition-opacity duration-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <div className="relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-secondary/20 to-secondary/5 border border-secondary/30 hover:border-secondary transition-all duration-300">
                        <Mail className="w-6 h-6 text-secondary group-hover/link:animate-bounce" />
                        <span className="font-display text-foreground">Email</span>
                        <Heart className="w-4 h-4 text-secondary opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </div>
                    </a>
                    
                    <a 
                      href="tel:+201014812328"
                      className="relative group/link overflow-hidden"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-accent to-pink-400 rounded-2xl blur opacity-50 group-hover/link:opacity-100 transition-opacity duration-300 animate-pulse" style={{ animationDelay: '1s' }} />
                      <div className="relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-accent/20 to-accent/5 border border-accent/30 hover:border-accent transition-all duration-300">
                        <Phone className="w-6 h-6 text-accent group-hover/link:animate-pulse" />
                        <span className="font-display text-foreground" dir="ltr">+20 101 481 2328</span>
                        <Zap className="w-4 h-4 text-accent opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Epic Bottom Section */}
            <div className="px-10 pb-10">
              <div className="relative overflow-hidden flex flex-wrap items-center justify-center gap-8 py-6 px-8 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border border-primary/20">
                {/* Scan effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-cyber-scan" style={{ animationDuration: '4s' }} />
                </div>
                
                <div className="relative flex items-center gap-3">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500" />
                  </span>
                  <span className="font-display text-sm text-foreground">Available for hire</span>
                </div>
                
                <div className="w-px h-6 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden sm:block" />
                
                <div className="relative flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
                  <span className="font-display text-sm text-foreground">Open Source</span>
                </div>
                
                <div className="w-px h-6 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden sm:block" />
                
                <div className="relative flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-accent animate-bounce" />
                  <span className="font-display text-sm text-foreground">Caffeine Powered</span>
                </div>
                
                <div className="w-px h-6 bg-gradient-to-b from-transparent via-primary/50 to-transparent hidden sm:block" />
                
                <div className="relative flex items-center gap-3">
                  <Rocket className="w-5 h-5 text-primary animate-bounce" style={{ animationDelay: '0.5s' }} />
                  <span className="font-display text-sm text-foreground">2+ Years XP</span>
                </div>
              </div>
            </div>

            {/* Animated Corner Accents */}
            <div className="absolute top-6 left-6 w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-transparent animate-pulse" />
              <div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-primary to-transparent animate-pulse" />
            </div>
            <div className="absolute top-6 right-6 w-16 h-16">
              <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-secondary to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-0 right-0 h-full w-0.5 bg-gradient-to-b from-secondary to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <div className="absolute bottom-6 left-6 w-16 h-16">
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-0 left-0 h-full w-0.5 bg-gradient-to-t from-accent to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            <div className="absolute bottom-6 right-6 w-16 h-16">
              <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-primary to-transparent animate-pulse" style={{ animationDelay: '1.5s' }} />
              <div className="absolute bottom-0 right-0 h-full w-0.5 bg-gradient-to-t from-primary to-transparent animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperCard;
