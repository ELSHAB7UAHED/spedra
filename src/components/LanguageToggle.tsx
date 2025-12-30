import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-primary/30 
                 hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] 
                 transition-all duration-300 group"
      title={language === "ar" ? "Switch to English" : "التبديل للعربية"}
    >
      <Languages className="w-4 h-4 text-primary group-hover:animate-pulse" />
      <span className="font-mono text-sm text-foreground font-bold">
        {language === "ar" ? "EN" : "عربي"}
      </span>
    </button>
  );
};

export default LanguageToggle;
