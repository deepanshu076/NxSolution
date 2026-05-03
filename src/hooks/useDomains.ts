import { useEffect, useState } from "react";
import type { Domain } from "@/src/types";
import { listDomains } from "@/src/services/domains.service";

export function useDomains(activeOnly = true) {
  const [data, setData] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        const domains = await listDomains(activeOnly);
        if (!cancelled) setData(domains);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load domains",
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
