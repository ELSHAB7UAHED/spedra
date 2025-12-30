import { useEffect, useState } from "react";

interface SpeedGaugeProps {
  speed: number;
  maxSpeed: number;
  label: string;
  unit?: string;
  color?: "green" | "blue" | "pink";
}

const SpeedGauge = ({ speed, maxSpeed, label, unit = "Mbps", color = "green" }: SpeedGaugeProps) => {
  const [animatedSpeed, setAnimatedSpeed] = useState(0);
  
  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const stepValue = speed / steps;
    let current = 0;
    
    const interval = setInterval(() => {
      current += stepValue;
      if (current >= speed) {
        setAnimatedSpeed(speed);
        clearInterval(interval);
      } else {
        setAnimatedSpeed(current);
      }
    }, duration / steps);
    
    return () => clearInterval(interval);
  }, [speed]);

  const percentage = Math.min((animatedSpeed / maxSpeed) * 100, 100);
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75;

  const colorClasses = {
    green: {
      stroke: "stroke-primary",
      text: "text-primary text-glow",
      glow: "drop-shadow-[0_0_15px_hsl(160,100%,50%)]",
    },
    blue: {
      stroke: "stroke-secondary",
      text: "text-secondary text-glow-blue",
      glow: "drop-shadow-[0_0_15px_hsl(200,100%,60%)]",
    },
    pink: {
      stroke: "stroke-accent",
      text: "text-accent text-glow-pink",
      glow: "drop-shadow-[0_0_15px_hsl(320,100%,60%)]",
    },
  };

  return (
    <div className="relative flex flex-col items-center">
      <svg className="w-48 h-48 -rotate-[135deg]" viewBox="0 0 160 160">
        {/* Background arc */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
          strokeLinecap="round"
          className="opacity-30"
        />
        {/* Progress arc */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          className={`${colorClasses[color].stroke} ${colorClasses[color].glow} transition-all duration-300`}
          strokeWidth="8"
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
        {/* Tick marks */}
        {[...Array(11)].map((_, i) => {
          const angle = -135 + (i * 270) / 10;
          const rad = (angle * Math.PI) / 180;
          const x1 = 80 + 58 * Math.cos(rad);
          const y1 = 80 + 58 * Math.sin(rad);
          const x2 = 80 + 65 * Math.cos(rad);
          const y2 = 80 + 65 * Math.sin(rad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="hsl(var(--primary) / 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      
      {/* Center display */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 text-center">
        <div className={`font-display text-4xl font-bold ${colorClasses[color].text}`}>
          {animatedSpeed.toFixed(1)}
        </div>
        <div className="text-muted-foreground text-sm font-mono">{unit}</div>
      </div>
      
      {/* Label */}
      <div className={`mt-2 font-display text-sm uppercase tracking-wider ${colorClasses[color].text}`}>
        {label}
      </div>
    </div>
  );
};

export default SpeedGauge;
