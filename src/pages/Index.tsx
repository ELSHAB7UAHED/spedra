import MatrixRain from "@/components/MatrixRain";
import Header from "@/components/Header";
import SpeedTest from "@/components/SpeedTest";
import Features from "@/components/Features";
import DeveloperCard from "@/components/DeveloperCard";
import SpeedHistory from "@/components/SpeedHistory";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/contexts/LanguageContext";
import { SpeedResult } from "@/hooks/useSpeedHistory";
import { useRef, useCallback } from "react";

const Index = () => {
  const { t, isRTL } = useLanguage();
  const saveResultRef = useRef<((result: Omit<SpeedResult, "id" | "timestamp">) => void) | null>(null);

  const handleTestComplete = useCallback((result: Omit<SpeedResult, "id" | "timestamp">) => {
    if (saveResultRef.current) {
      saveResultRef.current(result);
    }
  }, []);

  const handleSaveResult = useCallback((save: (result: Omit<SpeedResult, "id" | "timestamp">) => void) => {
    saveResultRef.current = save;
  }, []);

  return (
    <>
      <Helmet>
        <title>Spedra - {t.tagline}</title>
        <meta name="description" content={`Spedra - ${t.tagline}. ${t.featuresSubtitle}`} />
        <meta name="keywords" content="قياس سرعة الإنترنت, speed test, سرعة النت, بينج, تحميل, رفع, internet speed test" />
        <meta property="og:title" content={`Spedra - ${t.tagline}`} />
        <meta property="og:description" content={t.featuresSubtitle} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://spedra.vercel.app" />
        <html lang={isRTL ? "ar" : "en"} dir={isRTL ? "rtl" : "ltr"} />
      </Helmet>

      <div className="relative min-h-screen cyber-grid overflow-hidden">
        {/* Matrix Rain Background */}
        <MatrixRain />
        
        {/* Scanline overlay */}
        <div className="fixed inset-0 scanline pointer-events-none z-10" />
        
        {/* Gradient overlays */}
        <div className="fixed inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-5" />
        <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-5" />
        
        {/* Main Content */}
        <main className="relative z-20">
          <Header />
          
          <section className="py-8">
            <SpeedTest onTestComplete={handleTestComplete} />
          </section>

          <SpeedHistory onSaveResult={handleSaveResult} />
          
          <Features />

          <DeveloperCard />
          
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Index;
