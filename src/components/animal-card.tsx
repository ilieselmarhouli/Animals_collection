import { Image, StyleSheet, Text, View } from "react-native";
import type { Animals } from "@/models/animals";
import { useState } from "react";

type AnimalCardProps = {
  animal: Animals;
};

export function AnimalCard({ animal }: AnimalCardProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);

    const hasImage =
    animal.imageSrc !== "" &&
    animal.imageSrc !== "false" &&
    failedImageUrl !== animal.imageSrc;

  return (
    <View style={styles.card}>
      {hasImage ? (
        <Image
          source={{ uri: animal.imageSrc }}
          style={styles.image}
          accessibilityLabel={animal.commonName}
          onError={() => setFailedImageUrl(animal.imageSrc)}
        />
      ) : (
        <View style={styles.placeholder}>
            <Text>Image indisponible</Text>
         </View>
      )}

      <View style={styles.content}>
        <Text style={styles.name}>{animal.commonName}</Text>

        <Text style={styles.scientificName}>
          {animal.binomialName}
        </Text>

        <Text>{animal.location}</Text>
        <Text>Dernière observation : {animal.lastRecord}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
    gap: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scientificName: {
    fontStyle: "italic",
    color: "#555",
  },
  placeholder: {
  height: 180,
  width: "100%",
  backgroundColor: "#eee",
  alignItems: "center",
  justifyContent: "center",
},
});