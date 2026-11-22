export type Animals = {
    binomialName: string;
    commonName: string;
    location: string;
    wikiLink: string;
    lastRecord: string;
    imageSrc: string;
    shortDesc: string;
};
export type AnimalsFilter = {
    name?: string;
};

export function matchesFilters( 
  animal: Animals,
  filters: AnimalsFilter,
 ): boolean {
  const search = filters.name?.trim().toLowerCase();
  const matchesName =
    !search || animal.commonName.toLowerCase().includes(search) || animal.binomialName.toLowerCase().includes(search);
  return matchesName;
}