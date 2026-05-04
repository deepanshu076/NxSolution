import { supabase } from "@/src/lib/supabase";
import type { Product } from "@/src/types";
import { productsData } from "@/src/constants/products";

export async function listProducts(activeOnly = true) {
  try {
    let query = supabase
      .from("products")
      .select("*")
      .order("order_index", { ascending: true });

    if (activeOnly) query = query.eq("is_active", true);

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as Product[];
  } catch (err) {
    console.warn("Failed to fetch products from database, using fallback data:", err);
    return productsData as Product[];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data as Product;
  } catch (err) {
    console.warn("Failed to fetch product from database, using fallback data:", err);
    const product = productsData.find((p) => p.slug === slug);
    if (product) return product as Product;
    throw err;
  }
}

export async function createProduct(input: Partial<Product>) {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert(input)
      .select("*")
      .single();

    if (error) throw error;
    return data as Product;
  } catch (err) {
    console.warn("Failed to create product in database:", err);
    throw err;
  }
}

export async function updateProduct(id: string, input: Partial<Product>) {
  try {
    const { data, error } = await supabase
      .from("products")
      .update(input)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return data as Product;
  } catch (err) {
    console.warn("Failed to update product in database:", err);
    throw err;
  }
}

export async function deleteProduct(id: string) {
  try {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
  } catch (err) {
    console.warn("Failed to delete product from database:", err);
    throw err;
  }
}
