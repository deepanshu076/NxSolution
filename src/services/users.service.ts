import { usersData } from "@/src/constants/users";

export type UserRecord = {
  id: string;
  email: string | null;
  full_name?: string | null;
  role?: string | null;
  avatar_url?: string | null;
};

const API_BASE =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ||
  `${window.location.protocol}//${window.location.hostname}:3000`;

async function parseResponse<T>(response: Response): Promise<T> {
  const raw = await response.text();
  let body: (T & { error?: string }) | null = null;

  try {
    body = JSON.parse(raw) as T & { error?: string };
  } catch {
    body = {
      error: raw.startsWith("<!DOCTYPE")
        ? "API returned HTML instead of JSON. Check backend URL/server."
        : "Invalid API response.",
    } as T & { error?: string };
  }

  if (!response.ok) {
    throw new Error(body.error || "Request failed");
  }

  return body;
}

function getAuthHeaders() {
  const token = window.localStorage.getItem("nxsolution_jwt");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function mergeUsers(primary: UserRecord[], fallback: UserRecord[]) {
  const merged = new Map<string, UserRecord>();

  for (const user of fallback) {
    const key = user.id || user.email || `${user.full_name ?? "user"}`;
    merged.set(key, user);
  }

  for (const user of primary) {
    const key = user.id || user.email || `${user.full_name ?? "user"}`;
    merged.set(key, user);
  }

  return Array.from(merged.values());
}

export async function listUsers() {
  try {
    const response = await fetch(`${API_BASE}/api/admin/users`, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    const body = await parseResponse<{ users: UserRecord[] }>(response);
    return mergeUsers(body.users || [], usersData as UserRecord[]);
  } catch (err) {
    console.warn("Failed to fetch users from backend, using fallback data:", err);
    return usersData as UserRecord[];
  }
}

export async function updateUser(id: string, payload: Partial<UserRecord>) {
  try {
    const response = await fetch(`${API_BASE}/api/admin/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    });
    const body = await parseResponse<{ user: UserRecord }>(response);
    return body.user;
  } catch (err) {
    console.warn("Failed to update user in database:", err);
    // Fallback: Update from local data
    const user = usersData.find((u) => u.id === id);
    if (user) {
      Object.assign(user, payload);
      return user as UserRecord;
    }
    throw err;
  }
}

export async function deleteUser(id: string) {
  try {
    const response = await fetch(`${API_BASE}/api/admin/users/${id}`, {
      method: "DELETE",
      headers: {
        ...getAuthHeaders(),
      },
    });
    await parseResponse<{ success: boolean }>(response);
    return true;
  } catch (err) {
    console.warn("Failed to delete user from database:", err);
    // Fallback: Remove from local data
    const index = usersData.findIndex((u) => u.id === id);
    if (index > -1) {
      usersData.splice(index, 1);
      return true;
    }
    throw err;
  }
}
