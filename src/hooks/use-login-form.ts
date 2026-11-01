import { useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import { isValidEmail, isValidPassword } from "@/models/auth";
import { FormState } from "@/models/form";

export function useLoginForm() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formState, setFormState] = useState<FormState>({ status: "idle" });

    const submit = async () => {
        if (formState.status === "submitting") {
            return;
        }

        if (!isValidEmail(email)) {
            setFormState({ status: "error", message: "Adresse email invalide." });
            return;
        }

        if (!isValidPassword(password)) {
            setFormState({
                status: "error",
                message: "Le mot de passe doit contenir au moins 6 caractères.",
            });
            return;
        }

        setFormState({ status: "submitting" });

        try {
            await login({ email, password });
            setFormState({ status: "idle" });
        } catch (error) {
            setFormState({
                status: "error",
                message:
                    error instanceof Error ? error.message : "Une erreur est survenue.",
            });
        }
    };

    return { email, password, setEmail, setPassword, formState, submit };
}
