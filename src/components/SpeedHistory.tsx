import { useSpeedHistory, SpeedResult } from "@/hooks/useSpeedHistory";
import { useLanguage } from "@/contexts/LanguageContext";
import { Download, Upload, Wifi, Trash2, Clock, TrendingUp, Activity, Globe, Server } from "lucide-react";
import SpeedChart from "./SpeedChart";

interface SpeedHistoryProps {
  onSaveResult?: (save: (result: Omit<SpeedResult, "id" | "timestamp">) => void) => void;
}

const SpeedHistory = ({ onSaveResult }: SpeedHistoryProps) => {
  const { history, clearHistory, saveResult } = useSpeedHistory();
  const { t, isRTL } = useLanguage();

  // Expose saveResult to parent
  if (onSaveResult) {
    onSaveResult(saveResult);
  }

  if (history.length === 0) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/30 mb-4">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-display text-lg text-primary">{t.historyTitle}</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Activity className="w-12 h-12 mb-4 opacity-30" />
            <p className="font-mono">{t.noHistory}</p>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(isRTL ? "ar-EG" : "en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/30">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="font-display text-lg text-primary">{t.historyTitle}</span>
            <span className="text-xs text-muted-foreground font-mono">({history.length})</span>
          </div>
          
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/30 
                       hover:bg-destructive/20 hover:border-destructive transition-all duration-300 group"
          >
            <Trash2 className="w-4 h-4 text-destructive group-hover:animate-pulse" />
            <span className="text-sm font-mono text-destructive">{t.clearHistory}</span>
          </button>
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <SpeedChart history={history} />
        </div>

        {/* History Grid */}
        <div className="grid gap-4">
          {history.map((result, index) => (
            <div
              key={result.id}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative bg-card/50 backdrop-blur-sm rounded-xl border border-primary/20 p-5 hover:border-primary/40 transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Date & Time */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <span className="text-sm font-mono text-foreground block">
                        {formatDate(result.timestamp)}
                      </span>
                      <span className="text-xs text-muted-foreground">{t.testDate}</span>
                    </div>
                  </div>

                  {/* Speed Stats */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Download className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-primary">{result.download.toFixed(1)}</div>
                        <div className="text-xs text-muted-foreground">Mbps</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Upload className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-secondary">{result.upload.toFixed(1)}</div>
                        <div className="text-xs text-muted-foreground">Mbps</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Wifi className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-accent">{result.ping}</div>
                        <div className="text-xs text-muted-foreground">ms</div>
                      </div>
                    </div>
                  </div>

                  {/* Network Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <span className="text-sm font-mono text-foreground block">{result.ip}</span>
                      <span className="text-xs text-muted-foreground">IP Address</span>
                    </div>
                  </div>

                  {/* ISP */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center">
                      <Server className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <span className="text-sm font-mono text-foreground block truncate max-w-[150px]">{result.isp}</span>
                      <span className="text-xs text-muted-foreground">ISP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeedHistory;
