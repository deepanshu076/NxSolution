import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, Trash2, X } from "lucide-react";
import type { Domain, Solution, SolutionProblem, Subdomain } from "@/src/types";
import {
  createSolution,
  replaceSolutionProblems,
  updateSolution,
} from "@/src/services/solutions.service";

type ProblemDraft = {
  problem: string;
  solution: string;
};

type SolutionForm = {
  domain_id: string;
  subdomain_id: string;
  title: string;
  slug: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  tagsInput: string;
  order_index: string;
  is_active: boolean;
};

type SolutionModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  domains: Domain[];
  subdomains: Subdomain[];
  solution?: Solution | null;
  problems?: SolutionProblem[];
  onCancel: () => void;
  onSaved: () => void;
  onError: (message: string) => void;
};

const emptyForm: SolutionForm = {
  domain_id: "",
  subdomain_id: "",
  title: "",
  slug: "",
  description: "",
  video_url: "",
  thumbnail_url: "",
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
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export default function SolutionModal({
  isOpen,
  mode,
  domains,
  subdomains,
  solution,
  problems = [],
  onCancel,
  onSaved,
  onError,
}: SolutionModalProps) {
  const [form, setForm] = useState<SolutionForm>(emptyForm);
  const [problemRows, setProblemRows] = useState<ProblemDraft[]>([
    { problem: "", solution: "" },
  ]);
  const [tags, setTags] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState("");

  const visibleSubdomains = useMemo(() => {
    if (!form.domain_id) return subdomains;
    return subdomains.filter(
      (subdomain) => subdomain.domain_id === form.domain_id,
    );
  }, [form.domain_id, subdomains]);

  useEffect(() => {
    if (!isOpen) return;

    if (solution) {
      setForm({
        domain_id: solution.domain_id ?? "",
        subdomain_id: solution.subdomain_id ?? "",
        title: solution.title,
        slug: solution.slug,
        description: solution.description ?? "",
        video_url: solution.video_url ?? "",
        thumbnail_url: solution.thumbnail_url ?? "",
        tagsInput: (solution.tags ?? []).join(", "),
        order_index: String(solution.order_index ?? 0),
        is_active: solution.is_active,
      });
      setTags(solution.tags ?? []);
      setProblemRows(
        problems.length > 0
          ? problems.map((problem) => ({
              problem: problem.problem,
              solution: problem.solution,
            }))
          : [{ problem: "", solution: "" }],
      );
    } else {
      setForm(emptyForm);
      setTags([]);
      setProblemRows([{ problem: "", solution: "" }]);
    }

    setValidationError("");
  }, [isOpen, problems, solution]);

  useEffect(() => {
    if (!form.domain_id) return;
    if (
      visibleSubdomains.some((subdomain) => subdomain.id === form.subdomain_id)
    )
      return;
    setForm((current) => ({ ...current, subdomain_id: "" }));
  }, [form.domain_id, form.subdomain_id, visibleSubdomains]);

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const newTags = parseTags(form.tagsInput).filter(
      (tag) => !tags.includes(tag),
    );
    if (newTags.length === 0) return;
    setTags((current) => [...current, ...newTags]);
    setForm((current) => ({ ...current, tagsInput: "" }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setValidationError("");

    if (!form.title.trim()) {
      setValidationError("Title is required.");
      return;
    }

    if (!form.domain_id) {
      setValidationError("Please select a domain.");
      return;
    }

    try {
      setIsSaving(true);

      const payload = {
        domain_id: form.domain_id,
        subdomain_id: form.subdomain_id || null,
        title: form.title.trim(),
        slug: slugify(form.slug || form.title),
        description: form.description.trim() || null,
        video_url: form.video_url.trim() || null,
        thumbnail_url: form.thumbnail_url.trim() || null,
        tags: tags.length > 0 ? tags : null,
        order_index: Number(form.order_index) || 0,
        is_active: form.is_active,
      } satisfies Partial<Solution>;

      const savedSolution =
        mode === "create" || !solution
          ? await createSolution(payload)
          : await updateSolution(solution.id, payload);

      await replaceSolutionProblems(
        savedSolution.id,
        problemRows
          .filter((row) => row.problem.trim() || row.solution.trim())
          .map((row, index) => ({
            problem: row.problem.trim(),
            solution: row.solution.trim(),
            order_index: index,
          })),
      );

      onSaved();
    } catch (error) {
      onError(
        error instanceof Error ? error.message : "Unable to save solution.",
      );
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
            className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-cool-gray/20 bg-pure-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-cool-gray/20 px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-slate-blue">
                  {mode === "create" ? "Add Solution" : "Edit Solution"}
                </h3>
                <p className="text-sm text-slate-blue/50">
                  Manage solution metadata, media, tags, and problem/solution
                  pairs.
                </p>
              </div>
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl p-2 text-slate-blue/35 transition-colors hover:bg-light-gray hover:text-slate-blue"
                aria-label="Close solution modal"
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
                  <SectionTitle title="Basic Info" />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Title" required>
                      <input
                        value={form.title}
                        onChange={(event) => {
                          const nextTitle = event.target.value;
                          setForm((current) => ({
                            ...current,
                            title: nextTitle,
                            slug: current.slug
                              ? current.slug
                              : slugify(nextTitle),
                          }));
                        }}
                        className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                      />
                    </Field>
                    <Field label="Slug" required>
                      <input
                        value={form.slug}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            slug: slugify(event.target.value),
                          }))
                        }
                        className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Domain" required>
                      <select
                        value={form.domain_id}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            domain_id: event.target.value,
                            subdomain_id: "",
                          }))
                        }
                        className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                      >
                        <option value="">Select a domain</option>
                        {domains.map((domain) => (
                          <option key={domain.id} value={domain.id}>
                            {domain.name}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Subdomain">
                      <select
                        value={form.subdomain_id}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            subdomain_id: event.target.value,
                          }))
                        }
                        className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                      >
                        <option value="">No subdomain</option>
                        {visibleSubdomains.map((subdomain) => (
                          <option key={subdomain.id} value={subdomain.id}>
                            {subdomain.name}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Description">
                    <textarea
                      value={form.description}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                      rows={4}
                      className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                    />
                  </Field>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Tags">
                      <div className="rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() =>
                                setTags((current) =>
                                  current.filter((item) => item !== tag),
                                )
                              }
                              className="inline-flex items-center gap-1 rounded-full bg-brand-walnut/10 px-3 py-1 text-xs font-bold text-brand-walnut"
                            >
                              {tag}
                              <X size={12} />
                            </button>
                          ))}
                          <input
                            value={form.tagsInput}
                            onChange={(event) =>
                              setForm((current) => ({
                                ...current,
                                tagsInput: event.target.value,
                              }))
                            }
                            onKeyDown={handleTagKeyDown}
                            placeholder="Type and press Enter"
                            className="min-w-40 flex-1 bg-transparent text-sm outline-none"
                          />
                        </div>
                      </div>
                    </Field>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Order Index">
                        <input
                          type="number"
                          value={form.order_index}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              order_index: event.target.value,
                            }))
                          }
                          className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                        />
                      </Field>
                      <label className="flex items-center gap-3 self-end rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm font-semibold text-slate-blue">
                        <input
                          type="checkbox"
                          checked={form.is_active}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              is_active: event.target.checked,
                            }))
                          }
                          className="h-4 w-4 rounded border-cool-gray text-brand-walnut focus:ring-brand-walnut"
                        />
                        Active
                      </label>
                    </div>
                  </div>
                </section>

                <section className="space-y-4 rounded-3xl border border-cool-gray/20 bg-light-gray/30 p-5">
                  <SectionTitle title="Media" />
                  <Field label="Video URL">
                    <input
                      value={form.video_url}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          video_url: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                    />
                  </Field>
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
                  <Field label="Thumbnail URL">
                    <input
                      value={form.thumbnail_url}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          thumbnail_url: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                    />
                  </Field>
                </section>

                <section className="space-y-4 rounded-3xl border border-cool-gray/20 bg-light-gray/30 p-5">
                  <SectionTitle title="Problems & Solutions" />
                  <div className="space-y-4">
                    {problemRows.map((row, index) => (
                      <div
                        key={`${index}-${row.problem}`}
                        className="rounded-2xl border border-cool-gray/20 bg-pure-white p-4"
                      >
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-blue/45">
                            Problem {index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setProblemRows((current) =>
                                current.filter(
                                  (_, rowIndex) => rowIndex !== index,
                                ),
                              )
                            }
                            className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          <textarea
                            value={row.problem}
                            onChange={(event) =>
                              setProblemRows((current) =>
                                current.map((item, rowIndex) =>
                                  rowIndex === index
                                    ? { ...item, problem: event.target.value }
                                    : item,
                                ),
                              )
                            }
                            rows={4}
                            placeholder="Problem"
                            className="w-full rounded-2xl border border-cool-gray/40 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                          />
                          <textarea
                            value={row.solution}
                            onChange={(event) =>
                              setProblemRows((current) =>
                                current.map((item, rowIndex) =>
                                  rowIndex === index
                                    ? { ...item, solution: event.target.value }
                                    : item,
                                ),
                              )
                            }
                            rows={4}
                            placeholder="Solution"
                            className="w-full rounded-2xl border border-cool-gray/40 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setProblemRows((current) => [
                        ...current,
                        { problem: "", solution: "" },
                      ])
                    }
                    className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-brand-walnut/30 px-4 py-3 text-sm font-bold text-brand-walnut transition-colors hover:bg-brand-walnut/5"
                  >
                    <Plus size={16} /> Add Problem
                  </button>
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
                        ? "Create Solution"
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

function SectionTitle({ title }: { title: string }) {
  return (
    <h4 className="text-sm font-bold uppercase tracking-widest text-slate-blue/45">
      {title}
    </h4>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2 text-sm font-semibold text-slate-blue">
      <span>
        {label} {required ? <span className="text-brand-walnut">*</span> : null}
      </span>
      {children}
    </label>
  );
}
