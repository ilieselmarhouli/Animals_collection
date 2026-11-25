import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { AppUser } from "@/models/user";
import { auth } from "@/services/firebase";
function toAppUser(user: User): AppUser {
  return { uid: user.uid, email: user.email ?? "" };
}
export function subscribeToAuth(
  onChange: (user: AppUser | null) => void,
) {
  return onAuthStateChanged(auth, (user) =>
    onChange(user ? toAppUser(user) : null),
  );
}
export async function signUp(email: string, password: string) {
  await createUserWithEmailAndPassword(auth, email, password);
}
export async function signIn(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}
export async function signOut() {
  await firebaseSignOut(auth);
}
export function authErrorMessage(error: unknown): string {
  const code = error instanceof FirebaseError ? error.code : "";
  switch (code) {
    case "auth/invalid-email":
      return "Adresse e-mail invalide.";
    case "auth/invalid-credential":
      return "E-mail ou mot de passe incorrect.";
    case "auth/email-already-in-use":
      return "Un compte existe déjà avec cette adresse.";
    case "auth/weak-password":
      return "Mot de passe trop court : 6 caractères au moins.";
    default:
      return "Une erreur est survenue. Réessayez.";
  }
}
