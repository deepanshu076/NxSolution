import { supabase } from "@/src/lib/supabase";
import type { Project } from "@/src/types";
import { projectsData } from "@/src/constants/projects";

export async function listProjects(activeOnly = true) {
  try {
    let query = supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true });

    if (activeOnly) query = query.eq("is_active", true);

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as Project[];
  } catch (err) {
    console.warn("Failed to fetch projects from database, using fallback data:", err);
    return (projectsData as unknown as Project[]) || [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data as Project;
  } catch (err) {
    console.warn("Failed to fetch project from database, using fallback data:", err);
    const project = (projectsData as any).find((p: any) => p.slug === slug);
    if (project) return project as Project;
    throw err;
  }
}

export async function createProject(input: Partial<Project>) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .insert(input)
      .select("*")
      .single();

    if (error) throw error;
    return data as Project;
  } catch (err) {
    console.warn("Failed to create project in database:", err);
    throw err;
  }
}

export async function updateProject(id: string, input: Partial<Project>) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return data as Project;
  } catch (err) {
    console.warn("Failed to update project in database:", err);
    throw err;
  }
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}
