import SpeedGauge from "./SpeedGauge";
import CyberButton from "./CyberButton";
import DataPanel from "./DataPanel";
import { useSpeedTest } from "@/hooks/useSpeedTest";
import { 
  Download, 
  Upload, 
  Wifi, 
  Globe, 
  Server,
  Activity,
  Zap
} from "lucide-react";

const SpeedTest = () => {
  const { testing, phase, currentSpeed, progress, results, runSpeedTest } = useSpeedTest();

  const getPhaseText = () => {
    switch (phase) {
      case "ping": return "جاري قياس البينج...";
      case "download": return `جاري قياس التحميل... ${Math.round(progress)}%`;
      case "upload": return `جاري قياس الرفع... ${Math.round(progress)}%`;
      case "complete": return "✓ اكتمل الاختبار!";
      default: return "جاهز للاختبار";
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case "complete": return "text-primary";
      default: return "text-primary";
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Main Speed Display */}
      <div className="flex flex-col items-center mb-12">
        {/* Phase indicator */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/30 neon-border">
            {testing ? (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <Activity className={`w-4 h-4 ${getPhaseColor()} ${phase === "complete" ? "" : "animate-pulse"}`} />
            )}
            <span className={`font-mono text-sm ${getPhaseColor()}`}>{getPhaseText()}</span>
          </div>
          
          {/* Progress bar for download/upload phases */}
          {(phase === "download" || phase === "upload") && (
            <div className="mt-4 w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
              <div 
                className={`h-full transition-all duration-300 rounded-full ${
                  phase === "download" ? "bg-primary" : "bg-secondary"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 w-full justify-items-center">
          <SpeedGauge
            speed={phase === "download" ? currentSpeed : results.download}
            maxSpeed={500}
            label="تحميل"
            color="green"
          />
          <SpeedGauge
            speed={phase === "upload" ? currentSpeed : results.upload}
            maxSpeed={200}
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
          onClick={runSpeedTest}
          disabled={testing}
          loading={testing}
          size="lg"
          variant="primary"
          className="min-w-[200px]"
        >
          {testing ? "جاري الاختبار" : "ابدأ الاختبار"}
        </CyberButton>
        
        {/* Real test indicator */}
        <p className="mt-4 text-xs text-muted-foreground font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          قياس حقيقي عبر Cloudflare CDN
        </p>
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
