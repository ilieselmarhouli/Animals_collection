import { Animals , AnimalsFilter} from "@/models/animals";

const SITE_URL = "https://extinct-api.herokuapp.com/api/v1/animal/804";

type AnimalsResponse = {
    binomialName: string;
    commonName: string;
    location: string;
    wikiLink: string;
    lastRecord: string;
    imageSrc: string;
    shortDesc: string;
};

function toAnimal(response: AnimalsResponse): Animals {
    return {
        binomialName: response.binomialName,
        commonName: response.commonName,
        location: response.location,
        wikiLink: response.wikiLink,
        lastRecord: response.lastRecord,
        imageSrc: response.imageSrc,
        shortDesc: response.shortDesc
    };
}

export async function fetchAnimals(): Promise<Animals[]> {
  const response = await fetch(SITE_URL);
  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`);
  }
  const body: { data: AnimalsResponse[] } = await response.json();
  return body.data.map(toAnimal);
}
 
