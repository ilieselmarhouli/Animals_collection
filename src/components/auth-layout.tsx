import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type AuthLayoutProps = {
  title: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthLayout({ title, children, footer }: AuthLayoutProps) {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text variant="headlineMedium" style={styles.title}>
          {title}
        </Text>
        {children}
      </View>
      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F2F3F9",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    gap: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  title: { fontWeight: "800" },
  footer: { alignItems: "center", marginTop: 12 },
});
