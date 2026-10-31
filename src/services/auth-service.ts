import { LoginUser, RegisterUser, UserProfile } from "@/models/auth";
//Before firebase tutorial
const test_user: UserProfile = {
    uid: "u1",
    email: "alice@example.com",
    displayName: "Alice Martin",
    createdAt: 1735689600000,
};

const test_password = "alice123";

export async function signIn(credentials: LoginUser): Promise<UserProfile> {
    const email = credentials.email.trim().toLowerCase();

    if (email !== test_user.email || credentials.password !== test_password) {
        throw new Error("Email ou mot de passe incorrect.");
    }

    return test_user;
}

export async function signUp(input: RegisterUser): Promise<UserProfile> {
    return {
        uid: `u${Date.now()}`,
        email: input.email.trim().toLowerCase(),
        displayName: input.displayName.trim(),
        createdAt: Date.now(),
    };
}

export async function signOut(): Promise<void> {}

export async function sendPasswordReset(email: string): Promise<void> {}

export async function updateDisplayName(
    uid: string,
    displayName: string,
): Promise<UserProfile> {
    return { ...test_user, displayName: displayName.trim() };
}
