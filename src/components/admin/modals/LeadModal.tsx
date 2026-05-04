import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Lead } from "@/src/types";

type Props = {
  isOpen: boolean;
  lead: Lead | null;
  onCancel: () => void;
  onSave: (id: string, status: Lead["status"]) => Promise<void>;
};

export default function LeadModal({ isOpen, lead, onCancel, onSave }: Props) {
  const [status, setStatus] = useState<Lead["status"] | "">("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setStatus(lead?.status ?? "");
  }, [lead]);

  if (!lead) return null;

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-90 flex items-center justify-center bg-brand-black/70 px-4 py-6 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18 }}
            className="max-w-2xl w-full rounded-3xl bg-pure-white border border-cool-gray/20 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-cool-gray/20">
              <div>
                <h3 className="text-lg font-bold text-slate-blue">Lead</h3>
                <p className="text-sm text-slate-blue/50">
                  View and update lead status
                </p>
              </div>
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl p-2 text-slate-blue/35 transition-colors hover:bg-light-gray hover:text-slate-blue"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-6 space-y-4">
              <div>
                <div className="text-sm font-bold text-slate-blue">
                  {lead.name ?? lead.email}
                </div>
                <div className="text-xs text-slate-blue/60">
                  {lead.email ?? "—"} • {lead.phone ?? "—"}
                </div>
              </div>
              <div className="text-sm text-slate-blue/70">{lead.message}</div>

              <label className="block">
                <div className="text-sm font-semibold text-slate-blue mb-2">
                  Status
                </div>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Lead["status"])}
                  className="w-full rounded-2xl border border-cool-gray/30 px-4 py-3 bg-pure-white"
                >
                  <option value="new">new</option>
                  <option value="qualified">qualified</option>
                  <option value="in_progress">in_progress</option>
                  <option value="proposal">proposal</option>
                  <option value="closed">closed</option>
                </select>
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-cool-gray/20">
                <button
                  type="button"
                  onClick={onCancel}
                  className="rounded-2xl border border-cool-gray/40 px-5 py-3 text-sm font-bold text-slate-blue"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={async () => {
                    setIsSaving(true);
                    await onSave(lead.id, status as Lead["status"]);
                    setIsSaving(false);
                  }}
                  className="rounded-2xl bg-brand-walnut px-5 py-3 text-sm font-bold text-pure-white"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
