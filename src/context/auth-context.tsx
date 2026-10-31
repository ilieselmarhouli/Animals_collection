import { createContext, ReactNode, useState } from "react";

import { LoginUser, RegisterUser, UserProfile } from "@/models/auth";
import * as authService from "@/services/auth-service";

export type AuthContextValue = {
    user: UserProfile | null;
    isAuthenticated: boolean;
    login: (credentials: LoginUser) => Promise<void>;
    register: (input: RegisterUser) => Promise<void>;
    logout: () => Promise<void>;
    changeDisplayName: (displayName: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);

    const login = async (credentials: LoginUser) => {
        const profile = await authService.signIn(credentials);
        setUser(profile);
    };

    const register = async (input: RegisterUser) => {
        const profile = await authService.signUp(input);
        setUser(profile);
    };

    const logout = async () => {
        await authService.signOut();
        setUser(null);
    };

    const changeDisplayName = async (displayName: string) => {
        if (!user) {
            throw new Error("Aucun utilisateur connecté.");
        }
        const profile = await authService.updateDisplayName(user.uid, displayName);
        setUser(profile);
    };

    const isAuthenticated = user !== null;

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                register,
                logout,
                changeDisplayName,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
