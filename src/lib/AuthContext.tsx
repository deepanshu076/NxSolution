import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<User>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
    isAdmin?: boolean;
  }) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  isLoading: boolean;
}

type AuthResponse = {
  token: string;
  user: User;
};

const TOKEN_KEY = "nxsolution_jwt";
const API_BASE =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ||
  `${window.location.protocol}//${window.location.hostname}:3000`;
const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredToken() {
  return window.localStorage.getItem(TOKEN_KEY);
}

function setStoredToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

function clearStoredToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

async function fetchWithAuth(path: string, token: string) {
  return fetch(`${API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

async function parseApiResponse<T>(
  response: Response,
): Promise<T & { error?: string }> {
  const raw = await response.text();
  try {
    return JSON.parse(raw) as T & { error?: string };
  } catch {
    const fallbackMessage = raw.startsWith("<!DOCTYPE")
      ? "API returned HTML instead of JSON. Check backend URL/server."
      : "Invalid API response.";
    return { error: fallbackMessage } as T & { error?: string };
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      const token = getStoredToken();
      if (!token) {
        if (mounted) setIsLoading(false);
        return;
      }

      try {
        const response = await fetchWithAuth("/api/auth/me", token);
        if (!response.ok) {
          clearStoredToken();
          if (mounted) setUser(null);
          return;
        }

        const body = (await response.json()) as { user: User };
        if (mounted) setUser(body.user);
      } catch (error) {
        console.error("[JWT Auth] Failed to restore session", error);
        clearStoredToken();
        if (mounted) setUser(null);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    void initialize();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (email: string, pass: string) => {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass }),
    });

    const body = await parseApiResponse<Partial<AuthResponse>>(response);

    if (!response.ok || !body.token || !body.user) {
      throw new Error(body.error || "Unable to sign in.");
    }

    setStoredToken(body.token);
    setUser(body.user);
    return body.user;
  };

  const signup = async (data: {
    name: string;
    email: string;
    password: string;
    isAdmin?: boolean;
  }) => {
    const response = await fetch(`${API_BASE}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        isAdmin: data.isAdmin || false,
      }),
    });

    const body = await parseApiResponse<Partial<AuthResponse>>(response);

    if (!response.ok || !body.token || !body.user) {
      throw new Error(body.error || "Unable to create account.");
    }

    setStoredToken(body.token);
    setUser(body.user);
  };

  const resetPassword = async (_email: string) => {
    throw new Error(
      "Password reset is not enabled in JWT mode yet. Contact admin support.",
    );
  };

  const logout = () => {
    clearStoredToken();
    setUser(null);
    fetch(`${API_BASE}/api/auth/logout`, { method: "POST" }).catch(
      () => undefined,
    );
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, resetPassword, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
