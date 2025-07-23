"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const sampleLogs = [
  { id: 1, timestamp: "2025-07-23 14:30:15", level: "INFO", message: "Server started successfully" },
  { id: 2, timestamp: "2025-07-23 14:31:22", level: "INFO", message: "Player 'gamer123' joined the server" },
  { id: 3, timestamp: "2025-07-23 14:32:45", level: "WARNING", message: "High CPU usage detected (85%)" },
  { id: 4, timestamp: "2025-07-23 14:33:10", level: "INFO", message: "Player 'pro_gamer' joined the server" },
  { id: 5, timestamp: "2025-07-23 14:34:20", level: "ERROR", message: "Failed to save world data" },
  { id: 6, timestamp: "2025-07-23 14:35:05", level: "INFO", message: "Backup completed successfully" },
  { id: 7, timestamp: "2025-07-23 14:36:30", level: "INFO", message: "Player 'gamer123' left the server" },
];

export function ServerLogs({ serverId }: { serverId: number }) {
  const [logs, setLogs] = useState(sampleLogs);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulate new logs arriving
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      const newLog = {
        id: logs.length + 1,
        timestamp: new Date().toLocaleString(),
        level: ["INFO", "WARNING", "ERROR"][Math.floor(Math.random() * 3)],
        message: [
          "Player activity detected",
          "Resource usage normal",
          "Backup process started",
          "Network latency increased",
          "Player disconnected unexpectedly",
          "Achievement unlocked by player",
        ][Math.floor(Math.random() * 6)]
      };
      setLogs(prev => [newLog, ...prev].slice(0, 100));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoRefresh, logs.length]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "ERROR": return "text-red-500";
      case "WARNING": return "text-yellow-500";
      case "INFO": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Server Logs</CardTitle>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Auto-refresh</span>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              autoRefresh ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span 
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                autoRefresh ? 'translate-x-6' : 'translate-x-1'
              }`} 
            />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 rounded-md border p-4 font-mono text-sm">
          {logs.map((log) => (
            <div key={log.id} className="mb-1 flex text-xs">
              <span className="text-gray-500 w-32">{log.timestamp}</span>
              <span className={`w-16 ${getLevelColor(log.level)}`}>{log.level}</span>
              <span className="text-gray-700 dark:text-gray-300">{log.message}</span>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}