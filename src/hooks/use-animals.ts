import { useCallback, useEffect, useState } from "react";
import type { Animals } from "@/models/animals";
import { fetchAnimals } from "@/services/animals-service";

type AnimalsState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: Animals[] };

export function useAnimals() {
  const [state, setState] = useState<AnimalsState>({
    status: "loading",
  });

  const reload = useCallback(async () => {
    setState({ status: "loading" });

    try {
      const animals = await fetchAnimals();
      setState({ status: "success", data: animals });
    } catch {
      setState({
        status: "error",
        message: "Impossible de récupérer les animaux.",
      });
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { state, reload };
}