import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { Domain, Subdomain } from "@/src/types";
import {
  createSubdomain,
  updateSubdomain,
} from "@/src/services/subdomains.service";

type SubdomainForm = {
  domain_id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  order_index: string;
  is_active: boolean;
};

type SubdomainModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  domains: Domain[];
  subdomain?: Subdomain | null;
  defaultDomainId?: string;
  lockDomain?: boolean;
  onCancel: () => void;
  onSaved: () => void;
  onError: (message: string) => void;
};

const emptyForm: SubdomainForm = {
  domain_id: "",
  name: "",
  slug: "",
  description: "",
  icon: "",
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

export default function SubdomainModal({
  isOpen,
  mode,
  domains,
  subdomain,
  defaultDomainId,
  lockDomain = false,
  onCancel,
  onSaved,
  onError,
}: SubdomainModalProps) {
  const [form, setForm] = useState<SubdomainForm>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setForm(
        subdomain
          ? {
              domain_id: subdomain.domain_id ?? defaultDomainId ?? "",
              name: subdomain.name,
              slug: subdomain.slug,
              description: subdomain.description ?? "",
              icon: subdomain.icon ?? "",
              order_index: String(subdomain.order_index ?? 0),
              is_active: subdomain.is_active,
            }
          : {
              ...emptyForm,
              domain_id: defaultDomainId ?? "",
            },
      );
      setValidationError("");
    }
  }, [defaultDomainId, isOpen, subdomain]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setValidationError("");

    if (!form.domain_id) {
      setValidationError("Select a parent domain.");
      return;
    }

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
        domain_id: form.domain_id,
        name: form.name.trim(),
        slug: normalizedSlug,
        description: form.description.trim() || null,
        icon: form.icon.trim() || null,
        order_index: Number(form.order_index) || 0,
        is_active: form.is_active,
      } satisfies Partial<Subdomain>;

      if (mode === "create") {
        await createSubdomain(payload);
      } else if (subdomain) {
        await updateSubdomain(subdomain.id, payload);
      }

      onSaved();
    } catch (error) {
      onError(
        error instanceof Error ? error.message : "Unable to save subdomain.",
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
            className="w-full max-w-2xl rounded-3xl border border-cool-gray/20 bg-pure-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-cool-gray/20 px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-slate-blue">
                  {mode === "create" ? "Add Subdomain" : "Edit Subdomain"}
                </h3>
                <p className="text-sm text-slate-blue/50">
                  Configure the child entry linked to a parent domain.
                </p>
              </div>
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl p-2 text-slate-blue/35 transition-colors hover:bg-light-gray hover:text-slate-blue"
                aria-label="Close subdomain modal"
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
                <Field label="Parent Domain" required>
                  <select
                    value={form.domain_id}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        domain_id: event.target.value,
                      }))
                    }
                    disabled={lockDomain}
                    className="w-full rounded-2xl border border-cool-gray/40 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut focus:bg-pure-white disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <option value="">Select a domain</option>
                    {domains.map((domain) => (
                      <option key={domain.id} value={domain.id}>
                        {domain.name}
                      </option>
                    ))}
                  </select>
                </Field>
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
              </div>

              <div className="grid gap-4 md:grid-cols-2">
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

              <Field label="Icon">
                <input
                  value={form.icon}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      icon: event.target.value,
                    }))
                  }
                  placeholder="building, gate, emoji"
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
                      ? "Create Subdomain"
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
