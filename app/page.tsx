"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ServerIcon, PlayIcon, StopIcon, RefreshCwIcon } from "lucide-react";

export default function Home() {
  const [servers, setServers] = useState([
    { id: 1, name: "Minecraft Server", status: "running", players: 12, maxPlayers: 50, cpu: 45, memory: 60 },
    { id: 2, name: "CS2 Server", status: "stopped", players: 0, maxPlayers: 32, cpu: 0, memory: 0 },
    { id: 3, name: "Rust Server", status: "running", players: 8, maxPlayers: 20, cpu: 75, memory: 80 },
  ]);

  const handleServerAction = (serverId: number, action: string) => {
    // This would connect to a backend API in a real application
    console.log(`Performing ${action} on server ${serverId}`);
    
    if (action === "restart") {
      setServers(servers.map(server => 
        server.id === serverId 
          ? { ...server, status: "restarting" }
          : server
      ));
      
      // Simulate restart delay
      setTimeout(() => {
        setServers(servers.map(server => 
          server.id === serverId 
            ? { ...server, status: "running" }
            : server
        ));
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex items-center gap-2">
          <ServerIcon className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Game Server Dashboard</h1>
        </div>
        <nav className="ml-auto flex gap-2">
          <Button variant="ghost" size="sm">Dashboard</Button>
          <Button variant="ghost" size="sm">Servers</Button>
          <Button variant="ghost" size="sm">Settings</Button>
        </nav>
      </header>
      
      <main className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Game Servers</h2>
          <Button>Add Server</Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servers.map((server) => (
            <Card key={server.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{server.name}</CardTitle>
                  <div className={`h-3 w-3 rounded-full ${server.status === 'running' ? 'bg-green-500' : server.status === 'restarting' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                </div>
                <CardDescription>
                  {server.players}/{server.maxPlayers} players online
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span>{server.cpu}%</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div 
                        className="h-2 rounded-full bg-blue-500" 
                        style={{ width: `${server.cpu}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span>{server.memory}%</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div 
                        className="h-2 rounded-full bg-green-500" 
                        style={{ width: `${server.memory}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant={server.status === "running" ? "secondary" : "default"}
                      onClick={() => handleServerAction(server.id, server.status === "running" ? "stop" : "start")}
                    >
                      {server.status === "running" ? <StopIcon className="mr-2 h-4 w-4" /> : <PlayIcon className="mr-2 h-4 w-4" />}
                      {server.status === "running" ? "Stop" : "Start"}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleServerAction(server.id, "restart")}
                    >
                      <RefreshCwIcon className="mr-2 h-4 w-4" />
                      Restart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}