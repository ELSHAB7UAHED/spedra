import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

const GlitchText = ({ text, className, as: Component = "span" }: GlitchTextProps) => {
  return (
    <Component 
      className={cn(
        "relative inline-block glitch font-display",
        className
      )}
      data-text={text}
    >
      <span className="relative z-10">{text}</span>
      <span 
        className="absolute top-0 left-0 w-full h-full text-accent opacity-70 clip-glitch-1"
        aria-hidden="true"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
          transform: "translate(-2px, 0)",
        }}
      >
        {text}
      </span>
      <span 
        className="absolute top-0 left-0 w-full h-full text-secondary opacity-70 clip-glitch-2"
        aria-hidden="true"
        style={{
          clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
          transform: "translate(2px, 0)",
        }}
      >
        {text}
      </span>
    </Component>
  );
};

export default GlitchText;
