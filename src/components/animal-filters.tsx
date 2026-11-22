import { StyleSheet, TextInput, View } from "react-native";
import type { AnimalsFilter } from "@/models/animals";

type AnimalFiltersProps = {
  filters: AnimalsFilter;
  onFiltersChange: (filters: AnimalsFilter) => void;
};

export function AnimalFilters({
  filters,
  onFiltersChange,
}: AnimalFiltersProps) {
  return (
    <View style={styles.container}>
      <TextInput
        accessibilityLabel="Rechercher un animal"
        placeholder="Rechercher un animal"
        value={filters.name ?? ""}
        onChangeText={(name) =>
          onFiltersChange({ ...filters, name })
        }
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 12,
    color: "#111",
    backgroundColor: "#fff",
  },
});