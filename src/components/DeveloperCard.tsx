import developerPhoto from "@/assets/developer-photo.png";
import { Globe, Mail, Phone, Code2, Github, Linkedin, Terminal, Cpu, Database, Server, Sparkles, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DeveloperCard = () => {
  const { t, isRTL } = useLanguage();

  const skills = [
    { name: "React", icon: Code2, color: "text-primary" },
    { name: "TypeScript", icon: Terminal, color: "text-secondary" },
    { name: "Node.js", icon: Server, color: "text-primary" },
    { name: "Next.js", icon: Rocket, color: "text-foreground" },
    { name: "Database", icon: Database, color: "text-accent" },
    { name: "Cloud", icon: Cpu, color: "text-secondary" },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 backdrop-blur-sm">
            <Terminal className="w-5 h-5 text-primary animate-pulse" />
            <span className="font-display text-lg bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t.developedBy}
            </span>
            <Terminal className="w-5 h-5 text-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>

        {/* Main Card */}
        <div className="relative group">
          {/* Animated border gradient */}
          <div className="absolute -inset-[2px] bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl opacity-50 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -inset-[2px] bg-gradient-to-r from-accent via-primary to-secondary rounded-3xl opacity-30 blur-sm animate-pulse" style={{ animationDelay: "1s" }} />
          
          <div className="relative bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl rounded-3xl border border-primary/20 overflow-hidden">
            {/* Top gradient bar */}
            <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
            
            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${5 + Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>

            <div className="p-8 md:p-12 lg:p-16">
              <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                {/* Photo Section */}
                <div className="relative flex-shrink-0">
                  {/* Orbital rings */}
                  <svg className="absolute -inset-16 w-[calc(100%+8rem)] h-[calc(100%+8rem)] animate-[rotate_25s_linear_infinite]">
                    <circle cx="50%" cy="50%" r="48%" fill="none" stroke="hsl(160 100% 50% / 0.1)" strokeWidth="1" strokeDasharray="8 12" />
                  </svg>
                  <svg className="absolute -inset-12 w-[calc(100%+6rem)] h-[calc(100%+6rem)] animate-[rotate_20s_linear_infinite_reverse]">
                    <circle cx="50%" cy="50%" r="48%" fill="none" stroke="hsl(200 100% 50% / 0.15)" strokeWidth="1" strokeDasharray="4 8" />
                  </svg>
                  <svg className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] animate-[rotate_15s_linear_infinite]">
                    <circle cx="50%" cy="50%" r="48%" fill="none" stroke="hsl(320 100% 60% / 0.1)" strokeWidth="1" />
                  </svg>
                  
                  {/* Floating skill icons */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-float">
                    <div className="w-10 h-10 rounded-xl bg-card border border-primary/30 flex items-center justify-center shadow-lg">
                      <Code2 className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="absolute top-1/4 -right-8 animate-float" style={{ animationDelay: "1s" }}>
                    <div className="w-10 h-10 rounded-xl bg-card border border-secondary/30 flex items-center justify-center shadow-lg">
                      <Terminal className="w-5 h-5 text-secondary" />
                    </div>
                  </div>
                  <div className="absolute top-1/2 -left-8 animate-float" style={{ animationDelay: "2s" }}>
                    <div className="w-10 h-10 rounded-xl bg-card border border-accent/30 flex items-center justify-center shadow-lg">
                      <Cpu className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 animate-float" style={{ animationDelay: "1.5s" }}>
                    <div className="w-10 h-10 rounded-xl bg-card border border-primary/30 flex items-center justify-center shadow-lg">
                      <Rocket className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  
                  {/* Photo frame */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-full blur-lg opacity-50" />
                    <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/30 p-1 bg-gradient-to-br from-primary/20 to-accent/20">
                      <img 
                        src={developerPhoto} 
                        alt={t.developerName}
                        className="w-full h-full object-cover rounded-full"
                        style={{ objectPosition: "center 20%" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className={`flex-1 text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
                  {/* Name with gradient */}
                  <h3 className="font-display text-4xl md:text-5xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                      {t.developerName}
                    </span>
                  </h3>
                  
                  {/* Title */}
                  <p className="font-mono text-xl text-secondary mb-2">
                    Full Stack Developer
                  </p>
                  
                  {/* Location */}
                  <p className="text-muted-foreground font-mono mb-8 flex items-center justify-center lg:justify-start gap-3">
                    <span className="text-3xl">🇪🇬</span>
                    <span className="text-lg">{t.location}</span>
                  </p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                    {skills.map((skill, index) => (
                      <div 
                        key={skill.name}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 group/skill"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <skill.icon className={`w-4 h-4 ${skill.color} group-hover/skill:scale-110 transition-transform`} />
                        <span className="text-sm font-mono text-foreground">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Contact Links */}
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <a 
                      href="https://ahmednour.vercel.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/5 
                                 border border-primary/30 hover:border-primary hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] 
                                 transition-all duration-300 group/link"
                    >
                      <Globe className="w-5 h-5 text-primary group-hover/link:rotate-[360deg] transition-transform duration-700" />
                      <span className="font-display text-sm text-foreground">Portfolio</span>
                    </a>
                    
                    <a 
                      href="mailto:amedelshab7@gmail.com"
                      className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-secondary/20 to-secondary/5 
                                 border border-secondary/30 hover:border-secondary hover:shadow-[0_0_30px_hsl(var(--secondary)/0.3)] 
                                 transition-all duration-300 group/link"
                    >
                      <Mail className="w-5 h-5 text-secondary group-hover/link:scale-110 transition-transform" />
                      <span className="font-display text-sm text-foreground">Email</span>
                    </a>
                    
                    <a 
                      href="tel:+201014812328"
                      className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-accent/20 to-accent/5 
                                 border border-accent/30 hover:border-accent hover:shadow-[0_0_30px_hsl(var(--accent)/0.3)] 
                                 transition-all duration-300 group/link"
                    >
                      <Phone className="w-5 h-5 text-accent group-hover/link:animate-pulse" />
                      <span className="font-display text-sm text-foreground" dir="ltr">+20 101 481 2328</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom section */}
            <div className="px-8 pb-8">
              <div className="flex flex-wrap items-center justify-center gap-6 py-4 px-6 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border border-primary/10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                  </span>
                  <span className="text-sm font-mono text-muted-foreground">Available for hire</span>
                </div>
                <div className="w-px h-4 bg-border hidden sm:block" />
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
                  <span className="text-sm font-mono text-muted-foreground">Open Source Contributor</span>
                </div>
                <div className="w-px h-4 bg-border hidden sm:block" />
                <div className="flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-accent" />
                  <span className="text-sm font-mono text-muted-foreground">2+ Years Experience</span>
                </div>
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-primary/30 rounded-tl-lg" />
            <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-secondary/30 rounded-tr-lg" />
            <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-accent/30 rounded-bl-lg" />
            <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperCard;
