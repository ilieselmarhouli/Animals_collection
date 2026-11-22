import { useState } from "react";
import {
  matchesFilters,
  type Animals,
  type AnimalsFilter,
} from "@/models/animals";

export function useAnimalFilters(items: Animals[]) {
  const [filters, setFilters] = useState<AnimalsFilter>({
    name: "",
  });

  const filteredAnimals = items.filter((animal) =>
    matchesFilters(animal, filters)
  );

  return { filters, setFilters, filteredAnimals };
}