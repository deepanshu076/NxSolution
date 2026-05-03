import { useEffect, useState } from "react";
import type { Product } from "@/src/types";
import { listProducts } from "@/src/services/products.service";

export function useProducts(activeOnly = true) {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        const products = await listProducts(activeOnly);
        if (!cancelled) setData(products);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load products",
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [activeOnly]);

  return { data, isLoading, error };
}
