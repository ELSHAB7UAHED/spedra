import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative py-8 px-4 border-t border-primary/20">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Copyright */}
        <div className="text-xs text-muted-foreground font-mono">
          <span className="text-primary">{"/*"}</span>
          {" "}© {new Date().getFullYear()} Spedra - {t.allRightsReserved}{" "}
          <span className="text-primary">{"*/"}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
