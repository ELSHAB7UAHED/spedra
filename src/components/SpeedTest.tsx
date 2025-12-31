import SpeedGauge from "./SpeedGauge";
import CyberButton from "./CyberButton";
import DataPanel from "./DataPanel";
import ServerSelector, { SERVERS, ServerOption } from "./ServerSelector";
import SpeedComparison from "./SpeedComparison";
import ShareResults from "./ShareResults";
import IpDisplay from "./IpDisplay";
import { useSpeedTest } from "@/hooks/useSpeedTest";
import { useLanguage } from "@/contexts/LanguageContext";
import { SpeedResult } from "@/hooks/useSpeedHistory";
import { 
  Download, 
  Upload, 
  Wifi, 
  Globe, 
  Server,
  Activity,
  Zap
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SpeedTestProps {
  onTestComplete?: (result: Omit<SpeedResult, "id" | "timestamp">) => void;
}

const SpeedTest = ({ onTestComplete }: SpeedTestProps) => {
  const [selectedServer, setSelectedServer] = useState<ServerOption>(SERVERS[0]);
  const { testing, phase, currentSpeed, progress, results, runSpeedTest } = useSpeedTest();
  const { t } = useLanguage();
  const lastPhaseRef = useRef(phase);

  // Save result when test completes
  useEffect(() => {
    if (lastPhaseRef.current !== "complete" && phase === "complete" && onTestComplete) {
      onTestComplete({
        download: results.download,
        upload: results.upload,
        ping: results.ping,
        jitter: results.jitter,
        server: selectedServer.name,
        ip: results.ip,
        isp: results.isp,
      });
    }
    lastPhaseRef.current = phase;
  }, [phase, results, onTestComplete, selectedServer]);

  const getPhaseText = () => {
    switch (phase) {
      case "ping": return t.measuringPing;
      case "download": return `${t.measuringDownload} ${Math.round(progress)}%`;
      case "upload": return `${t.measuringUpload} ${Math.round(progress)}%`;
      case "complete": return t.testComplete;
      default: return t.readyToTest;
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case "complete": return "text-primary";
      default: return "text-primary";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Server Selector & IP Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="animate-fade-in">
          <ServerSelector 
            selectedServer={selectedServer} 
            onSelectServer={setSelectedServer}
            disabled={testing}
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <IpDisplay />
        </div>
      </div>

      {/* Main Speed Display */}
      <div className="flex flex-col items-center mb-12">
        {/* Phase indicator */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/30 neon-border animate-fade-in">
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
                  phase === "download" 
                    ? "bg-gradient-to-r from-primary to-primary/50" 
                    : "bg-gradient-to-r from-secondary to-secondary/50"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 w-full justify-items-center">
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <SpeedGauge
              speed={phase === "download" ? currentSpeed : results.download}
              maxSpeed={500}
              label={t.download}
              color="green"
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <SpeedGauge
              speed={phase === "upload" ? currentSpeed : results.upload}
              maxSpeed={200}
              label={t.upload}
              color="blue"
            />
          </div>
          <div className="flex flex-col items-center justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative group">
              <div className="absolute -inset-2 bg-accent/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-32 h-32 rounded-full border-4 border-accent/30 flex items-center justify-center bg-card/30 box-glow group-hover:scale-105 transition-transform duration-300">
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
              {t.ping}
            </div>
          </div>
        </div>

        {/* Start Button & Share */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <CyberButton
            onClick={runSpeedTest}
            disabled={testing}
            loading={testing}
            size="lg"
            variant="primary"
            className="min-w-[200px] animate-scale-in"
          >
            {testing ? t.testing : t.startTest}
          </CyberButton>
          
          {phase === "complete" && (
            <ShareResults 
              downloadSpeed={results.download}
              uploadSpeed={results.upload}
              ping={results.ping}
              jitter={results.jitter}
              server={selectedServer.name}
              ip={results.ip}
              isp={results.isp}
            />
          )}
        </div>
        
        {/* Real test indicator */}
        <p className="mt-4 text-xs text-muted-foreground font-mono flex items-center gap-2 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {t.realMeasurement}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <DataPanel
            title={t.download}
            value={results.download.toFixed(1)}
            unit="Mbps"
            icon={<Download className="w-4 h-4" />}
            color="green"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <DataPanel
            title={t.upload}
            value={results.upload.toFixed(1)}
            unit="Mbps"
            icon={<Upload className="w-4 h-4" />}
            color="blue"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <DataPanel
            title={t.ping}
            value={results.ping}
            unit="ms"
            icon={<Wifi className="w-4 h-4" />}
            color="pink"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <DataPanel
            title={t.jitter}
            value={results.jitter}
            unit="ms"
            icon={<Activity className="w-4 h-4" />}
            color="orange"
          />
        </div>
      </div>

      {/* Connection Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <DataPanel
            title={t.server}
            value={selectedServer.name}
            icon={<Server className="w-4 h-4" />}
            color="green"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.35s" }}>
          <DataPanel
            title={t.ipAddress}
            value={results.ip}
            icon={<Globe className="w-4 h-4" />}
            color="blue"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <DataPanel
            title={t.isp}
            value={results.isp}
            icon={<Wifi className="w-4 h-4" />}
            color="pink"
          />
        </div>
      </div>

      {/* Speed Comparison */}
      <SpeedComparison 
        downloadSpeed={results.download}
        uploadSpeed={results.upload}
        ping={results.ping}
      />
    </div>
  );
};

export default SpeedTest;
