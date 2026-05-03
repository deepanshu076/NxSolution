import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { Domain, Product, Subdomain } from "@/src/types";
import { createProduct, updateProduct } from "@/src/services/products.service";

type ProductForm = {
  domain_id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  category: string;
  price: string;
  currency: string;
  tagsInput: string;
  order_index: string;
  is_active: boolean;
};

type ProductModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  domains: Domain[];
  subdomains: Subdomain[];
  product?: Product | null;
  onCancel: () => void;
  onSaved: () => void;
  onError: (message: string) => void;
};

const emptyForm: ProductForm = {
  domain_id: "",
  name: "",
  slug: "",
  description: "",
  image_url: "",
  category: "",
  price: "",
  currency: "",
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

export default function ProductModal({
  isOpen,
  mode,
  domains,
  subdomains,
  product,
  onCancel,
  onSaved,
  onError,
}: ProductModalProps) {
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [tags, setTags] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    if (product) {
      setForm({
        domain_id: product.domain_id ?? "",
        name: product.name,
        slug: product.slug,
        description: product.description ?? "",
        image_url: product.image_url ?? "",
        category: product.category ?? "",
        price: product.price != null ? String(product.price) : "",
        currency: product.currency ?? "",
        tagsInput: (product.tags ?? []).join(", "),
        order_index: String(product.order_index ?? 0),
        is_active: product.is_active,
      });
      setTags(product.tags ?? []);
    } else {
      setForm(emptyForm);
      setTags([]);
    }

    setValidationError("");
  }, [isOpen, product]);

  useEffect(() => {
    if (!form.domain_id) return;
  }, [form.domain_id]);

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const newTags = parseTags(form.tagsInput).filter((t) => !tags.includes(t));
    if (newTags.length === 0) return;
    setTags((c) => [...c, ...newTags]);
    setForm((c) => ({ ...c, tagsInput: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    if (!form.name.trim()) {
      setValidationError("Name is required.");
      return;
    }

    try {
      setIsSaving(true);
      const payload = {
        domain_id: form.domain_id || null,
        name: form.name.trim(),
        slug: slugify(form.slug || form.name),
        description: form.description.trim() || null,
        image_url: form.image_url.trim() || null,
        category: form.category.trim() || null,
        price: form.price ? Number(form.price) : null,
        currency: form.currency || null,
        tags: tags.length > 0 ? tags : null,
        order_index: Number(form.order_index) || 0,
        is_active: form.is_active,
      } satisfies Partial<Product>;

      if (mode === "create" || !product) {
        await createProduct(payload);
      } else {
        await updateProduct(product.id, payload);
      }

      onSaved();
    } catch (err) {
      onError(err instanceof Error ? err.message : "Unable to save product.");
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
                  {mode === "create" ? "Add Product" : "Edit Product"}
                </h3>
                <p className="text-sm text-slate-blue/50">
                  Manage product metadata and pricing.
                </p>
              </div>
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl p-2 text-slate-blue/35 transition-colors hover:bg-light-gray hover:text-slate-blue"
                aria-label="Close product modal"
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
                      <span>
                        Name <span className="text-brand-walnut">*</span>
                      </span>
                      <input
                        value={form.name}
                        onChange={(e) => {
                          const next = e.target.value;
                          setForm((c) => ({
                            ...c,
                            name: next,
                            slug: c.slug ? c.slug : slugify(next),
                          }));
                        }}
                        className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                      />
                    </label>
                    <label className="block space-y-2 text-sm font-semibold text-slate-blue">
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
                      <span>Domain</span>
                      <select
                        value={form.domain_id}
                        onChange={(e) =>
                          setForm((c) => ({
                            ...c,
                            domain_id: e.target.value,
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
                  </div>

                  <label className="block space-y-2 text-sm font-semibold text-slate-blue">
                    <span>Description</span>
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm((c) => ({ ...c, description: e.target.value }))
                      }
                      rows={3}
                      className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                    />
                  </label>
                </section>

                <section className="space-y-4 rounded-3xl border border-cool-gray/20 bg-light-gray/30 p-5">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-blue/45">
                    Media & Pricing
                  </h4>
                  <label className="block space-y-2 text-sm font-semibold text-slate-blue">
                    <span>Image URL</span>
                    <input
                      value={form.image_url}
                      onChange={(e) =>
                        setForm((c) => ({ ...c, image_url: e.target.value }))
                      }
                      className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                    />
                  </label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block space-y-2 text-sm font-semibold text-slate-blue">
                      <span>Price</span>
                      <input
                        value={form.price}
                        onChange={(e) =>
                          setForm((c) => ({ ...c, price: e.target.value }))
                        }
                        className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                      />
                    </label>
                    <label className="block space-y-2 text-sm font-semibold text-slate-blue">
                      <span>Currency</span>
                      <input
                        value={form.currency}
                        onChange={(e) =>
                          setForm((c) => ({ ...c, currency: e.target.value }))
                        }
                        className="w-full rounded-2xl border border-cool-gray/40 bg-pure-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
                      />
                    </label>
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
                        ? "Create Product"
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
