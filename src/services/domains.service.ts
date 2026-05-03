import { supabase } from "@/src/lib/supabase";
import type { Domain } from "@/src/types";
import { domainsData } from "@/src/constants/domains";

export async function listDomains(activeOnly = true) {
  try {
    const query = supabase
      .from("domains")
      .select("*")
      .order("order_index", { ascending: true });

    if (activeOnly) query.eq("is_active", true);

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as Domain[];
  } catch (err) {
    console.warn("Failed to fetch domains from database, using fallback data:", err);
    return domainsData.filter(activeOnly ? (d) => d.is_active : () => true);
  }
}

export async function getDomainBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from("domains")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data as Domain;
  } catch (err) {
    console.warn("Failed to fetch domain from database, using fallback data:", err);
    const domain = domainsData.find((d) => d.slug === slug);
    if (domain) return domain as Domain;
    throw err;
  }
}

export async function getDomainById(id: string) {
  try {
    const { data, error } = await supabase
      .from("domains")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Domain;
  } catch (err) {
    console.warn("Failed to fetch domain from database, using fallback data:", err);
    const domain = domainsData.find((d) => d.id === id);
    if (domain) return domain as Domain;
    throw err;
  }
}

export async function createDomain(input: Partial<Domain>) {
  try {
    const { data, error } = await supabase
      .from("domains")
      .insert(input)
      .select("*")
      .single();

    if (error) throw error;
    return data as Domain;
  } catch (err) {
    console.warn("Failed to create domain in database:", err);
    throw err;
  }
}

export async function updateDomain(id: string, input: Partial<Domain>) {
  try {
    const { data, error } = await supabase
      .from("domains")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return data as Domain;
  } catch (err) {
    console.warn("Failed to update domain in database:", err);
    throw err;
  }
}

export async function deleteDomain(id: string) {
  try {
    const { error } = await supabase.from("domains").delete().eq("id", id);
    if (error) throw error;
  } catch (err) {
    console.warn("Failed to delete domain from database:", err);
    throw err;
  }
}
