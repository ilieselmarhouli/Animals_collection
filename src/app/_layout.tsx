import { Stack } from "expo-router";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

import { AuthProvider } from "@/context/auth-context";
import { useAuth } from "@/hooks/use-auth";

const theme = {
  ...MD3LightTheme,
  colors: { ...MD3LightTheme.colors, primary: "#000000" },
};

function RootNavigator() {
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "compte" }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </PaperProvider>
  );
}
