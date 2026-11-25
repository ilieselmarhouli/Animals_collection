import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";

import { FormState } from "@/models/form";

type RegisterFormProps = {
  displayName: string;
  email: string;
  password: string;
  formState: FormState;
  onChangeDisplayName: (displayName: string) => void;
  onChangeEmail: (email: string) => void;
  onChangePassword: (password: string) => void;
  onSubmit: () => void;
};

export function RegisterForm({
  displayName,
  email,
  password,
  formState,
  onChangeDisplayName,
  onChangeEmail,
  onChangePassword,
  onSubmit,
}: RegisterFormProps) {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const submitting = formState.status === "submitting";

  return (
    <View style={styles.form}>
      <TextInput
        mode="outlined"
        label="Nom affiché"
        value={displayName}
        onChangeText={onChangeDisplayName}
        disabled={submitting}
        autoComplete={"name"}
      />

      <TextInput
        mode="outlined"
        label="Adresse email"
        value={email}
        onChangeText={onChangeEmail}
        keyboardType="email-address"
        autoComplete="email"
      />

      <View>
        <TextInput
          mode="outlined"
          label="Mot de passe"
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry={passwordHidden}
          autoComplete="new-password"
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
        <HelperText type="info">7 caractères minimum</HelperText>
      </View>

      <HelperText type="error" visible={formState.status === "error"}>
        {formState.status === "error" ? formState.message : ""}
      </HelperText>

      <Button
        mode="contained"
        onPress={onSubmit}
        loading={submitting}
      >
        Créer mon compte
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: 12 },
});
