import React, { useEffect, useMemo, useState } from "react";
import { Mail, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Lead } from "@/src/types";
import {
  listLeads,
  deleteLead,
  updateLeadStatus,
} from "@/src/services/leads.service";
import LeadModal from "@/src/components/admin/modals/LeadModal";
import ConfirmDialog from "@/src/components/ui/ConfirmDialog";
import { useToast } from "@/src/components/ui/Toast";

type ModalState = { mode: "view"; lead: Lead } | null;

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modalState, setModalState] = useState<ModalState>(null);
  const [deleteState, setDeleteState] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const loadData = async () => {
    try {
      setIsLoading(true);
      const rows = await listLeads();
      setLeads(rows);
    } catch (error) {
      toast({
        title: "Unable to load leads",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesQ =
        !q ||
        [
          lead.name ?? "",
          lead.email ?? "",
          lead.company ?? "",
          lead.message ?? "",
        ].some((v) => v.toLowerCase().includes(q));
      const matchesStatus = !statusFilter || lead.status === statusFilter;
      return matchesQ && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const handleDelete = async () => {
    if (!deleteState) return;
    try {
      setIsDeleting(true);
      await deleteLead(deleteState.id);
      setDeleteState(null);
      await loadData();
      toast({ title: "Lead deleted", type: "success" });
    } catch (error) {
      toast({
        title: "Delete failed",
        description:
          error instanceof Error ? error.message : "Unable to delete lead.",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (id: string, status: Lead["status"]) => {
    try {
      await updateLeadStatus(id, status);
      await loadData();
      toast({ title: "Status updated", type: "success" });
    } catch (error) {
      toast({
        title: "Update failed",
        description:
          error instanceof Error
            ? error.message
            : "Unable to update lead status.",
        type: "error",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[.3em] text-brand-walnut">
            Leads / Enquiries
          </p>
          <h1 className="text-3xl font-display font-bold text-slate-blue">
            Manage incoming enquiries and sales leads
          </h1>
          <p className="mt-2 text-sm text-slate-blue/50">
            Review, qualify, or assign leads collected from the site.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 rounded-2xl bg-light-gray px-5 py-3 text-sm font-bold text-slate-blue"
          >
            {" "}
            <Plus size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid gap-4 rounded-3xl border border-cool-gray/30 bg-pure-white p-4 shadow-sm lg:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-cool-gray/30 bg-light-gray px-4 py-3 focus-within:border-brand-walnut transition-colors">
          <Search size={18} className="text-slate-blue/35" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, company"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-2xl border border-cool-gray/30 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
        >
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="qualified">Qualified</option>
          <option value="in_progress">In Progress</option>
          <option value="proposal">Proposal</option>
          <option value="closed">Closed</option>
        </select>

        <div />
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-2xl border bg-pure-white p-4"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-4xl border border-dashed border-cool-gray/30 bg-pure-white px-6 py-16 text-center">
          <Mail size={42} className="mx-auto text-brand-walnut/40" />
          <h2 className="mt-4 text-xl font-bold text-slate-blue">
            No leads found
          </h2>
          <p className="mt-2 text-sm text-slate-blue/50">
            {search || statusFilter
              ? "Try adjusting the filters."
              : "Leads will appear here when new enquiries are submitted."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-4xl border border-cool-gray/20 bg-pure-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-light-gray/50 text-[10px] font-bold uppercase tracking-widest text-slate-blue/35">
                <tr>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Source</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cool-gray/10">
                {filtered.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-light-cream/30 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-blue">
                        {lead.name ?? lead.email}
                      </div>
                      <div className="mt-1 text-sm text-slate-blue/50">
                        {lead.email ?? "—"} • {lead.phone ?? "—"}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-blue/60">
                      {lead.company ?? "—"}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-blue/60 line-clamp-2">
                      {lead.message ?? "—"}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-blue/60">
                      {lead.source ?? "—"}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${lead.status === "new" ? "bg-blue-50 text-blue-600" : lead.status === "qualified" ? "bg-green-50 text-green-600" : "bg-slate-50 text-slate-600"}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setModalState({ mode: "view", lead })}
                          className="rounded-xl border border-cool-gray/30 p-2 text-slate-blue/45 transition-colors hover:border-brand-walnut hover:text-brand-walnut"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteState(lead)}
                          className="rounded-xl border border-red-200 p-2 text-red-600 transition-colors hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <LeadModal
        isOpen={Boolean(modalState)}
        lead={modalState?.lead ?? null}
        onCancel={() => setModalState(null)}
        onSave={async (id, status) => {
          await handleStatusChange(id, status);
          setModalState(null);
        }}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteState)}
        title="Delete Lead"
        message="Are you sure you want to delete this lead?"
        isLoading={isDeleting}
        onCancel={() => setDeleteState(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
