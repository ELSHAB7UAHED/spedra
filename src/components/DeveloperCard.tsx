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
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-card/50 border border-primary/30 backdrop-blur-sm">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-display text-xl text-foreground">{t.developedBy}</span>
            <Code2 className="w-5 h-5 text-secondary" />
          </div>
        </div>

        {/* Main Card */}
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-3xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
          
          <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl border border-primary/30 overflow-hidden">
            {/* Top gradient bar */}
            <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
            
            <div className="p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-10">
                {/* Photo */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/40 to-accent/40 rounded-full blur-xl" />
                  
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden p-1 bg-gradient-to-br from-primary via-secondary to-accent">
                    <div className="w-full h-full rounded-full overflow-hidden bg-card">
                      <img 
                        src={developerPhoto} 
                        alt={t.developerName}
                        className="w-full h-full object-cover object-top"
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
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                      {t.developerName}
                    </span>
                  </h3>
                  
                  <p className="font-mono text-lg md:text-xl text-secondary mb-2">
                    Full Stack Developer
                  </p>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                    <span className="text-2xl">🇪🇬</span>
                    <span className="text-sm font-mono text-muted-foreground">{t.location}</span>
                  </div>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
                    {skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/30 text-sm font-mono text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/30 text-foreground hover:bg-primary/20 hover:border-primary transition-all duration-300 group"
                    >
                      <Globe className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
                      <span className="font-mono text-sm">Portfolio</span>
                    </a>
                    
                    <a 
                      href="mailto:amedelshab7@gmail.com"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary/10 border border-secondary/30 text-foreground hover:bg-secondary/20 hover:border-secondary transition-all duration-300 group"
                    >
                      <Mail className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-sm">Email</span>
                    </a>
                    
                    <a 
                      href="tel:+201014812328"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/10 border border-accent/30 text-foreground hover:bg-accent/20 hover:border-accent transition-all duration-300 group"
                    >
                      <Phone className="w-5 h-5 text-accent group-hover:rotate-12 transition-transform" />
                      <span className="font-mono text-sm" dir="ltr">+20 101 481 2328</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="px-8 pb-8">
              <div className="flex flex-wrap items-center justify-center gap-6 py-4 px-6 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-primary" />
                  <span className="text-sm font-mono text-muted-foreground">5+ {isRTL ? 'سنوات خبرة' : 'Years Exp'}</span>
                </div>
                <div className="w-px h-4 bg-primary/30 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-mono text-muted-foreground">50+ {isRTL ? 'مشروع' : 'Projects'}</span>
                </div>
                <div className="w-px h-4 bg-primary/30 hidden sm:block" />
                <div className="flex items-center gap-2">
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
