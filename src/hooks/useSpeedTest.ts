import { useState, useCallback } from "react";

interface TestResults {
  download: number;
  upload: number;
  ping: number;
  jitter: number;
  server: string;
  ip: string;
  isp: string;
}

type TestPhase = "idle" | "ping" | "download" | "upload" | "complete";

// Test files from Cloudflare's speed test CDN - optimized for speed
const TEST_FILES = {
  small: "https://speed.cloudflare.com/__down?bytes=100000", // 100KB
  medium: "https://speed.cloudflare.com/__down?bytes=500000", // 500KB
  large: "https://speed.cloudflare.com/__down?bytes=2000000", // 2MB
  xlarge: "https://speed.cloudflare.com/__down?bytes=5000000", // 5MB
};

const UPLOAD_URL = "https://speed.cloudflare.com/__up";

export const useSpeedTest = () => {
  const [testing, setTesting] = useState(false);
  const [phase, setPhase] = useState<TestPhase>("idle");
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<TestResults>({
    download: 0,
    upload: 0,
    ping: 0,
    jitter: 0,
    server: "Cloudflare CDN",
    ip: "---",
    isp: "---",
  });

  // Measure ping using multiple requests (faster - 5 requests)
  const measurePing = async (): Promise<{ ping: number; jitter: number }> => {
    const pingResults: number[] = [];
    const pingUrl = "https://speed.cloudflare.com/__down?bytes=0";
    
    // Use parallel requests for faster measurement
    const pingPromises = Array.from({ length: 5 }, async () => {
      const start = performance.now();
      try {
        await fetch(pingUrl, { cache: "no-store", mode: "cors" });
        return performance.now() - start;
      } catch {
        return null;
      }
    });

    const results = await Promise.all(pingPromises);
    results.forEach(r => r !== null && pingResults.push(r));
    
    if (pingResults.length === 0) return { ping: 0, jitter: 0 };
    
    const avgPing = pingResults.reduce((a, b) => a + b, 0) / pingResults.length;
    const jitter = pingResults.reduce((acc, val) => acc + Math.abs(val - avgPing), 0) / pingResults.length;
    
    return { ping: Math.round(avgPing), jitter: Math.round(jitter) };
  };

  // Measure download speed
  const measureDownload = async (): Promise<number> => {
    const speeds: number[] = [];
    
    // Start with small file to warm up
    try {
      const warmupStart = performance.now();
      const warmupResponse = await fetch(TEST_FILES.small, { cache: "no-store" });
      await warmupResponse.arrayBuffer();
      const warmupTime = (performance.now() - warmupStart) / 1000;
      const warmupSpeed = (100000 * 8) / warmupTime / 1000000; // Mbps
      setCurrentSpeed(warmupSpeed);
      setProgress(10);
    } catch (e) {
      console.log("Warmup failed:", e);
    }

    // Test with progressively larger files
    const testConfigs = [
      { url: TEST_FILES.medium, size: 1000000, weight: 20 },
      { url: TEST_FILES.large, size: 10000000, weight: 40 },
      { url: TEST_FILES.xlarge, size: 25000000, weight: 30 },
    ];

    let progressAccum = 10;

    for (const config of testConfigs) {
      try {
        const start = performance.now();
        const response = await fetch(config.url, { 
          cache: "no-store",
          mode: "cors",
        });
        
        if (!response.ok) throw new Error("Download failed");
        
        const reader = response.body?.getReader();
        if (!reader) throw new Error("No reader");
        
        let receivedBytes = 0;
        let lastUpdate = start;
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          receivedBytes += value?.length || 0;
          const now = performance.now();
          
          // Update speed every 100ms
          if (now - lastUpdate > 100) {
            const elapsed = (now - start) / 1000;
            const currentSpeedMbps = (receivedBytes * 8) / elapsed / 1000000;
            setCurrentSpeed(currentSpeedMbps);
            setProgress(progressAccum + (receivedBytes / config.size) * config.weight);
            lastUpdate = now;
          }
        }
        
        const elapsed = (performance.now() - start) / 1000;
        const speedMbps = (receivedBytes * 8) / elapsed / 1000000;
        speeds.push(speedMbps);
        progressAccum += config.weight;
        
      } catch (e) {
        console.log("Download test failed:", e);
      }
    }

    setProgress(100);
    
    if (speeds.length === 0) return 0;
    
    // Return weighted average, giving more weight to larger file tests
    const weights = [0.2, 0.4, 0.4];
    let weightedSum = 0;
    let weightSum = 0;
    
    for (let i = 0; i < speeds.length; i++) {
      weightedSum += speeds[i] * weights[i];
      weightSum += weights[i];
    }
    
    return weightedSum / weightSum;
  };

  // Generate random data in chunks (getRandomValues has 65536 byte limit)
  const generateRandomData = (size: number): Uint8Array => {
    const data = new Uint8Array(size);
    const chunkSize = 65536;
    for (let offset = 0; offset < size; offset += chunkSize) {
      const length = Math.min(chunkSize, size - offset);
      const chunk = new Uint8Array(length);
      crypto.getRandomValues(chunk);
      data.set(chunk, offset);
    }
    return data;
  };

  // Measure upload speed
  const measureUpload = async (): Promise<number> => {
    const speeds: number[] = [];
    const testSizes = [50000, 100000, 200000]; // Smaller sizes for faster test
    
    setProgress(0);
    let progressAccum = 0;
    const progressPerTest = 100 / testSizes.length;

    for (const size of testSizes) {
      try {
        // Generate random data - create ArrayBuffer directly
        const buffer = new ArrayBuffer(size);
        const view = new Uint8Array(buffer);
        const chunkSize = 65536;
        for (let offset = 0; offset < size; offset += chunkSize) {
          const length = Math.min(chunkSize, size - offset);
          crypto.getRandomValues(view.subarray(offset, offset + length));
        }
        
        const start = performance.now();
        
        const response = await fetch(UPLOAD_URL, {
          method: "POST",
          body: buffer,
          mode: "cors",
        });
        
        if (!response.ok) throw new Error("Upload failed");
        
        const elapsed = (performance.now() - start) / 1000;
        const speedMbps = (size * 8) / elapsed / 1000000;
        speeds.push(speedMbps);
        
        setCurrentSpeed(speedMbps);
        progressAccum += progressPerTest;
        setProgress(progressAccum);
        
      } catch (e) {
        console.log("Upload test failed:", e);
      }
    }

    setProgress(100);
    
    if (speeds.length === 0) return 0;
    return speeds.reduce((a, b) => a + b, 0) / speeds.length;
  };

  // Get IP info - show real IP
  const getIpInfo = async (): Promise<{ ip: string; isp: string }> => {
    try {
      const response = await fetch("https://speed.cloudflare.com/meta");
      const data = await response.json();
      return {
        ip: data.clientIp || "---",
        isp: data.asOrganization || "---",
      };
    } catch (e) {
      console.log("IP info failed:", e);
      return { ip: "---", isp: "---" };
    }
  };

  const runSpeedTest = useCallback(async () => {
    setTesting(true);
    setProgress(0);
    setCurrentSpeed(0);
    
    try {
      // Phase 1: Get IP info and measure ping
      setPhase("ping");
      const [ipInfo, pingResults] = await Promise.all([
        getIpInfo(),
        measurePing(),
      ]);
      
      setResults(prev => ({
        ...prev,
        ip: ipInfo.ip,
        isp: ipInfo.isp,
        ping: pingResults.ping,
        jitter: pingResults.jitter,
      }));

      // Phase 2: Download test
      setPhase("download");
      setProgress(0);
      const downloadSpeed = await measureDownload();
      setResults(prev => ({ ...prev, download: downloadSpeed }));

      // Phase 3: Upload test
      setPhase("upload");
      setProgress(0);
      const uploadSpeed = await measureUpload();
      setResults(prev => ({ ...prev, upload: uploadSpeed }));

      // Complete
      setPhase("complete");
      setCurrentSpeed(0);
      
    } catch (error) {
      console.error("Speed test error:", error);
    } finally {
      setTesting(false);
    }
  }, []);

  return {
    testing,
    phase,
    currentSpeed,
    progress,
    results,
    runSpeedTest,
  };
};
