type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

type AuthResult = {
  token: string;
  user: AuthUser;
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

export async function getSessionUser() {
  const token = window.localStorage.getItem("nxsolution_jwt");
  if (!token) return null;

  const response = await fetch(`${API_BASE}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await parseResponse<{ user: AuthUser }>(response);
  return body.user;
}

export async function signIn(email: string, password: string) {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return parseResponse<AuthResult>(response);
}

export async function signUp(email: string, password: string, fullName: string) {
  const response = await fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name: fullName }),
  });
  return parseResponse<AuthResult>(response);
}

export async function signOut() {
  await fetch(`${API_BASE}/api/auth/logout`, { method: "POST" });
  window.localStorage.removeItem("nxsolution_jwt");
}

export async function resetPassword(_email: string) {
  throw new Error("Password reset is not enabled in JWT mode yet.");
}
