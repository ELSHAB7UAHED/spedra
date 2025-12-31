import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, MapPin, Building2, Wifi, Shield, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  isp: string;
  org: string;
  timezone: string;
  lat: number;
  lon: number;
}

const IpDisplay = () => {
  const { t, isRTL } = useLanguage();
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        // Try multiple APIs for better reliability
        const response = await fetch("https://speed.cloudflare.com/meta");
        const data = await response.json();
        
        setIpInfo({
          ip: data.clientIp || "---",
          city: data.city || "---",
          region: data.region || "---",
          country: data.country || "---",
          countryCode: data.colo || "---",
          isp: data.asOrganization || "---",
          org: data.asOrganization || "---",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          lat: data.latitude || 0,
          lon: data.longitude || 0,
        });
      } catch (error) {
        console.error("Failed to fetch IP info:", error);
        setIpInfo({
          ip: "---",
          city: "---",
          region: "---",
          country: "---",
          countryCode: "---",
          isp: "---",
          org: "---",
          timezone: "---",
          lat: 0,
          lon: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchIpInfo();
  }, []);

  const handleCopyIp = async () => {
    if (ipInfo?.ip && ipInfo.ip !== "---") {
      try {
        await navigator.clipboard.writeText(ipInfo.ip);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const getCountryFlag = (code: string) => {
    const flags: Record<string, string> = {
      EG: "🇪🇬", US: "🇺🇸", GB: "🇬🇧", DE: "🇩🇪", FR: "🇫🇷",
      SA: "🇸🇦", AE: "🇦🇪", KW: "🇰🇼", QA: "🇶🇦", BH: "🇧🇭",
      JO: "🇯🇴", LB: "🇱🇧", SY: "🇸🇾", IQ: "🇮🇶", OM: "🇴🇲",
      YE: "🇾🇪", PS: "🇵🇸", LY: "🇱🇾", TN: "🇹🇳", DZ: "🇩🇿",
      MA: "🇲🇦", SD: "🇸🇩",
    };
    return flags[code] || "🌐";
  };

  if (loading) {
    return (
      <div className="relative animate-pulse">
        <div className="bg-card/50 backdrop-blur-xl rounded-2xl border border-primary/20 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-muted/30 rounded w-24" />
              <div className="h-6 bg-muted/30 rounded w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-card/50 backdrop-blur-xl rounded-2xl border border-primary/20 p-6 overflow-hidden group-hover:border-primary/40 transition-colors duration-300">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_1px,transparent_1px)] bg-[length:20px_20px]" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg text-foreground">{t.yourConnection}</h3>
                <p className="text-xs text-muted-foreground font-mono">{t.networkDetails}</p>
              </div>
            </div>
            
            {/* Status indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-mono text-primary">{t.connected}</span>
            </div>
          </div>

          {/* IP Address Card */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 mb-4 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <span className="text-xs text-muted-foreground block">{t.ipAddress}</span>
                  <span className="font-mono text-xl text-foreground font-bold" dir="ltr">{ipInfo?.ip}</span>
                </div>
              </div>
              <button
                onClick={handleCopyIp}
                className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-primary" />
                ) : (
                  <Copy className="w-4 h-4 text-primary" />
                )}
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/20 rounded-xl p-3 border border-primary/10">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-xs text-muted-foreground">{t.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{getCountryFlag(ipInfo?.country || "")}</span>
                <span className="font-mono text-sm text-foreground">{ipInfo?.city || ipInfo?.country}</span>
              </div>
            </div>

            <div className="bg-muted/20 rounded-xl p-3 border border-primary/10">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4 text-accent" />
                <span className="text-xs text-muted-foreground">{t.isp}</span>
              </div>
              <span className="font-mono text-sm text-foreground truncate block">{ipInfo?.isp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IpDisplay;
