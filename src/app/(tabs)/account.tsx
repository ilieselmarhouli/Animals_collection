import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/services/auth-service";
export default function AccountScreen() {
  const { user } = useAuth();
  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Connecté en tant que</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Pressable onPress={signOut} style={styles.button}>
        <Text style={styles.buttonLabel}>Se déconnecter</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: { padding: 24, gap: 8 },
  label: { fontSize: 15, color: "#5A5F80" },
  email: { fontSize: 18, fontWeight: "700" },
  button: {
    marginTop: 16,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#C2410C",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonLabel: { color: "#C2410C", fontWeight: "700" },
});
