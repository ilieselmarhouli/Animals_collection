import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

type AnimalsStatusProps =
  | { status: "loading" }
  | {
      status: "error";
      message: string;
      onRetry: () => void;
    };

export function AnimalsStatus(props: AnimalsStatusProps) {
  return (
    <View style={styles.container}>
      {props.status === "loading" ? (
        <>
          <ActivityIndicator size="large" />
          <Text>Chargement des animaux...</Text>
        </>
      ) : (
        <>
          <Text>{props.message}</Text>
          <Button title="Réessayer" onPress={props.onRetry} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
});