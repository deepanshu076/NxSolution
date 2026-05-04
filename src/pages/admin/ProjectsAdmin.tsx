import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Film,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Domain, Project, Subdomain } from "@/src/types";
import { listDomains } from "@/src/services/domains.service";
import { listSubdomains } from "@/src/services/subdomains.service";
import { deleteProject, listProjects } from "@/src/services/projects.service";
import ProjectModal from "@/src/components/admin/modals/ProjectModal";
import ConfirmDialog from "@/src/components/ui/ConfirmDialog";
import { useToast } from "@/src/components/ui/Toast";

type ModalState =
  | { mode: "create"; project?: null }
  | { mode: "edit"; project: Project }
  | null;

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [subdomains, setSubdomains] = useState<Subdomain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [subdomainFilter, setSubdomainFilter] = useState("");
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [modalState, setModalState] = useState<ModalState>(null);
  const [deleteState, setDeleteState] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [projectRows, domainRows, subdomainRows] = await Promise.all([
        listProjects(false),
        listDomains(false),
        listSubdomains(undefined, false),
      ]);

      setProjects(projectRows);
      setDomains(domainRows);
      setSubdomains(subdomainRows);
    } catch (error) {
      toast({
        title: "Unable to load projects",
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

  const visibleSubdomains = useMemo(() => {
    if (!domainFilter) return subdomains;
    return subdomains.filter((s) => s.domain_id === domainFilter);
  }, [domainFilter, subdomains]);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesQuery =
        !query ||
        [project.title, project.slug, project.overview ?? ""].some((v) =>
          v.toLowerCase().includes(query),
        );
      const matchesDomain = !domainFilter || project.domain_id === domainFilter;
      const matchesSubdomain =
        !subdomainFilter || project.subdomain_id === subdomainFilter;
      return matchesQuery && matchesDomain && matchesSubdomain;
    });
  }, [domainFilter, search, projects, subdomainFilter]);

  const handleSaved = async () => {
    setModalState(null);
    await loadData();
    toast({ title: "Project saved", type: "success" });
  };

  const handleDelete = async () => {
    if (!deleteState) return;

    try {
      setIsDeleting(true);
      await deleteProject(deleteState.id);
      setDeleteState(null);
      await loadData();
      toast({ title: "Project deleted", type: "success" });
    } catch (error) {
      toast({
        title: "Delete failed",
        description:
          error instanceof Error ? error.message : "Unable to delete project.",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[.3em] text-brand-walnut">
            Projects Manager
          </p>
          <h1 className="text-3xl font-display font-bold text-slate-blue">
            Manage project case studies and implementations
          </h1>
          <p className="mt-2 text-sm text-slate-blue/50">
            Create, edit, and feature projects shown across the site.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalState({ mode: "create", project: null })}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-walnut px-5 py-3 text-sm font-bold text-pure-white transition-colors hover:bg-brand-black"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="grid gap-4 rounded-3xl border border-cool-gray/30 bg-pure-white p-4 shadow-sm lg:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-cool-gray/30 bg-light-gray px-4 py-3 focus-within:border-brand-walnut transition-colors">
          <Search size={18} className="text-slate-blue/35" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or slug"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <select
          value={domainFilter}
          onChange={(e) => {
            setDomainFilter(e.target.value);
            setSubdomainFilter("");
          }}
          className="rounded-2xl border border-cool-gray/30 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
        >
          <option value="">All domains</option>
          {domains.map((domain) => (
            <option key={domain.id} value={domain.id}>
              {domain.name}
            </option>
          ))}
        </select>

        <select
          value={subdomainFilter}
          onChange={(e) => setSubdomainFilter(e.target.value)}
          className="rounded-2xl border border-cool-gray/30 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
        >
          <option value="">All subdomains</option>
          {visibleSubdomains.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="overflow-hidden rounded-4xl border border-cool-gray/20 bg-pure-white shadow-sm">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 gap-3 border-b border-cool-gray/10 px-6 py-5 md:grid-cols-[1.3fr_0.7fr_0.7fr_0.6fr_0.7fr]"
            >
              <div className="h-5 w-2/3 animate-pulse rounded-full bg-light-gray" />
              <div className="h-5 w-1/2 animate-pulse rounded-full bg-light-gray" />
              <div className="h-5 w-1/2 animate-pulse rounded-full bg-light-gray" />
              <div className="h-5 w-1/2 animate-pulse rounded-full bg-light-gray" />
              <div className="h-5 w-1/2 animate-pulse rounded-full bg-light-gray" />
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-4xl border border-dashed border-cool-gray/30 bg-pure-white px-6 py-16 text-center">
          <Film size={42} className="mx-auto text-brand-walnut/40" />
          <h2 className="mt-4 text-xl font-bold text-slate-blue">
            No projects found
          </h2>
          <p className="mt-2 text-sm text-slate-blue/50">
            {search || domainFilter || subdomainFilter
              ? "Try adjusting the filters."
              : "Add your first project to get started."}
          </p>
          <button
            type="button"
            onClick={() => setModalState({ mode: "create", project: null })}
            className="mt-6 rounded-2xl bg-brand-walnut px-5 py-3 text-sm font-bold text-pure-white transition-colors hover:bg-brand-black"
          >
            Add your first project
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-4xl border border-cool-gray/20 bg-pure-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-light-gray/50 text-[10px] font-bold uppercase tracking-widest text-slate-blue/35">
                <tr>
                  <th className="px-6 py-4">Thumbnail</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Domain</th>
                  <th className="px-6 py-4">Subdomain</th>
                  <th className="px-6 py-4">Year</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Tags</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cool-gray/10">
                {filteredProjects.map((project) => {
                  const domainName =
                    domains.find((d) => d.id === project.domain_id)?.name ??
                    "—";
                  const subdomainName =
                    subdomains.find((s) => s.id === project.subdomain_id)
                      ?.name ?? "—";
                  const isExpanded = expandedIds.includes(project.id);

                  return (
                    <React.Fragment key={project.id}>
                      <tr className="hover:bg-light-cream/30 transition-colors">
                        <td className="px-6 py-5">
                          <div className="h-16 w-24 overflow-hidden rounded-2xl bg-light-gray">
                            {project.thumbnail_url ? (
                              <img
                                src={project.thumbnail_url}
                                alt={project.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-slate-blue/25">
                                <Film size={20} />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="font-bold text-slate-blue">
                            {project.title}
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-blue/35">
                            <span>{project.slug}</span>
                            <span className="rounded-full bg-light-gray px-2 py-0.5">
                              {project.tags?.length ?? 0} tags
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-blue/60">
                          {domainName}
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-blue/60">
                          {subdomainName}
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-blue/60">
                          {project.year ?? "—"}
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${project.is_active ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}
                          >
                            {project.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-blue/60">
                          {project.tags?.join(", ") ?? "—"}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedIds((current) =>
                                  current.includes(project.id)
                                    ? current.filter((id) => id !== project.id)
                                    : [...current, project.id],
                                )
                              }
                              className="rounded-xl border border-cool-gray/30 p-2 text-slate-blue/45 transition-colors hover:border-brand-walnut hover:text-brand-walnut"
                            >
                              {isExpanded ? (
                                <ChevronUp size={16} />
                              ) : (
                                <ChevronDown size={16} />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setModalState({ mode: "edit", project })
                              }
                              className="rounded-xl border border-cool-gray/30 p-2 text-slate-blue/45 transition-colors hover:border-brand-walnut hover:text-brand-walnut"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteState(project)}
                              className="rounded-xl border border-red-200 p-2 text-red-600 transition-colors hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={8} className="px-6 pb-0">
                          <AnimatePresence>
                            {isExpanded ? (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="mb-5 rounded-3xl border border-cool-gray/20 bg-light-gray/30 p-5">
                                  <div className="flex items-center justify-between gap-3 mb-4">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-blue/45">
                                      Overview
                                    </h3>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setModalState({ mode: "edit", project })
                                      }
                                      className="inline-flex items-center gap-2 rounded-xl bg-brand-walnut px-4 py-2 text-xs font-bold uppercase tracking-widest text-pure-white transition-colors hover:bg-brand-black"
                                    >
                                      <Pencil size={14} /> Edit Details
                                    </button>
                                  </div>
                                  <div className="text-sm text-slate-blue/60">
                                    {project.overview ??
                                      "No overview provided."}
                                  </div>
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ProjectModal
        isOpen={Boolean(modalState)}
        mode={modalState?.mode ?? "create"}
        domains={domains}
        subdomains={subdomains}
        project={modalState?.mode === "edit" ? modalState.project : null}
        onCancel={() => setModalState(null)}
        onSaved={handleSaved}
        onError={(message) =>
          toast({
            title: "Project save failed",
            description: message,
            type: "error",
          })
        }
      />

      <ConfirmDialog
        isOpen={Boolean(deleteState)}
        title="Delete Project"
        message="Are you sure you want to delete this item? This action cannot be undone."
        isLoading={isDeleting}
        onCancel={() => setDeleteState(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
