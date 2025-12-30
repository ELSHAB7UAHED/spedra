import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DataPanelProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: ReactNode;
  className?: string;
  color?: "green" | "blue" | "pink" | "orange";
}

const DataPanel = ({ title, value, unit, icon, className, color = "green" }: DataPanelProps) => {
  const colorClasses = {
    green: "border-primary/30 hover:border-primary/60 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]",
    blue: "border-secondary/30 hover:border-secondary/60 hover:shadow-[0_0_20px_hsl(var(--secondary)/0.2)]",
    pink: "border-accent/30 hover:border-accent/60 hover:shadow-[0_0_20px_hsl(var(--accent)/0.2)]",
    orange: "border-neon-orange/30 hover:border-neon-orange/60 hover:shadow-[0_0_20px_hsl(var(--neon-orange)/0.2)]",
  };

  const textColors = {
    green: "text-primary",
    blue: "text-secondary",
    pink: "text-accent",
    orange: "text-neon-orange",
  };

  return (
    <div 
      className={cn(
        "relative bg-card/50 backdrop-blur-sm border rounded-lg p-4 transition-all duration-300",
        colorClasses[color],
        className
      )}
    >
      {/* Scanline effect */}
      <div className="absolute inset-0 scanline rounded-lg opacity-30 pointer-events-none" />
      
      {/* Corner decorations */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-current opacity-30" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-current opacity-30" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-current opacity-30" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-current opacity-30" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          {icon && <span className={textColors[color]}>{icon}</span>}
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
            {title}
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className={cn("text-2xl font-display font-bold", textColors[color])}>
            {value}
          </span>
          {unit && (
            <span className="text-sm text-muted-foreground font-mono">{unit}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataPanel;
