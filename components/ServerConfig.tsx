"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";

export function ServerConfig({ serverId }: { serverId: number }) {
  const [config, setConfig] = useState({
    serverName: "Minecraft Server",
    maxPlayers: 50,
    difficulty: "normal",
    pvp: true,
    whitelist: false,
    autoSave: true,
    viewDistance: 10,
    tickDistance: 8,
    backupInterval: 30,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  const saveConfig = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Server configuration saved!");
    setUnsavedChanges(false);
    setIsSaving(false);
    
    // In a real app, this would call an API endpoint
    // await fetch(`/api/servers/${serverId}/config`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(config)
    // })
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Server Configuration</CardTitle>
        <Button 
          size="sm" 
          onClick={saveConfig} 
          disabled={!unsavedChanges || isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="serverName">Server Name</Label>
            <Input
              id="serverName"
              value={config.serverName}
              onChange={(e) => handleInputChange('serverName', e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="maxPlayers">Maximum Players</Label>
            <Input
              id="maxPlayers"
              type="number"
              min="1"
              max="100"
              value={config.maxPlayers}
              onChange={(e) => handleInputChange('maxPlayers', parseInt(e.target.value))}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select 
              value={config.difficulty} 
              onValueChange={(value) => handleInputChange('difficulty', value)}
            >
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="peaceful">Peaceful</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="pvp">Player vs Player (PvP)</Label>
              <span className="text-sm text-muted-foreground">
                Allow players to attack each other
              </span>
            </div>
            <Switch
              id="pvp"
              checked={config.pvp}
              onCheckedChange={(checked) => handleInputChange('pvp', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="whitelist">Whitelist</Label>
              <span className="text-sm text-muted-foreground">
                Only allow listed players to join
              </span>
            </div>
            <Switch
              id="whitelist"
              checked={config.whitelist}
              onCheckedChange={(checked) => handleInputChange('whitelist', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="autoSave">Auto Save</Label>
              <span className="text-sm text-muted-foreground">
                Automatically save world data
              </span>
            </div>
            <Switch
              id="autoSave"
              checked={config.autoSave}
              onCheckedChange={(checked) => handleInputChange('autoSave', checked)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="viewDistance">View Distance</Label>
            <Input
              id="viewDistance"
              type="number"
              min="5"
              max="16"
              value={config.viewDistance}
              onChange={(e) => handleInputChange('viewDistance', parseInt(e.target.value))}
            />
            <p className="text-sm text-muted-foreground">
              Distance (in chunks) that players can see
            </p>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="backupInterval">Backup Interval (minutes)</Label>
            <Input
              id="backupInterval"
              type="number"
              min="5"
              max="60"
              value={config.backupInterval}
              onChange={(e) => handleInputChange('backupInterval', parseInt(e.target.value))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}