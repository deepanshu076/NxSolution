import { supabase } from "@/src/lib/supabase";
import type { Solution, SolutionProblem } from "@/src/types";
import { solutionsData } from "@/src/constants/solutions";

function normalizeSubdomainKey(value: string) {
  const parts = value.split("-").filter(Boolean);
  if (parts.length <= 1) return value.toLowerCase();
  return parts.slice(1).join("-").toLowerCase();
}

function buildConstantSolutionRows(subdomainKey: string): Solution[] {
  return solutionsData
    .filter((item) => item.subdomainSlug.toLowerCase() === subdomainKey)
    .map((item, index) => ({
      id: `constant-${item.id}-${index}`,
      domain_id: null,
      subdomain_id: null,
      title: item.name,
      slug: item.slug,
      description: item.description,
      video_url: item.videoUrl,
      thumbnail_url: null,
      tags: item.features,
      is_active: true,
      order_index: index,
      created_at: null,
      updated_at: null,
    }));
}

function mergeSolutions(primary: Solution[], fallback: Solution[]) {
  const merged = new Map<string, Solution>();
  for (const item of fallback) merged.set(item.slug, item);
  for (const item of primary) merged.set(item.slug, item);
  return Array.from(merged.values());
}

export async function listSolutions(activeOnly = true) {
  try {
    let query = supabase
      .from("solutions")
      .select("*")
      .order("order_index", { ascending: true });

    if (activeOnly) query = query.eq("is_active", true);

    const { data, error } = await query;
    if (error) throw error;
    return mergeSolutions((data ?? []) as Solution[], solutionsData as unknown as Solution[]);
  } catch (err) {
    console.warn("Failed to fetch solutions from database, using fallback data:", err);
    return (solutionsData as unknown as Solution[]) || [];
  }
}

export async function listSolutionsBySubdomain(
  subdomainId: string,
  activeOnly = true,
) {
  const constantSolutions = buildConstantSolutionRows(normalizeSubdomainKey(subdomainId));

  try {
    let query = supabase
      .from("solutions")
      .select("*")
      .eq("subdomain_id", subdomainId)
      .order("order_index", { ascending: true });

    if (activeOnly) query = query.eq("is_active", true);

    const { data, error } = await query;
    if (error) throw error;
    return mergeSolutions((data ?? []) as Solution[], constantSolutions);
  } catch (err) {
    console.warn(
      "Failed to fetch solutions from database, using fallback data:",
      err,
    );
    return constantSolutions;
  }
}

export async function getSolutionBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from("solutions")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data as Solution;
  } catch (err) {
    console.warn("Failed to fetch solution from database, using fallback data:", err);
    const solution = (solutionsData as any).find((s) => s.slug === slug);
    if (solution) return solution as Solution;
    throw err;
  }
}

export async function listSolutionProblems(solutionId: string) {
  try {
    const { data, error } = await supabase
      .from("solution_problems")
      .select("*")
      .eq("solution_id", solutionId)
      .order("order_index", { ascending: true });

    if (error) throw error;
    return (data ?? []) as SolutionProblem[];
  } catch (err) {
    console.warn("Failed to fetch solution problems from database:", err);
    return [];
  }
}

export async function replaceSolutionProblems(
  solutionId: string,
  problems: Array<{ problem: string; solution: string; order_index: number }>,
) {
  try {
    const { error: deleteError } = await supabase
      .from("solution_problems")
      .delete()
      .eq("solution_id", solutionId);

    if (deleteError) throw deleteError;

    if (problems.length === 0) return;

    const payload = problems.map((item) => ({
      solution_id: solutionId,
      problem: item.problem,
      solution: item.solution,
      order_index: item.order_index,
    }));

    const { error: insertError } = await supabase
      .from("solution_problems")
      .insert(payload);

    if (insertError) throw insertError;
  } catch (err) {
    console.warn("Failed to replace solution problems in database:", err);
    throw err;
  }
}

export async function createSolution(input: Partial<Solution>) {
  try {
    const { data, error } = await supabase
      .from("solutions")
      .insert(input)
      .select("*")
      .single();

    if (error) throw error;
    return data as Solution;
  } catch (err) {
    console.warn("Failed to create solution in database:", err);
    throw err;
  }
}

export async function updateSolution(id: string, input: Partial<Solution>) {
  try {
    const { data, error } = await supabase
      .from("solutions")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return data as Solution;
  } catch (err) {
    console.warn("Failed to update solution in database:", err);
    throw err;
  }
}

export async function deleteSolution(id: string) {
  try {
    const { error } = await supabase.from("solutions").delete().eq("id", id);
    if (error) throw error;
  } catch (err) {
    console.warn("Failed to delete solution from database:", err);
    throw err;
  }
}
