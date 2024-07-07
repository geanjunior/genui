import { Searchspace, typographyPhenotype } from "..";

const mountTypographyGenotypeSchema = () => [
  { type: Searchspace.Range, from: 0, to: typographyPhenotype.length - 1 },
  { type: Searchspace.Range, from: 0, to: typographyPhenotype.length - 1 }
];

export {
  mountTypographyGenotypeSchema
}