import { SpeedResult } from "@/hooks/useSpeedHistory";
import { useLanguage } from "@/contexts/LanguageContext";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, Activity } from "lucide-react";

interface SpeedChartProps {
  history: SpeedResult[];
}

const SpeedChart = ({ history }: SpeedChartProps) => {
  const { t, isRTL } = useLanguage();

  if (history.length < 2) {
    return null;
  }

  // Prepare data for charts (reverse for chronological order)
  const chartData = [...history].reverse().map((result, index) => ({
    index: index + 1,
    date: new Date(result.timestamp).toLocaleDateString(isRTL ? "ar-EG" : "en-US", {
      month: "short",
      day: "numeric",
    }),
    download: Math.round(result.download * 10) / 10,
    upload: Math.round(result.upload * 10) / 10,
    ping: result.ping,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-primary/30 rounded-lg p-3 shadow-lg">
          <p className="text-xs font-mono text-muted-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-bold" style={{ color: entry.color }}>
                {entry.value} {entry.name === "Ping" ? "ms" : "Mbps"}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Speed Chart */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative bg-card/50 backdrop-blur-sm rounded-xl border border-primary/20 p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="font-display text-sm text-primary">{t.speedOverTime}</h3>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="downloadGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(160 100% 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(160 100% 50%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="uploadGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(200 100% 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(200 100% 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 50% 20% / 0.3)" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(160 50% 50%)" 
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis 
                  stroke="hsl(160 50% 50%)" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="download"
                  name="Download"
                  stroke="hsl(160 100% 50%)"
                  strokeWidth={2}
                  fill="url(#downloadGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="upload"
                  name="Upload"
                  stroke="hsl(200 100% 50%)"
                  strokeWidth={2}
                  fill="url(#uploadGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Ping Chart */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 via-primary/20 to-secondary/20 rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative bg-card/50 backdrop-blur-sm rounded-xl border border-accent/20 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-accent" />
            <h3 className="font-display text-sm text-accent">Ping (ms)</h3>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(320 100% 60% / 0.2)" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(320 100% 60% / 0.5)" 
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis 
                  stroke="hsl(320 100% 60% / 0.5)" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="ping"
                  name="Ping"
                  fill="hsl(320 100% 60%)"
                  radius={[4, 4, 0, 0]}
                  opacity={0.8}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedChart;
