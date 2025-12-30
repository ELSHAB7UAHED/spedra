import { useState, useEffect, useCallback } from "react";

export interface SpeedResult {
  id: string;
  timestamp: number;
  download: number;
  upload: number;
  ping: number;
  jitter: number;
  server: string;
  ip: string;
  isp: string;
}

const STORAGE_KEY = "spedra-speed-history";
const MAX_RESULTS = 20;

export const useSpeedHistory = () => {
  const [history, setHistory] = useState<SpeedResult[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const saveResult = useCallback((result: Omit<SpeedResult, "id" | "timestamp">) => {
    const newResult: SpeedResult = {
      ...result,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      const updated = [newResult, ...prev].slice(0, MAX_RESULTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { history, saveResult, clearHistory };
};
