import { useEffect, useState } from "react";
import type { Project } from "@/src/types";
import { listProjects } from "@/src/services/projects.service";

export function useProjects(activeOnly = true) {
  const [data, setData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        const projects = await listProjects(activeOnly);
        if (!cancelled) setData(projects);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load projects",
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
