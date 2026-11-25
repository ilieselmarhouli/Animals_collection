import { createContext, ReactNode, useEffect, useState } from "react";
import { AppUser } from "@/models/user";
import { subscribeToAuth } from "@/services/auth-service";

export type AuthContextValue = {
  user: AppUser | null;
  initializing: boolean;
  isAuthenticated: boolean
};
export const AuthContext = createContext<AuthContextValue | null>(
  null,
);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    return subscribeToAuth((current) => {
      setUser(current);
      setInitializing(false);
    });
  }, []);
  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, initializing, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
