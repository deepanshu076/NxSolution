import React, { useEffect, useMemo, useState } from "react";
import { Film, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Domain, Product, Subdomain } from "@/src/types";
import { listDomains } from "@/src/services/domains.service";
import { listSubdomains } from "@/src/services/subdomains.service";
import { deleteProduct, listProducts } from "@/src/services/products.service";
import ProductModal from "@/src/components/admin/modals/ProductModal";
import ConfirmDialog from "@/src/components/ui/ConfirmDialog";
import { useToast } from "@/src/components/ui/Toast";

type ModalState =
  | { mode: "create"; product?: null }
  | { mode: "edit"; product: Product }
  | null;

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [subdomains, setSubdomains] = useState<Subdomain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("");

  const [modalState, setModalState] = useState<ModalState>(null);
  const [deleteState, setDeleteState] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [productRows, domainRows, subdomainRows] = await Promise.all([
        listProducts(false),
        listDomains(false),
        listSubdomains(undefined, false),
      ]);
      setProducts(productRows);
      setDomains(domainRows);
      setSubdomains(subdomainRows);
    } catch (error) {
      toast({
        title: "Unable to load products",
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

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery =
        !q ||
        [p.name, p.slug, p.description ?? ""].some((v) =>
          v.toLowerCase().includes(q),
        );
      const matchesDomain = !domainFilter || p.domain_id === domainFilter;
      return matchesQuery && matchesDomain;
    });
  }, [domainFilter, products, search]);

  const handleSaved = async () => {
    setModalState(null);
    await loadData();
    toast({ title: "Product saved", type: "success" });
  };

  const handleDelete = async () => {
    if (!deleteState) return;
    try {
      setIsDeleting(true);
      await deleteProduct(deleteState.id);
      setDeleteState(null);
      await loadData();
      toast({ title: "Product deleted", type: "success" });
    } catch (error) {
      toast({
        title: "Delete failed",
        description:
          error instanceof Error ? error.message : "Unable to delete product.",
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
            Products Manager
          </p>
          <h1 className="text-3xl font-display font-bold text-slate-blue">
            Manage product catalog
          </h1>
          <p className="mt-2 text-sm text-slate-blue/50">
            Add and maintain product listings used across the site.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalState({ mode: "create", product: null })}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-walnut px-5 py-3 text-sm font-bold text-pure-white transition-colors hover:bg-brand-black"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="grid gap-4 rounded-3xl border border-cool-gray/30 bg-pure-white p-4 shadow-sm lg:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-cool-gray/30 bg-light-gray px-4 py-3 focus-within:border-brand-walnut transition-colors">
          <Search size={18} className="text-slate-blue/35" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or slug"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <select
          value={domainFilter}
          onChange={(e) => setDomainFilter(e.target.value)}
          className="rounded-2xl border border-cool-gray/30 bg-light-gray px-4 py-3 text-sm outline-none transition-colors focus:border-brand-walnut"
        >
          <option value="">All domains</option>
          {domains.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <div />
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
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-4xl border border-dashed border-cool-gray/30 bg-pure-white px-6 py-16 text-center">
          <Film size={42} className="mx-auto text-brand-walnut/40" />
          <h2 className="mt-4 text-xl font-bold text-slate-blue">
            No products found
          </h2>
          <p className="mt-2 text-sm text-slate-blue/50">
            {search || domainFilter
              ? "Try adjusting the filters."
              : "Add your first product to get started."}
          </p>
          <button
            type="button"
            onClick={() => setModalState({ mode: "create", product: null })}
            className="mt-6 rounded-2xl bg-brand-walnut px-5 py-3 text-sm font-bold text-pure-white transition-colors hover:bg-brand-black"
          >
            Add your first product
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-4xl border border-cool-gray/20 bg-pure-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-light-gray/50 text-[10px] font-bold uppercase tracking-widest text-slate-blue/35">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Domain</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cool-gray/10">
                {filteredProducts.map((product) => {
                  const domainName =
                    domains.find((d) => d.id === product.domain_id)?.name ??
                    "—";

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-light-cream/30 transition-colors"
                    >
                      <td className="px-6 py-5">
                        <div className="h-16 w-24 overflow-hidden rounded-2xl bg-light-gray">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
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
                          {product.name}
                        </div>
                        <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-blue/35">
                          <span>{product.slug}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-blue/60">
                        {domainName}
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-blue/60">
                        {product.category ?? "—"}
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-blue/60">
                        {product.price != null
                          ? `${product.currency ?? ""} ${product.price}`
                          : "—"}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${product.is_active ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}
                        >
                          {product.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setModalState({ mode: "edit", product })
                            }
                            className="rounded-xl border border-cool-gray/30 p-2 text-slate-blue/45 transition-colors hover:border-brand-walnut hover:text-brand-walnut"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteState(product)}
                            className="rounded-xl border border-red-200 p-2 text-red-600 transition-colors hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ProductModal
        isOpen={Boolean(modalState)}
        mode={modalState?.mode ?? "create"}
        domains={domains}
        subdomains={subdomains}
        product={modalState?.mode === "edit" ? modalState.product : null}
        onCancel={() => setModalState(null)}
        onSaved={handleSaved}
        onError={(msg) =>
          toast({
            title: "Product save failed",
            description: msg,
            type: "error",
          })
        }
      />

      <ConfirmDialog
        isOpen={Boolean(deleteState)}
        title="Delete Product"
        message="Are you sure you want to delete this item? This action cannot be undone."
        isLoading={isDeleting}
        onCancel={() => setDeleteState(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
