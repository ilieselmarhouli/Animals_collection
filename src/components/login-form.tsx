import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";

import { FormState } from "@/models/form";

type LoginFormProps = {
  email: string;
  password: string;
  formState: FormState;
  onChangeEmail: (email: string) => void;
  onChangePassword: (password: string) => void;
  onSubmit: () => void;
};

export function LoginForm({
  email,
  password,
  formState,
  onChangeEmail,
  onChangePassword,
  onSubmit,
}: LoginFormProps) {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const submitting = formState.status === "submitting";

  return (
    <View style={styles.form}>
      <TextInput
        mode="outlined"
        label="Adresse email"
        value={email}
        onChangeText={onChangeEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        disabled={submitting}
      />

      <TextInput
        mode="outlined"
        label="Mot de passe"
        value={password}
        onChangeText={onChangePassword}
        secureTextEntry={passwordHidden}
        autoCapitalize="none"
        autoComplete="current-password"
        onSubmitEditing={onSubmit}
        disabled={submitting}
        right={
          <TextInput.Icon
            icon={passwordHidden ? "eye" : "eye-off"}
            onPress={() => setPasswordHidden((hidden) => !hidden)}
            accessibilityLabel={
              passwordHidden
                ? "Afficher le mot de passe"
                : "Masquer le mot de passe"
            }
          />
        }
      />

      <HelperText type="error" visible={formState.status === "error"}>
        {formState.status === "error" ? formState.message : ""}
      </HelperText>

      <Button
        mode="contained"
        onPress={onSubmit}
        loading={submitting}
        disabled={submitting}
      >
        Se connecter
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: 12 },
});
