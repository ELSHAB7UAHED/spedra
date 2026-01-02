import developerPhoto from "@/assets/developer-photo.png";
import { Globe, Mail, Phone, Code2, Terminal, Cpu, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DeveloperCard = () => {
  const { t, isRTL } = useLanguage();

  const skills = ["React", "TypeScript", "Node.js", "Next.js", "AI/ML"];

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-card/50 border border-primary/30 backdrop-blur-sm hover:border-primary/60 transition-all duration-300">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-display text-xl text-foreground">{t.developedBy}</span>
            <Code2 className="w-5 h-5 text-secondary" />
          </div>
        </div>

        {/* Main Card */}
        <div className="relative group animate-scale-in" style={{ animationDelay: '0.1s' }}>
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-3xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
          
          <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl border border-primary/30 overflow-hidden group-hover:border-primary/50 transition-all duration-500">
            {/* Top gradient bar with shimmer */}
            <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
            
            <div className="p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-10">
                {/* Photo */}
                <div className="relative flex-shrink-0 group/photo">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/40 to-accent/40 rounded-full blur-xl group-hover/photo:blur-2xl transition-all duration-500" />
                  
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden p-1 bg-gradient-to-br from-primary via-secondary to-accent group-hover/photo:scale-105 transition-transform duration-500">
                    <div className="w-full h-full rounded-full overflow-hidden bg-card">
                      <img 
                        src={developerPhoto} 
                        alt={t.developerName}
                        className="w-full h-full object-cover object-top group-hover/photo:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  
                  {/* Online indicator */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm border border-primary/30">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                    <span className="text-xs font-mono text-green-400">Online</span>
                  </div>
                </div>

                {/* Info */}
                <div className={`flex-1 text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
                  <h3 className="font-display text-4xl md:text-5xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-[length:200%_auto] hover:animate-pulse">
                      {t.developerName}
                    </span>
                  </h3>
                  
                  <p className="font-mono text-lg md:text-xl text-secondary mb-2">
                    Full Stack Developer
                  </p>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                    <span className="text-2xl hover:animate-bounce cursor-default">🇪🇬</span>
                    <span className="text-sm font-mono text-muted-foreground">{t.location}</span>
                  </div>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
                    {skills.map((skill, index) => (
                      <span 
                        key={skill}
                        className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/30 text-sm font-mono text-foreground hover:bg-primary/20 hover:border-primary/50 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Contact Links */}
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <a 
                      href="https://ahmednour.vercel.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/30 text-foreground hover:bg-primary/20 hover:border-primary hover:scale-105 hover:-translate-y-1 transition-all duration-300 group/link"
                    >
                      <Globe className="w-5 h-5 text-primary group-hover/link:rotate-12 transition-transform duration-300" />
                      <span className="font-mono text-sm">Portfolio</span>
                    </a>
                    
                    <a 
                      href="mailto:amedelshab7@gmail.com"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary/10 border border-secondary/30 text-foreground hover:bg-secondary/20 hover:border-secondary hover:scale-105 hover:-translate-y-1 transition-all duration-300 group/link"
                    >
                      <Mail className="w-5 h-5 text-secondary group-hover/link:scale-110 transition-transform duration-300" />
                      <span className="font-mono text-sm">Email</span>
                    </a>
                    
                    <a 
                      href="tel:+201014812328"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/10 border border-accent/30 text-foreground hover:bg-accent/20 hover:border-accent hover:scale-105 hover:-translate-y-1 transition-all duration-300 group/link"
                    >
                      <Phone className="w-5 h-5 text-accent group-hover/link:rotate-12 transition-transform duration-300" />
                      <span className="font-mono text-sm" dir="ltr">+20 101 481 2328</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="px-8 pb-8">
              <div className="flex flex-wrap items-center justify-center gap-6 py-4 px-6 rounded-xl bg-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300">
                <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                  <Cpu className="w-4 h-4 text-primary" />
                  <span className="text-sm font-mono text-muted-foreground">5+ {isRTL ? 'سنوات خبرة' : 'Years Exp'}</span>
                </div>
                <div className="w-px h-4 bg-primary/30 hidden sm:block" />
                <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                  <Rocket className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-mono text-muted-foreground">50+ {isRTL ? 'مشروع' : 'Projects'}</span>
                </div>
                <div className="w-px h-4 bg-primary/30 hidden sm:block" />
                <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                  <Code2 className="w-4 h-4 text-accent" />
                  <span className="text-sm font-mono text-muted-foreground">{isRTL ? 'مفتوح للعمل' : 'Open to Work'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperCard;
