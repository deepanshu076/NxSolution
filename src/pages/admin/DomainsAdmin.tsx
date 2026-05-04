import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Globe,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { Domain, Subdomain } from "@/src/types";
import { listDomains, deleteDomain } from "@/src/services/domains.service";
import {
  listSubdomains,
  deleteSubdomain,
} from "@/src/services/subdomains.service";
import {
  createSolution,
  deleteSolution,
  listSolutions,
} from "@/src/services/solutions.service";
import DomainModal from "@/src/components/admin/modals/DomainModal";
import SubdomainModal from "@/src/components/admin/modals/SubdomainModal";
import SubdomainVideoModal from "@/src/components/admin/modals/SubdomainVideoModal";
import ConfirmDialog from "@/src/components/ui/ConfirmDialog";
import { useToast } from "@/src/components/ui/Toast";
import type { Solution } from "@/src/types";
import { solutionsData } from "@/src/constants/solutions";

type ModalState =
  | { kind: "domain"; mode: "create"; domain?: null }
  | { kind: "domain"; mode: "edit"; domain: Domain }
  | { kind: "subdomain"; mode: "create"; domainId: string; subdomain?: null }
  | { kind: "subdomain"; mode: "edit"; domainId: string; subdomain: Subdomain }
  | null;

type DeleteState =
  | { kind: "domain"; item: Domain }
  | { kind: "subdomain"; item: Subdomain }
  | { kind: "video"; item: Solution }
  | null;

export default function DomainsAdmin() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [subdomains, setSubdomains] = useState<Subdomain[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [modalState, setModalState] = useState<ModalState>(null);
  const [deleteState, setDeleteState] = useState<DeleteState>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [videoModalSubdomain, setVideoModalSubdomain] = useState<Subdomain | null>(
    null,
  );
  const { toast } = useToast();

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [domainRows, subdomainRows, solutionRows] = await Promise.all([
        listDomains(false),
        listSubdomains(undefined, false),
        listSolutions(false),
      ]);
      setDomains(domainRows);
      setSubdomains(subdomainRows);
      setSolutions(solutionRows);
    } catch (error) {
      toast({
        title: "Unable to load domains",
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

  const filteredDomains = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return domains;
    return domains.filter((domain) =>
      [domain.name, domain.slug, domain.description ?? ""].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [domains, search]);

  const subdomainsByDomain = useMemo(() => {
    return subdomains.reduce<Record<string, Subdomain[]>>(
      (accumulator, subdomain) => {
        if (!subdomain.domain_id) return accumulator;
        accumulator[subdomain.domain_id] ??= [];
        accumulator[subdomain.domain_id].push(subdomain);
        return accumulator;
      },
      {},
    );
  }, [subdomains]);

  const handleSaved = async () => {
    setModalState(null);
    await loadData();
    toast({ title: "Saved successfully", type: "success" });
  };

  const handleDelete = async () => {
    if (!deleteState) return;

    try {
      setIsDeleting(true);
      if (deleteState.kind === "domain") {
        await deleteDomain(deleteState.item.id);
        toast({ title: "Domain deleted", type: "success" });
      } else if (deleteState.kind === "subdomain") {
        await deleteSubdomain(deleteState.item.id);
        toast({ title: "Subdomain deleted", type: "success" });
      } else {
        await deleteSolution(deleteState.item.id);
        toast({ title: "Video deleted", type: "success" });
      }
      setDeleteState(null);
      await loadData();
    } catch (error) {
      toast({
        title: "Delete failed",
        description:
          error instanceof Error ? error.message : "Unable to delete item.",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const getDomainById = (id: string | null) =>
    domains.find((domain) => domain.id === id) ?? null;

  const solutionsBySubdomain = useMemo(() => {
    return solutions.reduce<Record<string, Solution[]>>((accumulator, solution) => {
      if (!solution.subdomain_id) return accumulator;
      accumulator[solution.subdomain_id] ??= [];
      accumulator[solution.subdomain_id].push(solution);
      return accumulator;
    }, {});
  }, [solutions]);

  const constantSolutionsBySubdomainSlug = useMemo(() => {
    return solutionsData.reduce<Record<string, typeof solutionsData>>(
      (accumulator, solution) => {
        const key = (solution.subdomainSlug || "").toLowerCase();
        if (!key) return accumulator;
        accumulator[key] ??= [];
        accumulator[key].push(solution);
        return accumulator;
      },
      {},
    );
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.3em] text-brand-walnut mb-2">
            Domain Control
          </p>
          <h1 className="text-3xl font-display font-bold text-slate-blue">
            Manage domains and their implementation zones
          </h1>
          <p className="mt-2 text-sm text-slate-blue/50">
            Create, edit, activate, or remove domain structures from one place.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() =>
              setModalState({ kind: "domain", mode: "create", domain: null })
            }
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-walnut px-5 py-3 text-sm font-bold text-pure-white transition-colors hover:bg-brand-black whitespace-nowrap"
          >
            <Plus size={16} /> Add Domain
          </button>
          <button
            type="button"
            onClick={() =>
              setModalState({
                kind: "subdomain",
                mode: "create",
                domainId: domains[0]?.id ?? "",
                subdomain: null,
              })
            }
            disabled={domains.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-walnut px-5 py-3 text-sm font-bold text-brand-walnut transition-colors hover:bg-brand-walnut/10 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap"
            title={
              domains.length === 0
                ? "Create a domain first to add subdomains."
                : "Add a subdomain"
            }
          >
            <Plus size={16} /> Add Subdomain
          </button>
          <div className="inline-flex rounded-2xl border border-cool-gray/30 p-1">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                viewMode === "list"
                  ? "bg-brand-walnut text-pure-white"
                  : "text-slate-blue/70 hover:bg-light-gray"
              }`}
            >
              List View
            </button>
            <button
              type="button"
              onClick={() => setViewMode("card")}
              className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                viewMode === "card"
                  ? "bg-brand-walnut text-pure-white"
                  : "text-slate-blue/70 hover:bg-light-gray"
              }`}
            >
              Card View
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-cool-gray/30 bg-pure-white p-4 shadow-sm">
        <div className="flex items-center gap-3 rounded-2xl border border-cool-gray/30 bg-light-gray px-4 py-3 focus-within:border-brand-walnut transition-colors">
          <Search size={18} className="text-slate-blue/35" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search domains by name or slug"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-3xl border border-cool-gray/20 bg-pure-white p-5"
            >
              <div className="h-6 w-1/2 rounded-full bg-light-gray" />
              <div className="mt-4 h-4 w-3/4 rounded-full bg-light-gray" />
              <div className="mt-10 h-20 rounded-2xl bg-light-gray" />
            </div>
          ))}
        </div>
      ) : filteredDomains.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-cool-gray/30 bg-pure-white px-6 py-16 text-center">
          <Globe size={42} className="mx-auto text-brand-walnut/40" />
          <h2 className="mt-4 text-xl font-bold text-slate-blue">
            No domains found
          </h2>
          <p className="mt-2 text-sm text-slate-blue/50">
            {search
              ? "Try a different search term."
              : "Create the first domain to get started."}
          </p>
          <button
            type="button"
            onClick={() =>
              setModalState({ kind: "domain", mode: "create", domain: null })
            }
            className="mt-6 rounded-2xl bg-brand-walnut px-5 py-3 text-sm font-bold text-pure-white transition-colors hover:bg-brand-black"
          >
            Add your first domain
          </button>
        </div>
      ) : viewMode === "card" ? (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {filteredDomains.map((domain) => {
              const domainSubdomains = subdomainsByDomain[domain.id] ?? [];
              const isExpanded = expandedIds.includes(domain.id);

              return (
                <motion.article
                  key={domain.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="overflow-hidden rounded-[2rem] border border-cool-gray/30 bg-pure-white shadow-sm"
                >
                  <div className="border-b border-cool-gray/20 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-walnut/10 text-xl font-bold text-brand-walnut">
                          {domain.icon || domain.name.slice(0, 1)}
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-slate-blue">
                            {domain.name}
                          </h2>
                          <p className="mt-1 text-sm text-slate-blue/50 line-clamp-2">
                            {domain.description ?? "No description provided."}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-blue/45">
                            <span className="rounded-full bg-light-cream px-3 py-1">
                              {domainSubdomains.length} subdomains
                            </span>
                            <span
                              className={`rounded-full px-3 py-1 ${domain.is_active ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}
                            >
                              {domain.is_active ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedIds((current) =>
                            current.includes(domain.id)
                              ? current.filter((id) => id !== domain.id)
                              : [...current, domain.id],
                          )
                        }
                        className="rounded-xl border border-cool-gray/30 p-2 text-slate-blue/45 transition-colors hover:border-brand-walnut hover:text-brand-walnut"
                      >
                        {isExpanded ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setModalState({
                            kind: "domain",
                            mode: "edit",
                            domain,
                          })
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-cool-gray/30 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-blue transition-colors hover:border-brand-walnut hover:text-brand-walnut"
                      >
                        <Pencil size={14} /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteState({ kind: "domain", item: domain })
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-600 transition-colors hover:bg-red-50"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3 p-5">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-blue/45">
                              Subdomains
                            </h3>
                            <button
                              type="button"
                              onClick={() =>
                                setModalState({
                                  kind: "subdomain",
                                  mode: "create",
                                  domainId: domain.id,
                                  subdomain: null,
                                })
                              }
                              className="inline-flex items-center gap-2 rounded-xl bg-brand-walnut px-4 py-2 text-xs font-bold uppercase tracking-widest text-pure-white transition-colors hover:bg-brand-black"
                            >
                              <Plus size={14} /> Add Subdomain
                            </button>
                          </div>

                          {domainSubdomains.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-cool-gray/30 px-4 py-6 text-center text-sm text-slate-blue/45">
                              No subdomains yet.
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {domainSubdomains.map((subdomain) => (
                                <div
                                  key={subdomain.id}
                                  className="rounded-2xl border border-cool-gray/20 bg-light-gray/40 p-4"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-slate-blue">
                                          {subdomain.name}
                                        </span>
                                        <span
                                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${subdomain.is_active ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}
                                        >
                                          {subdomain.is_active
                                            ? "Active"
                                            : "Inactive"}
                                        </span>
                                      </div>
                                      <p className="mt-1 text-xs text-slate-blue/50 line-clamp-2">
                                        {subdomain.description ??
                                          "No description provided."}
                                      </p>
                                      <div className="mt-3 rounded-xl border border-cool-gray/20 bg-pure-white p-3">
                                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-blue/45">
                                            Subdomain Media
                                          </p>
                                          <button
                                            type="button"
                                            onClick={() => setVideoModalSubdomain(subdomain)}
                                            className="rounded-lg bg-brand-walnut px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-pure-white transition-colors hover:bg-brand-black"
                                          >
                                            Add Video
                                          </button>
                                        </div>
                                        <p className="mb-3 text-[11px] text-slate-blue/45">
                                          Manage targeted solution videos for this subdomain.
                                        </p>
                                        {(solutionsBySubdomain[subdomain.id] ?? []).length === 0 &&
                                        (constantSolutionsBySubdomainSlug[
                                          (subdomain.slug || "").toLowerCase()
                                        ] ?? []).length === 0 ? (
                                          <p className="text-xs text-slate-blue/45">
                                            No videos configured yet.
                                          </p>
                                        ) : (
                                          <div className="space-y-2 max-h-[200px] overflow-y-auto">
                                            {(solutionsBySubdomain[subdomain.id] ?? []).map(
                                              (solution) => (
                                                <div
                                                  key={solution.id}
                                                  className="flex items-start justify-between gap-2 rounded-lg border border-cool-gray/20 px-3 py-2"
                                                >
                                                  <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2">
                                                      <p className="text-xs font-semibold text-slate-blue truncate">
                                                        {solution.title}
                                                      </p>
                                                      <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                                                        DB
                                                      </span>
                                                      {!solution.video_url ? (
                                                        <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-700">
                                                          Missing
                                                        </span>
                                                      ) : null}
                                                    </div>
                                                    <p className="text-[11px] text-slate-blue/45 truncate">
                                                      {solution.video_url || "No video URL"}
                                                    </p>
                                                  </div>
                                                  <button
                                                    type="button"
                                                    onClick={() =>
                                                      setDeleteState({
                                                        kind: "video",
                                                        item: solution,
                                                      })
                                                    }
                                                    className="shrink-0 rounded-lg border border-red-200 p-2 text-red-600 transition-colors hover:bg-red-50"
                                                    title="Delete video"
                                                  >
                                                    <Trash2 size={14} />
                                                  </button>
                                                </div>
                                              ),
                                            )}
                                            {(constantSolutionsBySubdomainSlug[
                                              (subdomain.slug || "").toLowerCase()
                                            ] ?? []).map((solution, index) => (
                                              <div
                                                key={`constant-${solution.id}-${index}`}
                                                className="flex items-start justify-between gap-2 rounded-lg border border-cool-gray/20 px-3 py-2"
                                              >
                                                <div className="min-w-0 flex-1">
                                                  <div className="flex items-center gap-2">
                                                    <p className="text-xs font-semibold text-slate-blue truncate">
                                                      {solution.name}
                                                    </p>
                                                    <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-blue/55">
                                                      Fallback
                                                    </span>
                                                    {!solution.videoUrl ? (
                                                      <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-700">
                                                        Missing
                                                      </span>
                                                    ) : null}
                                                  </div>
                                                  <p className="text-[11px] text-slate-blue/45 truncate">
                                                    {solution.videoUrl || "No video URL"}
                                                  </p>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setModalState({
                                            kind: "subdomain",
                                            mode: "edit",
                                            domainId: domain.id,
                                            subdomain,
                                          })
                                        }
                                        className="rounded-lg border border-cool-gray/30 p-2 text-slate-blue/45 transition-colors hover:border-brand-walnut hover:text-brand-walnut"
                                      >
                                        <Pencil size={14} />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setDeleteState({
                                            kind: "subdomain",
                                            item: subdomain,
                                          })
                                        }
                                        className="rounded-lg border border-red-200 p-2 text-red-600 transition-colors hover:bg-red-50"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-cool-gray/20 bg-pure-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-light-gray/50 text-[10px] font-bold uppercase tracking-widest text-slate-blue/40">
                <tr>
                  <th className="px-5 py-4">Domain</th>
                  <th className="px-5 py-4">Subdomains</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cool-gray/10">
                {filteredDomains.map((domain) => {
                  const domainSubdomains = subdomainsByDomain[domain.id] ?? [];
                  const isExpanded = expandedIds.includes(domain.id);
                  return (
                    <React.Fragment key={`list-${domain.id}`}>
                      <tr className="hover:bg-light-cream/20 transition-colors">
                        <td className="px-5 py-4">
                          <p className="font-bold text-slate-blue">{domain.name}</p>
                          <p className="text-xs text-slate-blue/45">{domain.slug}</p>
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-blue/60">
                          {domainSubdomains.length}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${domain.is_active ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}
                          >
                            {domain.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedIds((current) =>
                                  current.includes(domain.id)
                                    ? current.filter((id) => id !== domain.id)
                                    : [...current, domain.id],
                                )
                              }
                              className="rounded-xl border border-cool-gray/30 p-2 text-slate-blue/45 transition-colors hover:border-brand-walnut hover:text-brand-walnut"
                            >
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            <button
                              type="button"
                              onClick={() => setModalState({ kind: "domain", mode: "edit", domain })}
                              className="rounded-xl border border-cool-gray/30 p-2 text-slate-blue/45 transition-colors hover:border-brand-walnut hover:text-brand-walnut"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteState({ kind: "domain", item: domain })}
                              className="rounded-xl border border-red-200 p-2 text-red-600 transition-colors hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {isExpanded ? (
                        <tr>
                          <td colSpan={4} className="px-5 pb-5">
                            <div className="rounded-2xl border border-cool-gray/20 bg-light-gray/35 p-4 space-y-3">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-blue/45">
                                  Subdomain Media
                                </h3>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setModalState({
                                      kind: "subdomain",
                                      mode: "create",
                                      domainId: domain.id,
                                      subdomain: null,
                                    })
                                  }
                                  className="inline-flex items-center gap-2 rounded-xl bg-brand-walnut px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-pure-white transition-colors hover:bg-brand-black"
                                >
                                  <Plus size={13} /> Add Subdomain
                                </button>
                              </div>
                              {domainSubdomains.map((subdomain) => {
                                const dbRows = solutionsBySubdomain[subdomain.id] ?? [];
                                const fallbackRows =
                                  constantSolutionsBySubdomainSlug[(subdomain.slug || "").toLowerCase()] ?? [];
                                return (
                                  <div key={`list-sub-${subdomain.id}`} className="rounded-xl border border-cool-gray/20 bg-pure-white p-3">
                                    <div className="mb-2 flex items-center justify-between gap-2">
                                      <div className="min-w-0">
                                        <p className="truncate text-sm font-bold text-slate-blue">{subdomain.name}</p>
                                        <p className="truncate text-[11px] text-slate-blue/45">{subdomain.slug}</p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <button
                                          type="button"
                                          onClick={() => setVideoModalSubdomain(subdomain)}
                                          className="rounded-lg bg-brand-walnut px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-pure-white transition-colors hover:bg-brand-black"
                                        >
                                          Add Video
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setModalState({
                                              kind: "subdomain",
                                              mode: "edit",
                                              domainId: domain.id,
                                              subdomain,
                                            })
                                          }
                                          className="rounded-lg border border-cool-gray/30 p-2 text-slate-blue/45 transition-colors hover:border-brand-walnut hover:text-brand-walnut"
                                          title="Edit subdomain"
                                        >
                                          <Pencil size={14} />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setDeleteState({
                                              kind: "subdomain",
                                              item: subdomain,
                                            })
                                          }
                                          className="rounded-lg border border-red-200 p-2 text-red-600 transition-colors hover:bg-red-50"
                                          title="Delete subdomain"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      {dbRows.map((solution) => (
                                        <div key={`list-db-${solution.id}`} className="flex items-start justify-between gap-2 rounded-lg border border-cool-gray/20 px-3 py-2">
                                          <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                              <p className="truncate text-xs font-semibold text-slate-blue">{solution.title}</p>
                                              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-700">DB</span>
                                            </div>
                                            <p className="truncate text-[11px] text-slate-blue/45">{solution.video_url || "No video URL"}</p>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setDeleteState({
                                                kind: "video",
                                                item: solution,
                                              })
                                            }
                                            className="shrink-0 rounded-lg border border-red-200 p-2 text-red-600 transition-colors hover:bg-red-50"
                                            title="Delete video"
                                          >
                                            <Trash2 size={14} />
                                          </button>
                                        </div>
                                      ))}
                                      {fallbackRows.map((solution, index) => (
                                        <div key={`list-fallback-${solution.id}-${index}`} className="flex items-start justify-between gap-2 rounded-lg border border-cool-gray/20 px-3 py-2">
                                          <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                              <p className="truncate text-xs font-semibold text-slate-blue">{solution.name}</p>
                                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-blue/55">Fallback</span>
                                            </div>
                                            <p className="truncate text-[11px] text-slate-blue/45">{solution.videoUrl || "No video URL"}</p>
                                          </div>
                                        </div>
                                      ))}
                                      {dbRows.length === 0 && fallbackRows.length === 0 ? (
                                        <p className="text-xs text-slate-blue/45">No videos configured yet.</p>
                                      ) : null}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <DomainModal
        isOpen={modalState?.kind === "domain"}
        mode={modalState?.kind === "domain" ? modalState.mode : "create"}
        domain={
          modalState?.kind === "domain" && modalState.mode === "edit"
            ? modalState.domain
            : null
        }
        onCancel={() => setModalState(null)}
        onSaved={handleSaved}
        onError={(message) =>
          toast({
            title: "Domain save failed",
            description: message,
            type: "error",
          })
        }
      />

      <SubdomainModal
        isOpen={modalState?.kind === "subdomain"}
        mode={modalState?.kind === "subdomain" ? modalState.mode : "create"}
        domains={domains}
        subdomain={
          modalState?.kind === "subdomain" && modalState.mode === "edit"
            ? modalState.subdomain
            : null
        }
        defaultDomainId={
          modalState?.kind === "subdomain" ? modalState.domainId : undefined
        }
        lockDomain={
          modalState?.kind === "subdomain"
            ? modalState.mode === "create"
            : false
        }
        onCancel={() => setModalState(null)}
        onSaved={handleSaved}
        onError={(message) =>
          toast({
            title: "Subdomain save failed",
            description: message,
            type: "error",
          })
        }
      />

      <ConfirmDialog
        isOpen={Boolean(deleteState)}
        title={
          deleteState?.kind === "domain"
            ? "Delete Domain"
            : deleteState?.kind === "subdomain"
              ? "Delete Subdomain"
              : "Delete Video"
        }
        message="Are you sure you want to delete this item? This action cannot be undone."
        isLoading={isDeleting}
        onCancel={() => setDeleteState(null)}
        onConfirm={handleDelete}
      />

      <SubdomainVideoModal
        isOpen={Boolean(videoModalSubdomain)}
        domain={getDomainById(videoModalSubdomain?.domain_id ?? null)}
        subdomain={videoModalSubdomain}
        onCancel={() => setVideoModalSubdomain(null)}
        onError={(message) =>
          toast({
            title: "Video save failed",
            description: message,
            type: "error",
          })
        }
        onSave={async (payload) => {
          if (!videoModalSubdomain?.domain_id) {
            throw new Error("Subdomain is not linked to a domain.");
          }

          await createSolution({
            domain_id: videoModalSubdomain.domain_id,
            subdomain_id: videoModalSubdomain.id,
            title: payload.title.trim(),
            slug: `${payload.slug}-${Date.now()}`,
            description: payload.description.trim() || null,
            video_url: payload.video_url.trim() || null,
            thumbnail_url: payload.thumbnail_url.trim() || null,
            tags: ["targeted", "video"],
            order_index: Number(payload.order_index) || 0,
            is_active: payload.is_active,
          });

          await loadData();
          toast({ title: "Video added", type: "success" });
        }}
      />
    </div>
  );
}
