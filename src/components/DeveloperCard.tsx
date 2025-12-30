import developerPhoto from "@/assets/developer-photo.png";
import { Globe, Mail, Phone, Code2, Sparkles, Star, Zap, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DeveloperCard = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-accent/30 mb-4">
            <Code2 className="w-4 h-4 text-accent" />
            <span className="text-sm font-mono text-accent">{t.developedBy}</span>
            <Code2 className="w-4 h-4 text-accent" />
          </div>
        </div>

        {/* Main Card */}
        <div className="relative group">
          {/* Animated background gradients */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />
          <div className="absolute -inset-1 bg-gradient-to-r from-accent via-primary to-secondary rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse" style={{ animationDelay: "1s" }} />
          
          <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-primary/30 overflow-hidden">
            {/* Top decorative bar */}
            <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
            
            {/* Animated scan line */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-x-0 h-32 bg-gradient-to-b from-primary/10 to-transparent animate-[scan_4s_linear_infinite]" />
            </div>

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Photo Section */}
                <div className="relative flex-shrink-0">
                  {/* Rotating rings */}
                  <div className="absolute -inset-4 border-2 border-dashed border-primary/30 rounded-full animate-[rotate_20s_linear_infinite]" />
                  <div className="absolute -inset-8 border border-secondary/20 rounded-full animate-[rotate_30s_linear_infinite_reverse]" />
                  <div className="absolute -inset-12 border border-accent/10 rounded-full animate-[rotate_40s_linear_infinite]" />
                  
                  {/* Floating icons */}
                  <Star className="absolute -top-6 left-1/2 w-4 h-4 text-primary animate-pulse" />
                  <Sparkles className="absolute -bottom-6 left-1/2 w-4 h-4 text-secondary animate-pulse" style={{ animationDelay: "0.5s" }} />
                  <Zap className="absolute top-1/2 -left-6 w-4 h-4 text-accent animate-pulse" style={{ animationDelay: "1s" }} />
                  <Heart className="absolute top-1/2 -right-6 w-4 h-4 text-accent animate-pulse" style={{ animationDelay: "1.5s" }} />
                  
                  {/* Photo container */}
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                    <img 
                      src={developerPhoto} 
                      alt={t.developerName}
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Glowing overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                  </div>
                  
                  {/* Glowing ring */}
                  <div className="absolute inset-0 rounded-full box-glow" />
                </div>

                {/* Info Section */}
                <div className={`flex-1 text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
                  {/* Name */}
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-primary text-glow mb-2">
                    {t.developerName}
                  </h3>
                  
                  {/* Title */}
                  <p className="font-mono text-lg text-secondary mb-2">
                    Full Stack Developer
                  </p>
                  
                  {/* Location */}
                  <p className="text-muted-foreground font-mono text-sm mb-6 flex items-center justify-center md:justify-start gap-2">
                    <span className="text-2xl">🇪🇬</span>
                    {t.location}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                    {["React", "TypeScript", "Node.js", "Next.js", "Tailwind"].map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Contact Links */}
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <a 
                      href="https://ahmednour.vercel.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 
                                 border border-primary/40 hover:border-primary hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)] 
                                 transition-all duration-300 group"
                    >
                      <Globe className="w-5 h-5 text-primary group-hover:animate-spin" style={{ animationDuration: "2s" }} />
                      <span className="font-mono text-sm text-foreground">Portfolio</span>
                    </a>
                    
                    <a 
                      href="mailto:amedelshab7@gmail.com"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-secondary/20 to-secondary/10 
                                 border border-secondary/40 hover:border-secondary hover:shadow-[0_0_25px_hsl(var(--secondary)/0.4)] 
                                 transition-all duration-300 group"
                    >
                      <Mail className="w-5 h-5 text-secondary group-hover:animate-bounce" />
                      <span className="font-mono text-sm text-foreground">Email</span>
                    </a>
                    
                    <div 
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent/20 to-accent/10 
                                 border border-accent/40 transition-all duration-300"
                    >
                      <Phone className="w-5 h-5 text-accent" />
                      <span className="font-mono text-sm text-foreground" dir="ltr">+20 101</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom decorative elements */}
            <div className="px-8 pb-6">
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground font-mono">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>Available for hire</span>
                </div>
                <span className="text-primary/50">|</span>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" style={{ animationDelay: "0.5s" }} />
                  <span>Open Source</span>
                </div>
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-secondary/50" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent/50" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperCard;
