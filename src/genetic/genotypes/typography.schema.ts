import { Searchspace } from ".";
import { typographyPhenotype } from "..";

const typographyGenotypeSchema = [
  { type: Searchspace.Values, values: [...Array(typographyPhenotype.length).keys()] },
  { type: Searchspace.Values, values: [...Array(typographyPhenotype.length).keys()] }
];

export {
  typographyGenotypeSchema
}