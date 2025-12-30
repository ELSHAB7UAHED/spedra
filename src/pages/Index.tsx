import MatrixRain from "@/components/MatrixRain";
import Header from "@/components/Header";
import SpeedTest from "@/components/SpeedTest";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Spedra - قياس سرعة الإنترنت المتقدم</title>
        <meta name="description" content="Spedra - أداة قياس سرعة الإنترنت الأكثر دقة وتطوراً. قياس سرعة التحميل والرفع والبينج بتصميم هاكر مذهل." />
        <meta name="keywords" content="قياس سرعة الإنترنت, speed test, سرعة النت, بينج, تحميل, رفع" />
        <meta property="og:title" content="Spedra - قياس سرعة الإنترنت المتقدم" />
        <meta property="og:description" content="أداة قياس سرعة الإنترنت الأكثر دقة وتطوراً بتصميم سايبربانك مذهل" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://spedra.vercel.app" />
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
            <SpeedTest />
          </section>
          
          <Features />
          
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Index;
