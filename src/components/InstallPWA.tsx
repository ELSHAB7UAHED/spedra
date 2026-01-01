import { useState, useEffect } from "react";
import { Download, Monitor, Smartphone, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSound } from "@/contexts/SoundContext";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const { language } = useLanguage();
  const { playSound } = useSound();

  const isArabic = language === "ar";

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Check if installed via app installed event
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    playSound("click");
    
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === "accepted") {
        playSound("success");
        setIsVisible(false);
      }
    } catch (error) {
      console.error("Install error:", error);
    }
    
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    playSound("click");
    setIsVisible(false);
  };

  if (isInstalled || !isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 animate-slide-up">
      <div className="relative bg-card/95 backdrop-blur-xl border border-primary/30 rounded-2xl p-4 shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-transparent to-cyan-500/20 rounded-2xl blur-sm" />
        
        <div className="relative">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-0 right-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>

          {/* Icon */}
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-primary/30 rounded-xl blur-md animate-pulse" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-primary to-cyan-500 rounded-xl flex items-center justify-center">
                <Download className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">
                {isArabic ? "تثبيت التطبيق" : "Install App"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isArabic ? "احصل على تجربة أفضل" : "Get the best experience"}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Monitor size={12} className="text-primary" />
              <span>{isArabic ? "سطح المكتب" : "Desktop"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Smartphone size={12} className="text-primary" />
              <span>{isArabic ? "الجوال" : "Mobile"}</span>
            </div>
          </div>

          {/* Install button */}
          <button
            onClick={handleInstall}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-primary-foreground font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <Download size={18} className="group-hover:animate-bounce" />
            <span>{isArabic ? "تثبيت الآن" : "Install Now"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPWA;
