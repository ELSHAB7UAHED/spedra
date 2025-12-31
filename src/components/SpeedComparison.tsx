import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingUp, TrendingDown, Minus, Globe, Wifi, Zap, Award } from "lucide-react";

interface SpeedComparisonProps {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
}

const SpeedComparison = ({ downloadSpeed, uploadSpeed, ping }: SpeedComparisonProps) => {
  const { t, isRTL } = useLanguage();

  // Regional averages (approximate values)
  const averages = {
    egypt: { download: 35, upload: 15, ping: 45 },
    global: { download: 75, upload: 35, ping: 30 },
    middleEast: { download: 55, upload: 25, ping: 40 },
  };

  const getComparisonIcon = (value: number, average: number, isLowerBetter = false) => {
    const diff = ((value - average) / average) * 100;
    if (isLowerBetter) {
      if (diff < -10) return <TrendingUp className="w-4 h-4 text-primary" />;
      if (diff > 10) return <TrendingDown className="w-4 h-4 text-destructive" />;
    } else {
      if (diff > 10) return <TrendingUp className="w-4 h-4 text-primary" />;
      if (diff < -10) return <TrendingDown className="w-4 h-4 text-destructive" />;
    }
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const getComparisonText = (value: number, average: number, isLowerBetter = false) => {
    const diff = ((value - average) / average) * 100;
    const absDiff = Math.abs(diff).toFixed(0);
    
    if (isLowerBetter) {
      if (diff < -10) return { text: `${absDiff}% ${t.betterThan}`, color: "text-primary" };
      if (diff > 10) return { text: `${absDiff}% ${t.worsenThan}`, color: "text-destructive" };
    } else {
      if (diff > 10) return { text: `${absDiff}% ${t.betterThan}`, color: "text-primary" };
      if (diff < -10) return { text: `${absDiff}% ${t.worsenThan}`, color: "text-destructive" };
    }
    return { text: t.average, color: "text-muted-foreground" };
  };

  const getSpeedRating = () => {
    const downloadScore = (downloadSpeed / averages.global.download) * 100;
    const uploadScore = (uploadSpeed / averages.global.upload) * 100;
    const pingScore = (averages.global.ping / ping) * 100;
    const totalScore = (downloadScore + uploadScore + pingScore) / 3;

    if (totalScore >= 150) return { rating: t.excellent, color: "text-primary", stars: 5 };
    if (totalScore >= 100) return { rating: t.veryGood, color: "text-secondary", stars: 4 };
    if (totalScore >= 70) return { rating: t.good, color: "text-accent", stars: 3 };
    if (totalScore >= 40) return { rating: t.fair, color: "text-orange-400", stars: 2 };
    return { rating: t.poor, color: "text-destructive", stars: 1 };
  };

  const rating = getSpeedRating();

  if (downloadSpeed === 0) return null;

  return (
    <div className="relative mt-8 animate-fade-in">
      {/* Background glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-3xl blur-xl" />
      
      <div className="relative bg-card/50 backdrop-blur-xl rounded-2xl border border-primary/20 p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg text-foreground">{t.speedComparison}</h3>
              <p className="text-xs text-muted-foreground font-mono">{t.comparedToAverages}</p>
            </div>
          </div>

          {/* Overall Rating */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20`}>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Zap
                  key={i}
                  className={`w-4 h-4 transition-all ${i < rating.stars ? rating.color : "text-muted/30"}`}
                  fill={i < rating.stars ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className={`font-display text-sm ${rating.color}`}>{rating.rating}</span>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Egypt Comparison */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-muted/20 rounded-xl p-4 border border-primary/10 group-hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🇪🇬</span>
                <span className="font-display text-sm text-foreground">{t.egyptAverage}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t.download}</span>
                  <div className="flex items-center gap-2">
                    {getComparisonIcon(downloadSpeed, averages.egypt.download)}
                    <span className={`text-xs font-mono ${getComparisonText(downloadSpeed, averages.egypt.download).color}`}>
                      {getComparisonText(downloadSpeed, averages.egypt.download).text}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t.upload}</span>
                  <div className="flex items-center gap-2">
                    {getComparisonIcon(uploadSpeed, averages.egypt.upload)}
                    <span className={`text-xs font-mono ${getComparisonText(uploadSpeed, averages.egypt.upload).color}`}>
                      {getComparisonText(uploadSpeed, averages.egypt.upload).text}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t.ping}</span>
                  <div className="flex items-center gap-2">
                    {getComparisonIcon(ping, averages.egypt.ping, true)}
                    <span className={`text-xs font-mono ${getComparisonText(ping, averages.egypt.ping, true).color}`}>
                      {getComparisonText(ping, averages.egypt.ping, true).text}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle East Comparison */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary/20 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-muted/20 rounded-xl p-4 border border-secondary/10 group-hover:border-secondary/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🌍</span>
                <span className="font-display text-sm text-foreground">{t.middleEastAverage}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t.download}</span>
                  <div className="flex items-center gap-2">
                    {getComparisonIcon(downloadSpeed, averages.middleEast.download)}
                    <span className={`text-xs font-mono ${getComparisonText(downloadSpeed, averages.middleEast.download).color}`}>
                      {getComparisonText(downloadSpeed, averages.middleEast.download).text}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t.upload}</span>
                  <div className="flex items-center gap-2">
                    {getComparisonIcon(uploadSpeed, averages.middleEast.upload)}
                    <span className={`text-xs font-mono ${getComparisonText(uploadSpeed, averages.middleEast.upload).color}`}>
                      {getComparisonText(uploadSpeed, averages.middleEast.upload).text}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t.ping}</span>
                  <div className="flex items-center gap-2">
                    {getComparisonIcon(ping, averages.middleEast.ping, true)}
                    <span className={`text-xs font-mono ${getComparisonText(ping, averages.middleEast.ping, true).color}`}>
                      {getComparisonText(ping, averages.middleEast.ping, true).text}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Global Comparison */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-muted/20 rounded-xl p-4 border border-accent/10 group-hover:border-accent/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-6 h-6 text-accent" />
                <span className="font-display text-sm text-foreground">{t.globalAverage}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t.download}</span>
                  <div className="flex items-center gap-2">
                    {getComparisonIcon(downloadSpeed, averages.global.download)}
                    <span className={`text-xs font-mono ${getComparisonText(downloadSpeed, averages.global.download).color}`}>
                      {getComparisonText(downloadSpeed, averages.global.download).text}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t.upload}</span>
                  <div className="flex items-center gap-2">
                    {getComparisonIcon(uploadSpeed, averages.global.upload)}
                    <span className={`text-xs font-mono ${getComparisonText(uploadSpeed, averages.global.upload).color}`}>
                      {getComparisonText(uploadSpeed, averages.global.upload).text}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t.ping}</span>
                  <div className="flex items-center gap-2">
                    {getComparisonIcon(ping, averages.global.ping, true)}
                    <span className={`text-xs font-mono ${getComparisonText(ping, averages.global.ping, true).color}`}>
                      {getComparisonText(ping, averages.global.ping, true).text}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedComparison;
