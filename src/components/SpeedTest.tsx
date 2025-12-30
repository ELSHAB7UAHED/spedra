import { useState, useCallback } from "react";
import SpeedGauge from "./SpeedGauge";
import CyberButton from "./CyberButton";
import DataPanel from "./DataPanel";
import { 
  Download, 
  Upload, 
  Wifi, 
  Globe, 
  Server,
  Activity,
  Zap
} from "lucide-react";

interface TestResults {
  download: number;
  upload: number;
  ping: number;
  jitter: number;
  server: string;
  ip: string;
  isp: string;
}

const SpeedTest = () => {
  const [testing, setTesting] = useState(false);
  const [phase, setPhase] = useState<"idle" | "ping" | "download" | "upload" | "complete">("idle");
  const [results, setResults] = useState<TestResults>({
    download: 0,
    upload: 0,
    ping: 0,
    jitter: 0,
    server: "Cairo, EG",
    ip: "---",
    isp: "---",
  });
  const [currentSpeed, setCurrentSpeed] = useState(0);

  const simulateSpeedTest = useCallback(async () => {
    setTesting(true);
    setPhase("ping");
    
    // Simulate ping test
    await new Promise(resolve => setTimeout(resolve, 1000));
    const ping = Math.floor(Math.random() * 30) + 5;
    const jitter = Math.floor(Math.random() * 5) + 1;
    setResults(prev => ({ 
      ...prev, 
      ping, 
      jitter,
      ip: "102.45.xxx.xxx",
      isp: "TE Data Egypt"
    }));

    // Simulate download test
    setPhase("download");
    const targetDownload = Math.floor(Math.random() * 200) + 50;
    for (let i = 0; i <= 100; i += 2) {
      await new Promise(resolve => setTimeout(resolve, 50));
      const speed = (targetDownload * i / 100) + (Math.random() * 10 - 5);
      setCurrentSpeed(Math.max(0, speed));
    }
    setResults(prev => ({ ...prev, download: targetDownload }));

    // Simulate upload test
    setPhase("upload");
    const targetUpload = Math.floor(Math.random() * 50) + 20;
    for (let i = 0; i <= 100; i += 2) {
      await new Promise(resolve => setTimeout(resolve, 50));
      const speed = (targetUpload * i / 100) + (Math.random() * 5 - 2.5);
      setCurrentSpeed(Math.max(0, speed));
    }
    setResults(prev => ({ ...prev, upload: targetUpload }));

    setPhase("complete");
    setCurrentSpeed(0);
    setTesting(false);
  }, []);

  const getPhaseText = () => {
    switch (phase) {
      case "ping": return "جاري قياس البينج...";
      case "download": return "جاري قياس التحميل...";
      case "upload": return "جاري قياس الرفع...";
      case "complete": return "اكتمل الاختبار!";
      default: return "جاهز للاختبار";
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Main Speed Display */}
      <div className="flex flex-col items-center mb-12">
        {/* Phase indicator */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/30 neon-border">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span className="font-mono text-sm text-primary">{getPhaseText()}</span>
          </div>
        </div>

        {/* Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 w-full justify-items-center">
          <SpeedGauge
            speed={phase === "download" ? currentSpeed : results.download}
            maxSpeed={300}
            label="تحميل"
            color="green"
          />
          <SpeedGauge
            speed={phase === "upload" ? currentSpeed : results.upload}
            maxSpeed={100}
            label="رفع"
            color="blue"
          />
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-accent/30 flex items-center justify-center bg-card/30 box-glow">
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-accent text-glow-pink">
                    {results.ping}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">ms</div>
                </div>
              </div>
              <Zap className="absolute -top-2 -right-2 w-6 h-6 text-accent animate-pulse" />
            </div>
            <div className="mt-4 font-display text-sm uppercase tracking-wider text-accent text-glow-pink">
              بينج
            </div>
          </div>
        </div>

        {/* Start Button */}
        <CyberButton
          onClick={simulateSpeedTest}
          disabled={testing}
          loading={testing}
          size="lg"
          variant="primary"
          className="min-w-[200px]"
        >
          {testing ? "جاري الاختبار" : "ابدأ الاختبار"}
        </CyberButton>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <DataPanel
          title="سرعة التحميل"
          value={results.download.toFixed(1)}
          unit="Mbps"
          icon={<Download className="w-4 h-4" />}
          color="green"
        />
        <DataPanel
          title="سرعة الرفع"
          value={results.upload.toFixed(1)}
          unit="Mbps"
          icon={<Upload className="w-4 h-4" />}
          color="blue"
        />
        <DataPanel
          title="البينج"
          value={results.ping}
          unit="ms"
          icon={<Wifi className="w-4 h-4" />}
          color="pink"
        />
        <DataPanel
          title="الجيتر"
          value={results.jitter}
          unit="ms"
          icon={<Activity className="w-4 h-4" />}
          color="orange"
        />
      </div>

      {/* Connection Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DataPanel
          title="السيرفر"
          value={results.server}
          icon={<Server className="w-4 h-4" />}
          color="green"
        />
        <DataPanel
          title="عنوان IP"
          value={results.ip}
          icon={<Globe className="w-4 h-4" />}
          color="blue"
        />
        <DataPanel
          title="مزود الخدمة"
          value={results.isp}
          icon={<Wifi className="w-4 h-4" />}
          color="pink"
        />
      </div>
    </div>
  );
};

export default SpeedTest;
