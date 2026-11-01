import { useState } from "react";

import { isValidEmail } from "@/models/auth";
import { FormState } from "@/models/form";
import * as authService from "@/services/auth-service";

export function useResetPasswordForm() {
    const [email, setEmail] = useState("");
    const [formState, setFormState] = useState<FormState>({ status: "idle" });

    const submit = async () => {
        if (formState.status === "submitting") {
            return;
        }

        if (!isValidEmail(email)) {
            setFormState({ status: "error", message: "Adresse email invalide." });
            return;
        }

        setFormState({ status: "submitting" });

        try {
            await authService.sendPasswordReset(email);
            setFormState({ status: "success" });
        } catch (error) {
            let message = "Une erreur est survenue.";

            if (error instanceof Error) {
                message = error.message;
            }

            setFormState({ status: "error", message });
        }
    };

    return { email, setEmail, formState, submit };
}
