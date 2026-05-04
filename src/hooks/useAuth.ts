import { useAuth as useAuthContext } from "@/src/lib/AuthContext";

export function useAuth() {
  return useAuthContext();
}
