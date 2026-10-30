export type LoginUser = {
    email: string;
    password: string;
};

export type RegisterUser = {
    displayName: string;
    email: string;
    password: string;
};

export type UserProfile = {
    uid: string;
    email: string;
    displayName: string;
    createdAt: number;
    photoUrl?: string;
};

const MIN_PASSWORD_LENGTH = 6;

export function isValidEmail(email: string): boolean {
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return regex.test(email);
}

export function isValidPassword(password: string): boolean {
    return password.length >= MIN_PASSWORD_LENGTH;
}
