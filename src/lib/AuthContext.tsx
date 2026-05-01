import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate checking session
    try {
      const saved = localStorage.getItem("nx_user");
      if (saved) setUser(JSON.parse(saved));
    } catch (e) {
      console.error("Auth session corrupted:", e);
      localStorage.removeItem("nx_user");
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    // Mock login logic
    await new Promise((r) => setTimeout(r, 1000));
    const mockUser: User = { id: "1", name: "Guest User", email, role: "user" };
    setUser(mockUser);
    localStorage.setItem("nx_user", JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signup = async (data: any) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const mockUser: User = { id: "2", name: data.name, email: data.email, role: "user" };
    setUser(mockUser);
    localStorage.setItem("nx_user", JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nx_user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
