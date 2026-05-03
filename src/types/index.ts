export interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  role: "user" | "admin";
  avatar_url: string | null;
  created_at: string | null;
}

export interface Domain {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  image_url: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
}

export interface Subdomain {
  id: string;
  domain_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
}

export interface Solution {
  id: string;
  domain_id: string | null;
  subdomain_id: string | null;
  title: string;
  slug: string;
  description: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  tags: string[] | null;
  is_active: boolean;
  order_index: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface SolutionProblem {
  id: string;
  solution_id: string;
  problem: string;
  solution: string;
  order_index: number;
}

export interface Project {
  id: string;
  domain_id: string | null;
  subdomain_id: string | null;
  title: string;
  slug: string;
  type: string | null;
  status: "ongoing" | "completed";
  video_url: string | null;
  thumbnail_url: string | null;
  year: string | null;
  overview: string | null;
  requirements: string[] | null;
  implementation: string[] | null;
  before_points: string[] | null;
  after_points: string[] | null;
  metrics: Record<string, unknown> | null;
  tags: string[] | null;
  is_active: boolean;
  order_index: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface Product {
  id: string;
  domain_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  tags: string[] | null;
  price: number | null;
  currency: string | null;
  features: string[] | null;
  is_active: boolean;
  order_index: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  industry: string | null;
  message: string | null;
  status: "new" | "qualified" | "in_progress" | "proposal" | "closed";
  source: string | null;
  created_at: string | null;
}
