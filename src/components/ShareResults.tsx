import { useLanguage } from "@/contexts/LanguageContext";
import { useSound } from "@/contexts/SoundContext";
import { Share2, Copy, Twitter, Facebook, MessageCircle, Check } from "lucide-react";
import { useState } from "react";

interface ShareResultsProps {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  jitter: number;
  server: string;
  ip: string;
  isp: string;
}

const ShareResults = ({ downloadSpeed, uploadSpeed, ping, jitter, server, ip, isp }: ShareResultsProps) => {
  const { t, isRTL } = useLanguage();
  const { playSound } = useSound();
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);

  if (downloadSpeed === 0) return null;

  const shareText = `🚀 ${t.mySpeedResults}

⬇️ ${t.download}: ${downloadSpeed.toFixed(1)} Mbps
⬆️ ${t.upload}: ${uploadSpeed.toFixed(1)} Mbps
📡 ${t.ping}: ${ping} ms
📊 ${t.jitter}: ${jitter} ms
🌐 ${t.server}: ${server}
🏢 ISP: ${isp}

${t.testedWith} Spedra ⚡
https://spedra.vercel.app`;

  const handleCopy = async () => {
    playSound("click");
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      playSound("success");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleTwitterShare = () => {
    playSound("click");
    const text = encodeURIComponent(`🚀 سرعة الإنترنت عندي:\n⬇️ ${downloadSpeed.toFixed(1)} Mbps\n⬆️ ${uploadSpeed.toFixed(1)} Mbps\n📡 ${ping}ms\n\nاختبر سرعتك مع Spedra ⚡`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=https://spedra.vercel.app`, "_blank");
  };

  const handleFacebookShare = () => {
    playSound("click");
    window.open(`https://www.facebook.com/sharer/sharer.php?u=https://spedra.vercel.app`, "_blank");
  };

  const handleWhatsAppShare = () => {
    playSound("click");
    const text = encodeURIComponent(shareText);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          playSound("click");
          setShowShare(!showShare);
        }}
        className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-secondary/20 to-accent/20 
                   border border-secondary/30 hover:border-secondary hover:shadow-[0_0_30px_hsl(var(--secondary)/0.3)]
                   transition-all duration-300 group"
      >
        <Share2 className="w-5 h-5 text-secondary group-hover:rotate-12 transition-transform" />
        <span className="font-display text-sm text-foreground">{t.shareResults}</span>
      </button>

      {/* Share Dropdown */}
      {showShare && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowShare(false)} />
          <div className="absolute z-50 mt-2 animate-fade-in">
            <div className={`bg-card/95 backdrop-blur-xl rounded-2xl border border-secondary/30 shadow-[0_10px_40px_hsl(var(--secondary)/0.2)] p-4 min-w-[280px] ${isRTL ? "right-0" : "left-0"}`}>
              {/* Preview Card */}
              <div className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-4 mb-4 border border-primary/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-sm text-primary">Spedra ⚡</span>
                  <span className="text-xs text-muted-foreground">{t.speedTest}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary">{downloadSpeed.toFixed(1)}</div>
                    <div className="text-xs text-muted-foreground">⬇️ Mbps</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-secondary">{uploadSpeed.toFixed(1)}</div>
                    <div className="text-xs text-muted-foreground">⬆️ Mbps</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-accent">{ping}</div>
                    <div className="text-xs text-muted-foreground">📡 ms</div>
                  </div>
                </div>
              </div>

              {/* Share Options */}
              <div className="space-y-2">
                <button
                  onClick={handleCopy}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/20 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-200"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-primary" />
                  ) : (
                    <Copy className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span className="font-mono text-sm text-foreground">
                    {copied ? t.copied : t.copyResults}
                  </span>
                </button>

                <button
                  onClick={handleTwitterShare}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/20 hover:bg-[#1DA1F2]/10 border border-transparent hover:border-[#1DA1F2]/30 transition-all duration-200"
                >
                  <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                  <span className="font-mono text-sm text-foreground">Twitter / X</span>
                </button>

                <button
                  onClick={handleFacebookShare}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/20 hover:bg-[#1877F2]/10 border border-transparent hover:border-[#1877F2]/30 transition-all duration-200"
                >
                  <Facebook className="w-5 h-5 text-[#1877F2]" />
                  <span className="font-mono text-sm text-foreground">Facebook</span>
                </button>

                <button
                  onClick={handleWhatsAppShare}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/20 hover:bg-[#25D366]/10 border border-transparent hover:border-[#25D366]/30 transition-all duration-200"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <span className="font-mono text-sm text-foreground">WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareResults;
