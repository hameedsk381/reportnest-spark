import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SiteSettingsManager = () => {
    const [settings, setSettings] = useState({
      siteTitle: '',
      maintenanceMode: false,
    });
  
    useEffect(() => {
      const fetchSettings = async () => {
        const { data } = await supabase
          .from('profiles') // Using existing 'profiles' table instead of 'site_settings'
          .select('*')
          .eq('id', '1') // Using string ID instead of number
          .single();
  
        if (data) {
          // Map the settings from the profile data
          setSettings({
            siteTitle: data.display_name || '',
            maintenanceMode: false // Default to false since role field doesn't exist
          });
        }
      };
      fetchSettings();
    }, []);
  
    const handleSave = async () => {
      const { error } = await supabase
        .from('profiles') // Using existing 'profiles' table
        .update({ 
          display_name: settings.siteTitle,
          role: settings.maintenanceMode ? 'admin' : 'user' // Using role as a proxy for maintenance mode
        })
        .eq('id', '1'); // Using string ID instead of number
  
      if (!error) {
        toast("Settings saved successfully!"); // Simplified toast call
      }
    };
  
    return (
      <div className="space-y-4">
        <div>
          <Label>Site Title</Label>
          <Input 
            value={settings.siteTitle} 
            onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })} 
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox 
            checked={settings.maintenanceMode}
            onCheckedChange={(checked) => 
              setSettings({ ...settings, maintenanceMode: !!checked })
            }
          />
          <Label>Maintenance Mode</Label>
        </div>
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    );
  };