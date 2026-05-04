import { supabase } from "@/src/lib/supabase";
import type { Lead } from "@/src/types";
import { leadsData } from "@/src/constants/leads";

export async function listLeads() {
  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as Lead[];
  } catch (err) {
    console.warn("Failed to fetch leads from database, using fallback data:", err);
    return leadsData as Lead[];
  }
}

export async function createLead(input: Partial<Lead>) {
  try {
    const { data, error } = await supabase
      .from("leads")
      .insert(input)
      .select("*")
      .single();

    if (error) throw error;
    return data as Lead;
  } catch (err) {
    console.warn("Failed to create lead in database, using fallback:", err);
    // Fallback: Add to local data
    const newLead: Lead = {
      id: `${Date.now()}`,
      ...input,
      created_at: new Date().toISOString(),
      status: "new",
    } as Lead;
    leadsData.push(newLead);
    return newLead;
  }
}

export async function updateLeadStatus(id: string, status: Lead["status"]) {
  try {
    const { data, error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return data as Lead;
  } catch (err) {
    console.warn("Failed to update lead status in database:", err);
    // Fallback: Update from local data
    const lead = leadsData.find((l) => l.id === id);
    if (lead) {
      (lead as any).status = status;
      return lead as Lead;
    }
    throw err;
  }
}

export async function deleteLead(id: string) {
  try {
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) throw error;
  } catch (err) {
    console.warn("Failed to delete lead from database:", err);
    // Fallback: Remove from local data
    const index = leadsData.findIndex((l) => l.id === id);
    if (index > -1) {
      leadsData.splice(index, 1);
      return;
    }
    throw err;
  }
}
