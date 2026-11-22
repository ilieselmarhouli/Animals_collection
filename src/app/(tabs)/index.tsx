import { useAnimalFilters } from "@/hooks/use-animal-filters";
import { useAnimals } from "@/hooks/use-animals";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const { state, reload } = useAnimals();

  const { filters, setFilters, filteredAnimals } = useAnimalFilters(
    state.status === "success" ? state.data : []
  );

  if (state.status === "loading") {
    return <Text>Chargement...</Text>;
  }

  if (state.status === "error") {
    return (
      <View>
        <Text>{state.message}</Text>
        <Button title="Réessayer" onPress={() => void reload()} />
      </View>
    );
  }

  return (
    <View>
      <TextInput
        placeholder="Rechercher un animal"
        value={filters.name ?? ""}
        onChangeText={(name) => setFilters({ name })}
      />

      <Text>{filteredAnimals.length} animaux trouvés</Text>

      <Button title="Recharger" onPress={() => void reload()} />
    </View>
  );
}

