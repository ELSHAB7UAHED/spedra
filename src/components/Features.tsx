import { 
  Gauge, 
  Shield, 
  Zap, 
  Globe, 
  BarChart3, 
  Smartphone 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const colorStyles = {
  green: {
    icon: "text-primary",
    border: "border-primary/20 hover:border-primary/50",
    glow: "hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)]",
    bg: "bg-primary/5",
  },
  blue: {
    icon: "text-secondary",
    border: "border-secondary/20 hover:border-secondary/50",
    glow: "hover:shadow-[0_0_30px_hsl(var(--secondary)/0.2)]",
    bg: "bg-secondary/5",
  },
  pink: {
    icon: "text-accent",
    border: "border-accent/20 hover:border-accent/50",
    glow: "hover:shadow-[0_0_30px_hsl(var(--accent)/0.2)]",
    bg: "bg-accent/5",
  },
};

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Gauge,
      title: t.feature1Title,
      description: t.feature1Desc,
      color: "green" as const,
    },
    {
      icon: Zap,
      title: t.feature2Title,
      description: t.feature2Desc,
      color: "blue" as const,
    },
    {
      icon: Shield,
      title: t.feature3Title,
      description: t.feature3Desc,
      color: "pink" as const,
    },
    {
      icon: Globe,
      title: t.feature4Title,
      description: t.feature4Desc,
      color: "green" as const,
    },
    {
      icon: BarChart3,
      title: t.feature5Title,
      description: t.feature5Desc,
      color: "blue" as const,
    },
    {
      icon: Smartphone,
      title: t.feature6Title,
      description: t.feature6Desc,
      color: "pink" as const,
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-display text-3xl font-bold text-primary text-glow mb-4">
            {t.featuresTitle}
          </h2>
          <p className="text-muted-foreground font-mono">
            {t.featuresSubtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const styles = colorStyles[feature.color];
            const Icon = feature.icon;
            
            return (
              <div
                key={index}
                className={cn(
                  "relative p-6 rounded-lg border bg-card/30 backdrop-blur-sm",
                  "transition-all duration-500 group cursor-pointer animate-fade-in",
                  "hover:scale-105 hover:-translate-y-1",
                  styles.border,
                  styles.glow
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background glow */}
                <div className={cn(
                  "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  styles.bg
                )} />
                
                {/* Icon */}
                <div className={cn(
                  "relative w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                  "border border-current/20 group-hover:scale-110 transition-transform duration-300",
                  styles.icon
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                
                {/* Content */}
                <h3 className="relative font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="relative text-sm text-muted-foreground font-mono">
                  {feature.description}
                </p>
                
                {/* Corner decoration */}
                <span className={cn(
                  "absolute top-2 right-2 w-2 h-2 border-t border-r transition-all duration-300 group-hover:w-4 group-hover:h-4",
                  styles.icon
                )} />
                <span className={cn(
                  "absolute bottom-2 left-2 w-2 h-2 border-b border-l transition-all duration-300 group-hover:w-4 group-hover:h-4",
                  styles.icon
                )} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
