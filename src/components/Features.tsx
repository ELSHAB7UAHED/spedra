import { 
  Gauge, 
  Shield, 
  Zap, 
  Globe, 
  BarChart3, 
  Smartphone 
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Gauge,
    title: "قياس فائق الدقة",
    description: "تقنية متقدمة لقياس السرعة بدقة عالية جداً",
    color: "green" as const,
  },
  {
    icon: Zap,
    title: "سرعة البرق",
    description: "اختبار سريع يستغرق ثوانٍ معدودة فقط",
    color: "blue" as const,
  },
  {
    icon: Shield,
    title: "خصوصية تامة",
    description: "لا نحتفظ بأي بيانات خاصة بك",
    color: "pink" as const,
  },
  {
    icon: Globe,
    title: "سيرفرات عالمية",
    description: "شبكة واسعة من السيرفرات حول العالم",
    color: "green" as const,
  },
  {
    icon: BarChart3,
    title: "تقارير مفصلة",
    description: "إحصائيات شاملة عن أداء اتصالك",
    color: "blue" as const,
  },
  {
    icon: Smartphone,
    title: "تصميم متجاوب",
    description: "يعمل على جميع الأجهزة بكفاءة",
    color: "pink" as const,
  },
];

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
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-primary text-glow mb-4">
            مميزات SPEDRA
          </h2>
          <p className="text-muted-foreground font-mono">
            تقنيات متطورة لقياس سرعة الإنترنت
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
                  "transition-all duration-500 group cursor-pointer",
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
                  "border border-current/20",
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
                  "absolute top-2 right-2 w-2 h-2 border-t border-r",
                  styles.icon
                )} />
                <span className={cn(
                  "absolute bottom-2 left-2 w-2 h-2 border-b border-l",
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
