import { Searchspace, typographyPhenotype } from "..";

const mountTypographyGenotypeSchema = () => [
  { type: Searchspace.Values, values: [...Array(typographyPhenotype.length).keys()] },
  { type: Searchspace.Values, values: [...Array(typographyPhenotype.length).keys()] }
];

export {
  mountTypographyGenotypeSchema
}