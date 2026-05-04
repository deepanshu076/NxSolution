import { supabase } from "@/src/lib/supabase";
import type { Subdomain } from "@/src/types";
import { subdomainsData } from "@/src/constants/domains";

export async function listSubdomains(domainId?: string, activeOnly = true) {
  try {
    let query = supabase
      .from("subdomains")
      .select("*")
      .order("order_index", { ascending: true });

    if (domainId) query = query.eq("domain_id", domainId);
    if (activeOnly) query = query.eq("is_active", true);

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as Subdomain[];
  } catch (err) {
    console.warn("Failed to fetch subdomains from database, using fallback data:", err);
    let filtered = subdomainsData;
    if (domainId) filtered = filtered.filter((s) => s.domain_id === domainId);
    if (activeOnly) filtered = filtered.filter((s) => s.is_active);
    return filtered as Subdomain[];
  }
}

export async function getSubdomainBySlug(domainId: string, slug: string) {
  try {
    const { data, error } = await supabase
      .from("subdomains")
      .select("*")
      .eq("domain_id", domainId)
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data as Subdomain;
  } catch (err) {
    console.warn("Failed to fetch subdomain from database, using fallback data:", err);
    const subdomain = subdomainsData.find(
      (s) => s.domain_id === domainId && s.slug === slug,
    );
    if (subdomain) return subdomain as Subdomain;
    throw err;
  }
}

export async function createSubdomain(input: Partial<Subdomain>) {
  try {
    const { data, error } = await supabase
      .from("subdomains")
      .insert(input)
      .select("*")
      .single();

    if (error) throw error;
    return data as Subdomain;
  } catch (err) {
    console.warn("Failed to create subdomain in database:", err);
    throw err;
  }
}

export async function updateSubdomain(id: string, input: Partial<Subdomain>) {
  try {
    const { data, error } = await supabase
      .from("subdomains")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return data as Subdomain;
  } catch (err) {
    console.warn("Failed to update subdomain in database:", err);
    throw err;
  }
}

export async function deleteSubdomain(id: string) {
  const { error } = await supabase.from("subdomains").delete().eq("id", id);
  if (error) throw error;
}
