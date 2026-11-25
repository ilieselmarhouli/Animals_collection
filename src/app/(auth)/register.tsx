import { useRouter } from "expo-router";
import { Button } from "react-native-paper";

import { AuthLayout } from "@/components/auth-layout";
import { RegisterForm } from "@/components/register-form";
import { useRegisterForm } from "@/hooks/use-register-form";

export default function RegisterScreen() {
  const router = useRouter();
  const form = useRegisterForm();

  return (
    <AuthLayout
      title="Créer un compte"
      footer={
        <Button
          mode="text"
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/login")
          }
        >
          Déjà un compte ? Se connecter
        </Button>
      }
    >
      <RegisterForm
        displayName={form.displayName}
        email={form.email}
        password={form.password}
        formState={form.formState}
        onChangeDisplayName={form.setDisplayName}
        onChangeEmail={form.setEmail}
        onChangePassword={form.setPassword}
        onSubmit={form.submit}
      />
    </AuthLayout>
  );
}
