import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import type { Domain } from "@/src/types";
import { createDomain, updateDomain } from "@/src/services/domains.service";

type DomainForm = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  image_url: string;
  order_index: string;
  is_active: boolean;
};

type DomainModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  domain?: Domain | null;
  onCancel: () => void;
  onSaved: () => void;
  onError: (message: string) => void;
};

const emptyForm: DomainForm = {
  name: "",
  slug: "",
  description: "",
  icon: "",
  color: "#6B4F3A",
  image_url: "",
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

export default function DomainModal({
  isOpen,
  mode,
  domain,
  onCancel,
  onSaved,
  onError,
}: DomainModalProps) {
  const [form, setForm] = useState<DomainForm>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setForm(
        domain
          ? {
              name: domain.name,
              slug: domain.slug,
              description: domain.description ?? "",
              icon: domain.icon ?? "",
              color: domain.color ?? "#6B4F3A",
              image_url: domain.image_url ?? "",
              order_index: String(domain.order_index ?? 0),
              is_active: domain.is_active,
            }
          : emptyForm,
      );
      setValidationError("");
    }
  }, [domain, isOpen]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setValidationError("");

    if (!form.name.trim()) {
      setValidationError("Name is required.");
      return;
    }

    const normalizedSlug = slugify(form.slug || form.name);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalizedSlug)) {
      setValidationError(
        "Slug must use lowercase letters, numbers, and hyphens only.",
      );
      return;
    }

    try {
      setIsSaving(true);
      const payload = {
        name: form.name.trim(),
        slug: normalizedSlug,
        description: form.description.trim() || null,
        icon: form.icon.trim() || null,
        color: form.color.trim() || null,
        image_url: form.image_url.trim() || null,
        order_index: Number(form.order_index) || 0,
        is_active: form.is_active,
      } satisfies Partial<Domain>;

      if (mode === "create") {
        await createDomain(payload);
      } else if (domain) {
        await updateDomain(domain.id, payload);
      }

      onSaved();
    } catch (error) {
      onError(
        error instanceof Error ? error.message : "Unable to save domain.",
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
                  {mode === "create" ? "Add Domain" : "Edit Domain"}
                </h3>
                <p className="text-sm text-slate-blue/50">
                  Configure the top-level domain entry and its metadata.
                </p>
              </div>
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl p-2 text-slate-blue/35 transition-colors hover:bg-light-gray hover:text-slate-blue"
                aria-label="Close domain modal"
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
                <Field label="Name" required>
                  <input
                    value={form.name}
                    onChange={(event) => {
                      const nextName = event.target.value;
                      setForm((current) => ({
                        ...current,
                        name: nextName,
                        slug: current.slug ? current.slug : slugify(nextName),
                      }));
                    }}
                    className="w-full rounded-2xl border border-cool-gray/40 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut focus:bg-pure-white"
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
                    className="w-full rounded-2xl border border-cool-gray/40 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut focus:bg-pure-white"
                  />
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
                  className="w-full rounded-2xl border border-cool-gray/40 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut focus:bg-pure-white"
                />
              </Field>

              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Icon">
                  <input
                    value={form.icon}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        icon: event.target.value,
                      }))
                    }
                    placeholder="Globe, building, emoji"
                    className="w-full rounded-2xl border border-cool-gray/40 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut focus:bg-pure-white"
                  />
                </Field>
                <Field label="Color">
                  <input
                    value={form.color}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        color: event.target.value,
                      }))
                    }
                    placeholder="#6B4F3A"
                    className="w-full rounded-2xl border border-cool-gray/40 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut focus:bg-pure-white"
                  />
                </Field>
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
              </div>

              <Field label="Image URL">
                <input
                  value={form.image_url}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      image_url: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-cool-gray/40 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut focus:bg-pure-white"
                />
              </Field>

              <label className="flex items-center gap-3 text-sm font-semibold text-slate-blue">
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
                      ? "Create Domain"
                      : "Save Changes"}
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
