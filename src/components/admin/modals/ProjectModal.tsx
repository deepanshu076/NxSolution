import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, X } from "lucide-react";
import type { Domain, Project, Subdomain } from "@/src/types";
import { createProject, updateProject } from "@/src/services/projects.service";

type ProjectForm = {
  domain_id: string;
  subdomain_id: string;
  title: string;
  slug: string;
  year: string;
  overview: string;
  image_url: string;
  thumbnail_url: string;
  video_url: string;
  tagsInput: string;
  order_index: string;
  is_active: boolean;
};

type ProjectModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  domains: Domain[];
  subdomains: Subdomain[];
  project?: Project | null;
  onCancel: () => void;
  onSaved: () => void;
  onError: (message: string) => void;
};

const emptyForm: ProjectForm = {
  domain_id: "",
  subdomain_id: "",
  title: "",
  slug: "",
  year: "",
  overview: "",
  image_url: "",
  thumbnail_url: "",
  video_url: "",
  tagsInput: "",
  order_index: "0",
  is_active: true,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseTags(value: string) {
  return value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function ProjectModal({
  isOpen,
  mode,
  domains,
  subdomains,
  project,
  onCancel,
  onSaved,
  onError,
}: ProjectModalProps) {
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [tags, setTags] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState("");

  const visibleSubdomains = useMemo(() => {
    if (!form.domain_id) return subdomains;
    return subdomains.filter((s) => s.domain_id === form.domain_id);
  }, [form.domain_id, subdomains]);

  useEffect(() => {
    if (!isOpen) return;

    if (project) {
      setForm({
        domain_id: project.domain_id ?? "",
        subdomain_id: project.subdomain_id ?? "",
        title: project.title,
        slug: project.slug,
        year: project.year ?? "",
        overview: project.overview ?? "",
        image_url: project.thumbnail_url ?? "",
        thumbnail_url: project.thumbnail_url ?? "",
        video_url: project.video_url ?? "",
        tagsInput: (project.tags ?? []).join(", "),
        order_index: String(project.order_index ?? 0),
        is_active: project.is_active,
      });
      setTags(project.tags ?? []);
    } else {
      setForm(emptyForm);
      setTags([]);
    }

    setValidationError("");
  }, [isOpen, project]);

  useEffect(() => {
    if (!form.domain_id) return;
    if (visibleSubdomains.some((s) => s.id === form.subdomain_id)) return;
    setForm((current) => ({ ...current, subdomain_id: "" }));
  }, [form.domain_id, form.subdomain_id, visibleSubdomains]);

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const newTags = parseTags(form.tagsInput).filter((t) => !tags.includes(t));
    if (newTags.length === 0) return;
    setTags((current) => [...current, ...newTags]);
    setForm((current) => ({ ...current, tagsInput: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!form.title.trim()) {
      setValidationError("Title is required.");
      return;
    }

    try {
      setIsSaving(true);

      const payload = {
        domain_id: form.domain_id || null,
        subdomain_id: form.subdomain_id || null,
        title: form.title.trim(),
        slug: slugify(form.slug || form.title),
        year: form.year.trim() || null,
        overview: form.overview.trim() || null,
        thumbnail_url: (form.thumbnail_url.trim() || form.image_url.trim()) || null,
        video_url: form.video_url.trim() || null,
        tags: tags.length > 0 ? tags : null,
        order_index: Number(form.order_index) || 0,
        is_active: form.is_active,
      } satisfies Partial<Project>;

      if (mode === "create" || !project) {
        await createProject(payload);
      } else {
        await updateProject(project.id, payload);
      }

      onSaved();
    } catch (err) {
      onError(err instanceof Error ? err.message : "Unable to save project.");
    } finally {
      setIsSaving(false);
    }
  };

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
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-cool-gray/20 bg-pure-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-cool-gray/20 px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-slate-blue">
                  {mode === "create" ? "Add Project" : "Edit Project"}
                </h3>
                <p className="text-sm text-slate-blue/50">
                  Manage project metadata, media, and tags.
                </p>
              </div>
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl p-2 text-slate-blue/35 transition-colors hover:bg-light-gray hover:text-slate-blue"
                aria-label="Close project modal"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto px-6 py-6"
            >
              <div className="space-y-6 pr-1">
                {validationError ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {validationError}
                  </div>
                ) : null}

                <section className="space-y-4 rounded-3xl border border-cool-gray/20 bg-light-gray/30 p-5">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-blue/45">
                    Basic Info
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block space-y-2 text-sm font-semibold text-slate-blue">
                      {" "}
                      <span>
                        Title <span className="text-brand-walnut">*</span>
                      </span>
                      <input
                        value={form.title}
                        onChange={(e) => {
                          const next = e.target.value;
                          setForm((c) => ({
                            ...c,
                            title: next,
                            slug: c.slug ? c.slug : slugify(next),
                          }));
                        }}
                        className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                      />
                    </label>
                    <label className="block space-y-2 text-sm font-semibold text-slate-blue">
                      {" "}
                      <span>Slug</span>
                      <input
                        value={form.slug}
                        onChange={(e) =>
                          setForm((c) => ({
                            ...c,
                            slug: slugify(e.target.value),
                          }))
                        }
                        className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block space-y-2 text-sm font-semibold text-slate-blue">
                      {" "}
                      <span>
                        Domain <span className="text-brand-walnut">*</span>
                      </span>
                      <select
                        value={form.domain_id}
                        onChange={(e) =>
                          setForm((c) => ({
                            ...c,
                            domain_id: e.target.value,
                            subdomain_id: "",
                          }))
                        }
                        className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                      >
                        <option value="">Select a domain</option>
                        {domains.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block space-y-2 text-sm font-semibold text-slate-blue">
                      {" "}
                      <span>Subdomain</span>
                      <select
                        value={form.subdomain_id}
                        onChange={(e) =>
                          setForm((c) => ({
                            ...c,
                            subdomain_id: e.target.value,
                          }))
                        }
                        className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                      >
                        <option value="">No subdomain</option>
                        {visibleSubdomains.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="block space-y-2 text-sm font-semibold text-slate-blue">
                    {" "}
                    <span>Overview</span>
                    <textarea
                      value={form.overview}
                      onChange={(e) =>
                        setForm((c) => ({ ...c, overview: e.target.value }))
                      }
                      rows={4}
                      className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                    />
                  </label>
                </section>

                <section className="space-y-4 rounded-3xl border border-cool-gray/20 bg-light-gray/30 p-5">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-blue/45">
                    Media
                  </h4>
                  <label className="block space-y-2 text-sm font-semibold text-slate-blue">
                    {" "}
                    <span>Video URL</span>
                    <input
                      value={form.video_url}
                      onChange={(e) =>
                        setForm((c) => ({ ...c, video_url: e.target.value }))
                      }
                      className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                    />
                  </label>
                  {form.video_url ? (
                    <div className="overflow-hidden rounded-2xl border border-cool-gray/20 bg-brand-black">
                      <iframe
                        className="aspect-video w-full"
                        src={form.video_url}
                        title="Video preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : null}
                  <label className="block space-y-2 text-sm font-semibold text-slate-blue">
                    {" "}
                    <span>Image URL</span>
                    <input
                      value={form.image_url}
                      onChange={(e) =>
                        setForm((c) => ({
                          ...c,
                          image_url: e.target.value,
                          thumbnail_url: c.thumbnail_url || e.target.value,
                        }))
                      }
                      placeholder="Primary project image link"
                      className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                    />
                  </label>
                  <label className="block space-y-2 text-sm font-semibold text-slate-blue">
                    {" "}
                    <span>Thumbnail URL</span>
                    <input
                      value={form.thumbnail_url}
                      onChange={(e) =>
                        setForm((c) => ({
                          ...c,
                          thumbnail_url: e.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                    />
                  </label>
                </section>

                <section className="space-y-4 rounded-3xl border border-cool-gray/20 bg-light-gray/30 p-5">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-blue/45">
                    Tags & Settings
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block space-y-2 text-sm font-semibold text-slate-blue">
                      {" "}
                      <span>Tags</span>
                      <div className="rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() =>
                                setTags((c) => c.filter((t) => t !== tag))
                              }
                              className="inline-flex items-center gap-1 rounded-full bg-brand-walnut/10 px-3 py-1 text-xs font-bold text-brand-walnut"
                            >
                              {tag}
                              <X size={12} />
                            </button>
                          ))}
                          <input
                            value={form.tagsInput}
                            onChange={(e) =>
                              setForm((c) => ({
                                ...c,
                                tagsInput: e.target.value,
                              }))
                            }
                            onKeyDown={handleTagKeyDown}
                            placeholder="Type and press Enter"
                            className="min-w-40 flex-1 bg-transparent text-sm outline-none"
                          />
                        </div>
                      </div>
                    </label>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block space-y-2 text-sm font-semibold text-slate-blue">
                        {" "}
                        <span>Year</span>
                        <input
                          value={form.year}
                          onChange={(e) =>
                            setForm((c) => ({ ...c, year: e.target.value }))
                          }
                          className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                        />
                      </label>
                      <label className="flex items-center gap-3 self-end rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm font-semibold text-slate-blue">
                        <input
                          type="checkbox"
                          checked={form.is_active}
                          onChange={(e) =>
                            setForm((c) => ({
                              ...c,
                              is_active: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 rounded border-cool-gray text-brand-walnut focus:ring-brand-walnut"
                        />{" "}
                        Active
                      </label>
                    </div>
                  </div>
                </section>

                <div className="flex flex-col-reverse gap-3 border-t border-cool-gray/20 pt-5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-2xl border border-cool-gray/40 px-5 py-3 text-sm font-bold text-slate-blue transition-colors hover:bg-light-gray"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-2xl bg-brand-walnut px-5 py-3 text-sm font-bold text-pure-white transition-colors hover:bg-brand-black disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSaving
                      ? "Saving..."
                      : mode === "create"
                        ? "Create Project"
                        : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
