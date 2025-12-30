import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const CyberButton = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className,
  disabled,
  ...props
}: CyberButtonProps) => {
  const baseStyles = `
    relative font-display uppercase tracking-wider
    transition-all duration-300 ease-out
    overflow-hidden group
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-primary text-primary-foreground
      hover:shadow-[0_0_30px_hsl(var(--primary)/0.6)]
      active:scale-95
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-transparent before:via-white/20 before:to-transparent
      before:translate-x-[-200%] hover:before:translate-x-[200%]
      before:transition-transform before:duration-700
    `,
    secondary: `
      bg-secondary text-secondary-foreground
      hover:shadow-[0_0_30px_hsl(var(--secondary)/0.6)]
      active:scale-95
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-transparent before:via-white/20 before:to-transparent
      before:translate-x-[-200%] hover:before:translate-x-[200%]
      before:transition-transform before:duration-700
    `,
    outline: `
      bg-transparent border-2 border-primary text-primary
      hover:bg-primary/10 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]
      active:scale-95
    `,
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-10 py-4 text-base",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {/* Corner decorations */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-50" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current opacity-50" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current opacity-50" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-50" />
      
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>جاري القياس...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default CyberButton;
