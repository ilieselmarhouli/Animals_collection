import { useRouter } from "expo-router";
import { Button } from "react-native-paper";

import { AuthLayout } from "@/components/auth-layout";
import { LoginForm } from "@/components/login-form";
import { useLoginForm } from "@/hooks/use-login-form";

export default function LoginScreen() {
  const router = useRouter();
  const { email, password, setEmail, setPassword, formState, submit } =
    useLoginForm();

  return (
    <AuthLayout
      title="Connexion"
      footer={
        <Button
          mode="text"
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/register")
          }
        >
          Pas encore de compte ? Créer un compte
        </Button>
      }
    >
      <LoginForm
        email={email}
        password={password}
        formState={formState}
        onChangeEmail={setEmail}
        onChangePassword={setPassword}
        onSubmit={submit}
      />
    </AuthLayout>
  );
}
