import { useState } from "react";

import { isValidEmail, isValidPassword } from "@/models/auth";
import { FormState } from "@/models/form";
import { authErrorMessage, signIn } from "@/services/auth-service";

export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formState, setFormState] = useState<FormState>({ status: "idle" });

  const submit = async () => {
    if (formState.status === "submitting") return;

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
      await signIn(email, password);
      setFormState({ status: "idle" });
    } catch (error) {
      setFormState({ status: "error", message: authErrorMessage(error) });
    }
  };

  return { email, password, setEmail, setPassword, formState, submit };
}
