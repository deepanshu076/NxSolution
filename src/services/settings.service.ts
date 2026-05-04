import { supabase } from "@/src/lib/supabase";

export type SystemSettings = {
  id?: string;
  app_name: string;
  app_description: string;
  support_email: string;
  support_phone?: string;
  timezone: string;
  currency: string;
  max_file_upload_mb: number;
  maintenance_mode: boolean;
  created_at?: string;
  updated_at?: string;
};

const SETTINGS_TABLE = "system_settings";

export async function getSettings(): Promise<SystemSettings> {
  const { data, error } = await supabase
    .from(SETTINGS_TABLE)
    .select("*")
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") throw error;

  return (
    data || {
      app_name: "NxSolution",
      app_description: "Digital Solutions Platform",
      support_email: "support@nxsolution.com",
      timezone: "UTC",
      currency: "USD",
      max_file_upload_mb: 10,
      maintenance_mode: false,
    }
  );
}

export async function updateSettings(payload: Partial<SystemSettings>) {
  const existing = await getSettings();

  if (existing.id) {
    const { data, error } = await supabase
      .from(SETTINGS_TABLE)
      .update(payload)
      .eq("id", existing.id)
      .select()
      .single();
    if (error) throw error;
    return data as SystemSettings;
  } else {
    const { data, error } = await supabase
      .from(SETTINGS_TABLE)
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data as SystemSettings;
  }
}
