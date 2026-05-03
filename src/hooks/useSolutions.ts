import { useEffect, useState } from "react";
import type { Solution } from "@/src/types";
import { listSolutions } from "@/src/services/solutions.service";

export function useSolutions(activeOnly = true) {
  const [data, setData] = useState<Solution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        const solutions = await listSolutions(activeOnly);
        if (!cancelled) setData(solutions);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load solutions",
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
