import { useSpeedHistory, SpeedResult } from "@/hooks/useSpeedHistory";
import { useLanguage } from "@/contexts/LanguageContext";
import { Download, Upload, Wifi, Trash2, Clock, TrendingUp, Activity } from "lucide-react";

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
      <div className="max-w-5xl mx-auto">
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

        {/* History Grid */}
        <div className="grid gap-4">
          {history.map((result, index) => (
            <div
              key={result.id}
              className="relative group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative bg-card/50 backdrop-blur-sm rounded-xl border border-primary/20 p-4 hover:border-primary/40 transition-all duration-300">
                <div className="flex flex-wrap items-center gap-4 md:gap-8">
                  {/* Date */}
                  <div className="flex items-center gap-2 min-w-[140px]">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-mono text-muted-foreground">
                      {formatDate(result.timestamp)}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 md:gap-6 flex-1">
                    {/* Download */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Download className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-primary">{result.download.toFixed(1)}</div>
                        <div className="text-xs text-muted-foreground">Mbps</div>
                      </div>
                    </div>

                    {/* Upload */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Upload className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-secondary">{result.upload.toFixed(1)}</div>
                        <div className="text-xs text-muted-foreground">Mbps</div>
                      </div>
                    </div>

                    {/* Ping */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Wifi className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-accent">{result.ping}</div>
                        <div className="text-xs text-muted-foreground">ms</div>
                      </div>
                    </div>
                  </div>

                  {/* ISP */}
                  <div className="text-sm font-mono text-muted-foreground hidden md:block">
                    {result.isp}
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
