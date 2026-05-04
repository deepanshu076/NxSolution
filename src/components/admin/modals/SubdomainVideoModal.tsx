import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { Domain, Subdomain } from "@/src/types";

type VideoForm = {
  title: string;
  slug: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  order_index: string;
  is_active: boolean;
};

type SubdomainVideoModalProps = {
  isOpen: boolean;
  domain: Domain | null;
  subdomain: Subdomain | null;
  onCancel: () => void;
  onSave: (payload: VideoForm) => Promise<void>;
  onError: (message: string) => void;
};

const emptyForm: VideoForm = {
  title: "",
  slug: "",
  description: "",
  video_url: "",
  thumbnail_url: "",
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

export default function SubdomainVideoModal({
  isOpen,
  domain,
  subdomain,
  onCancel,
  onSave,
  onError,
}: SubdomainVideoModalProps) {
  const [form, setForm] = useState<VideoForm>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setForm(emptyForm);
    setValidationError("");
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setValidationError("");

    if (!form.title.trim()) {
      setValidationError("Video title is required.");
      return;
    }
    if (!form.video_url.trim()) {
      setValidationError("Video URL is required.");
      return;
    }

    try {
      setIsSaving(true);
      await onSave({
        ...form,
        slug: slugify(form.slug || form.title),
      });
      onCancel();
    } catch (error) {
      onError(error instanceof Error ? error.message : "Unable to save video.");
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
          className="fixed inset-0 z-[90] flex items-center justify-center bg-brand-black/70 px-4 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-3xl rounded-3xl border border-cool-gray/20 bg-pure-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-cool-gray/20 px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-slate-blue">
                  Add Subdomain Video
                </h3>
                <p className="text-sm text-slate-blue/50">
                  Domain: <span className="font-semibold">{domain?.name ?? "—"}</span> ·
                  Subdomain: <span className="font-semibold">{subdomain?.name ?? "—"}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl p-2 text-slate-blue/35 transition-colors hover:bg-light-gray hover:text-slate-blue"
                aria-label="Close video modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
              {validationError ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {validationError}
                </div>
              ) : null}

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Title" required>
                  <input
                    value={form.title}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        title: event.target.value,
                        slug: current.slug || slugify(event.target.value),
                      }))
                    }
                    className="w-full rounded-2xl border border-cool-gray/40 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut focus:bg-pure-white"
                  />
                </Field>
                <Field label="Slug">
                  <input
                    value={form.slug}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        slug: slugify(event.target.value),
                      }))
                    }
                    className="w-full rounded-2xl border border-cool-gray/40 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut focus:bg-pure-white"
                  />
                </Field>
              </div>

              <Field label="Video URL" required>
                <input
                  value={form.video_url}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      video_url: event.target.value,
                    }))
                  }
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full rounded-2xl border border-cool-gray/40 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut focus:bg-pure-white"
                />
              </Field>

              <Field label="Thumbnail URL">
                <input
                  value={form.thumbnail_url}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      thumbnail_url: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-cool-gray/40 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut focus:bg-pure-white"
                />
              </Field>

              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full rounded-2xl border border-cool-gray/40 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut focus:bg-pure-white"
                />
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
                    className="w-full rounded-2xl border border-cool-gray/40 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut focus:bg-pure-white"
                  />
                </Field>
                <label className="flex items-center gap-3 self-end text-sm font-semibold text-slate-blue">
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
                  {isSaving ? "Saving..." : "Add Video"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
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
