import { useEffect, useState } from "react";

export default function SystemStatus() {
  const [latency, setLatency] = useState(32);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 20) + 20);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card neon-border p-6 rounded-2xl w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4 text-cyan-400">
        AI System Status
      </h3>

      <div className="space-y-3 text-sm text-gray-300">
        <div className="flex justify-between">
          <span>Neural Core</span>
          <span className="text-green-400 animate-pulse">Active</span>
        </div>

        <div className="flex justify-between">
          <span>ML Engine</span>
          <span className="text-green-400 animate-pulse">Running</span>
        </div>

        <div className="flex justify-between">
          <span>API Status</span>
          <span className="text-green-400">Online</span>
        </div>

        <div className="flex justify-between">
          <span>Latency</span>
          <span className="text-cyan-400">{latency}ms</span>
        </div>
      </div>
    </div>
  );
}