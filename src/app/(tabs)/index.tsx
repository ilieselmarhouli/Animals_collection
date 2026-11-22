import { AnimalCard } from "@/components/animal-card";
import { AnimalFilters } from "@/components/animal-filters";
import { AnimalsStatus } from "@/components/animals-status";
import { useAnimalFilters } from "@/hooks/use-animal-filters";
import { useAnimals } from "@/hooks/use-animals";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

export default function Index() {
  const { width } = useWindowDimensions();
  const { state, reload } = useAnimals();

  const { filters, setFilters, filteredAnimals } = useAnimalFilters(
    state.status === "success" ? state.data : []
  );

  const numColumns = width >= 1100 ? 3 : width >= 768 ? 2 : 1;

  if (state.status === "loading") {
    return <AnimalsStatus status="loading" />;
  }

  if (state.status === "error") {
    return (
      <AnimalsStatus
        status="error"
        message={state.message}
        onRetry={() => void reload()}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.catalog}>
        <Text style={styles.title}>Les animaux disparus</Text>

        <AnimalFilters
          filters={filters}
          onFiltersChange={setFilters}
        />

        <FlatList
          key={numColumns}
          data={filteredAnimals}
          numColumns={numColumns}
          keyExtractor={(item) => item.binomialName}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View
              style={[
                styles.cardContainer,
                { width: `${100 / numColumns}%` },
              ]}
            >
              <AnimalCard animal={item} />
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>
              Aucun animal ne correspond à votre recherche.
            </Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  catalog: {
    flex: 1,
    width: "100%",
    maxWidth: 1200,
    alignSelf: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  toolbar: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  count: {
    color: "#444",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  cardContainer: {
    padding: 8,
  },
  emptyMessage: {
    padding: 24,
    textAlign: "center",
    color: "#555",
  },
});