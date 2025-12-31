import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Server, MapPin, Signal, Check, ChevronDown } from "lucide-react";
import { useState } from "react";

export interface ServerOption {
  id: string;
  name: string;
  location: string;
  country: string;
  flag: string;
  pingUrl: string;
  downloadUrl: string;
  uploadUrl: string;
}

export const SERVERS: ServerOption[] = [
  {
    id: "cloudflare",
    name: "Cloudflare",
    location: "Global CDN",
    country: "Global",
    flag: "🌐",
    pingUrl: "https://speed.cloudflare.com/__down?bytes=0",
    downloadUrl: "https://speed.cloudflare.com/__down?bytes=",
    uploadUrl: "https://speed.cloudflare.com/__up",
  },
  {
    id: "cloudflare-us",
    name: "Cloudflare US",
    location: "United States",
    country: "USA",
    flag: "🇺🇸",
    pingUrl: "https://speed.cloudflare.com/__down?bytes=0",
    downloadUrl: "https://speed.cloudflare.com/__down?bytes=",
    uploadUrl: "https://speed.cloudflare.com/__up",
  },
  {
    id: "cloudflare-eu",
    name: "Cloudflare EU",
    location: "Europe",
    country: "EU",
    flag: "🇪🇺",
    pingUrl: "https://speed.cloudflare.com/__down?bytes=0",
    downloadUrl: "https://speed.cloudflare.com/__down?bytes=",
    uploadUrl: "https://speed.cloudflare.com/__up",
  },
  {
    id: "cloudflare-asia",
    name: "Cloudflare Asia",
    location: "Singapore",
    country: "Asia",
    flag: "🇸🇬",
    pingUrl: "https://speed.cloudflare.com/__down?bytes=0",
    downloadUrl: "https://speed.cloudflare.com/__down?bytes=",
    uploadUrl: "https://speed.cloudflare.com/__up",
  },
  {
    id: "cloudflare-me",
    name: "Cloudflare ME",
    location: "Middle East",
    country: "UAE",
    flag: "🇦🇪",
    pingUrl: "https://speed.cloudflare.com/__down?bytes=0",
    downloadUrl: "https://speed.cloudflare.com/__down?bytes=",
    uploadUrl: "https://speed.cloudflare.com/__up",
  },
];

interface ServerSelectorProps {
  selectedServer: ServerOption;
  onSelectServer: (server: ServerOption) => void;
  disabled?: boolean;
}

const ServerSelector = ({ selectedServer, onSelectServer, disabled }: ServerSelectorProps) => {
  const { t, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Selected Server Button */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          flex items-center gap-3 px-5 py-3 rounded-2xl w-full
          bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-xl
          border border-primary/30 hover:border-primary/50
          transition-all duration-300 group
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${isOpen ? "border-primary shadow-[0_0_30px_hsl(var(--primary)/0.2)]" : ""}
        `}
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <span className="text-2xl">{selectedServer.flag}</span>
        </div>
        
        <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-primary" />
            <span className="font-display text-sm text-primary">{t.selectServer}</span>
          </div>
          <div className="font-mono text-foreground text-sm mt-0.5">
            {selectedServer.name} - {selectedServer.location}
          </div>
        </div>

        <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 animate-fade-in">
          <div className="bg-card/95 backdrop-blur-xl rounded-2xl border border-primary/30 shadow-[0_10px_40px_hsl(var(--primary)/0.2)] overflow-hidden">
            <div className="p-2 max-h-80 overflow-y-auto">
              {SERVERS.map((server) => (
                <button
                  key={server.id}
                  onClick={() => {
                    onSelectServer(server);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200 group/item
                    ${selectedServer.id === server.id 
                      ? "bg-primary/20 border border-primary/40" 
                      : "hover:bg-primary/10 border border-transparent"
                    }
                  `}
                >
                  <div className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                    <span className="text-2xl">{server.flag}</span>
                  </div>
                  
                  <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                    <div className="font-display text-sm text-foreground">{server.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="font-mono text-xs text-muted-foreground">{server.location}</span>
                    </div>
                  </div>

                  {selectedServer.id === server.id && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Click outside overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ServerSelector;
