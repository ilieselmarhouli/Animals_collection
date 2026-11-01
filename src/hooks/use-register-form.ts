import { useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import { isValidEmail, isValidPassword } from "@/models/auth";
import { FormState } from "@/models/form";

export function useRegisterForm() {
    const { register } = useAuth();
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formState, setFormState] = useState<FormState>({ status: "idle" });

    const submit = async () => {
        if (formState.status === "submitting") {
            return;
        }

        if (displayName.trim() === "") {
            setFormState({ status: "error", message: "Le nom est obligatoire." });
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
            await register({ displayName, email, password });
            setFormState({ status: "idle" });
        } catch (error) {
            let message = "Une erreur est survenue.";

            if (error instanceof Error) {
                message = error.message;
            }

            setFormState({ status: "error", message });
        }
    };

    return {
        displayName,
        email,
        password,
        setDisplayName,
        setEmail,
        setPassword,
        formState,
        submit,
    };
}
