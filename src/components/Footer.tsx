import developerPhoto from "@/assets/developer-photo.png";
import { Github, Globe, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-12 px-4 mt-16 border-t border-primary/20">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Developer Section */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4 font-mono">
              <span className="text-primary">{"<"}</span>
              تم التطوير بواسطة
              <span className="text-primary">{"/>"}</span>
            </p>
            
            {/* Developer Photo */}
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/50 box-glow">
                <img 
                  src={developerPhoto} 
                  alt="Ahmed Nour" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Glowing ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse" />
            </div>
            
            {/* Developer Name */}
            <h3 className="font-display text-2xl font-bold text-primary text-glow mb-1">
              أحمد نور أحمد
            </h3>
            <p className="text-muted-foreground font-mono text-sm mb-4">
              قنا، مصر 🇪🇬
            </p>
          </div>
          
          {/* Contact Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a 
              href="https://ahmednour.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-primary/30 
                         hover:border-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] 
                         transition-all duration-300 group"
            >
              <Globe className="w-4 h-4 text-primary group-hover:animate-pulse" />
              <span className="text-sm font-mono text-foreground">ahmednour.vercel.app</span>
            </a>
            
            <a 
              href="mailto:amedelshab7@gmail.com"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-secondary/30 
                         hover:border-secondary hover:shadow-[0_0_15px_hsl(var(--secondary)/0.3)] 
                         transition-all duration-300 group"
            >
              <Mail className="w-4 h-4 text-secondary group-hover:animate-pulse" />
              <span className="text-sm font-mono text-foreground">amedelshab7@gmail.com</span>
            </a>
            
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-accent/30 
                         transition-all duration-300"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span className="text-sm font-mono text-foreground" dir="ltr">+20 101 XXX XXXX</span>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-xs text-muted-foreground font-mono">
            <span className="text-primary">{"/*"}</span>
            {" "}© {new Date().getFullYear()} Spedra - جميع الحقوق محفوظة{" "}
            <span className="text-primary">{"*/"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
