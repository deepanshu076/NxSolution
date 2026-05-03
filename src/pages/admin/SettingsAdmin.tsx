import React, { useEffect, useState } from "react";
import {
  getSettings,
  updateSettings,
  SystemSettings,
} from "@/src/services/settings.service";
import { useToast } from "@/src/components/ui/Toast";

export default function SettingsAdmin() {
  const toast = useToast();
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (err: any) {
        toast.error(err.message || "Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (key: keyof SystemSettings, value: any) => {
    setSettings((prev) => (prev ? { ...prev, [key]: value } : null));
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      const updated = await updateSettings({
        app_name: settings.app_name,
        app_description: settings.app_description,
        support_email: settings.support_email,
        support_phone: settings.support_phone,
        timezone: settings.timezone,
        currency: settings.currency,
        max_file_upload_mb: settings.max_file_upload_mb,
        maintenance_mode: settings.maintenance_mode,
      });
      setSettings(updated);
      toast.success("Settings saved successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-slate-blue/60">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-slate-blue/60">No settings found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-blue">System Settings</h2>
        <p className="text-slate-blue/60 text-sm mt-1">
          Configure application settings and preferences
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          {/* Application Settings */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-bold text-slate-blue mb-4">
              Application
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-blue mb-1">
                  App Name
                </label>
                <input
                  type="text"
                  value={settings.app_name}
                  onChange={(e) => handleChange("app_name", e.target.value)}
                  className="w-full border border-cool-gray/30 rounded-lg p-3 text-slate-blue placeholder:text-slate-blue/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-blue mb-1">
                  App Description
                </label>
                <textarea
                  value={settings.app_description}
                  onChange={(e) =>
                    handleChange("app_description", e.target.value)
                  }
                  rows={3}
                  className="w-full border border-cool-gray/30 rounded-lg p-3 text-slate-blue placeholder:text-slate-blue/40"
                />
              </div>
            </div>
          </div>

          {/* Support Settings */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-bold text-slate-blue mb-4">Support</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-blue mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  value={settings.support_email}
                  onChange={(e) =>
                    handleChange("support_email", e.target.value)
                  }
                  className="w-full border border-cool-gray/30 rounded-lg p-3 text-slate-blue placeholder:text-slate-blue/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-blue mb-1">
                  Support Phone
                </label>
                <input
                  type="tel"
                  value={settings.support_phone || ""}
                  onChange={(e) =>
                    handleChange("support_phone", e.target.value)
                  }
                  className="w-full border border-cool-gray/30 rounded-lg p-3 text-slate-blue placeholder:text-slate-blue/40"
                />
              </div>
            </div>
          </div>

          {/* Regional Settings */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-bold text-slate-blue mb-4">Regional</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-blue mb-1">
                  Timezone
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleChange("timezone", e.target.value)}
                  className="w-full border border-cool-gray/30 rounded-lg p-3 text-slate-blue"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">EST (UTC-5)</option>
                  <option value="CST">CST (UTC-6)</option>
                  <option value="MST">MST (UTC-7)</option>
                  <option value="PST">PST (UTC-8)</option>
                  <option value="GMT">GMT (UTC+0)</option>
                  <option value="IST">IST (UTC+5:30)</option>
                  <option value="SGT">SGT (UTC+8)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-blue mb-1">
                  Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleChange("currency", e.target.value)}
                  className="w-full border border-cool-gray/30 rounded-lg p-3 text-slate-blue"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="SGD">SGD (S$)</option>
                  <option value="AUD">AUD (A$)</option>
                </select>
              </div>
            </div>
          </div>

          {/* File Upload Settings */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-bold text-slate-blue mb-4">
              File Upload
            </h3>
            <div>
              <label className="block text-sm font-medium text-slate-blue mb-1">
                Max File Upload (MB)
              </label>
              <input
                type="number"
                value={settings.max_file_upload_mb}
                onChange={(e) =>
                  handleChange(
                    "max_file_upload_mb",
                    parseInt(e.target.value) || 0,
                  )
                }
                min="1"
                max="500"
                className="w-full border border-cool-gray/30 rounded-lg p-3 text-slate-blue placeholder:text-slate-blue/40"
              />
              <p className="text-xs text-slate-blue/50 mt-1">
                Maximum file size allowed for uploads in megabytes
              </p>
            </div>
          </div>

          {/* Maintenance Mode */}
          <div>
            <h3 className="text-lg font-bold text-slate-blue mb-4">
              Maintenance
            </h3>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="maintenance"
                checked={settings.maintenance_mode}
                onChange={(e) =>
                  handleChange("maintenance_mode", e.target.checked)
                }
                className="w-5 h-5 rounded border-cool-gray/30"
              />
              <label
                htmlFor="maintenance"
                className="text-sm font-medium text-slate-blue"
              >
                Enable Maintenance Mode
              </label>
              <p className="text-xs text-slate-blue/50 ml-auto">
                App will show maintenance message to users
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={() => window.location.reload()}
            className="rounded-2xl border border-cool-gray/40 px-6 py-3 text-sm font-bold text-slate-blue transition-colors hover:bg-light-gray"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-2xl bg-brand-walnut px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-black disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
