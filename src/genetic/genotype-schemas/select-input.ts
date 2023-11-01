import { Searchspace } from "..";

const mountSelectInputGenotypeSchema = () => [
  { type: Searchspace.Range, from: 0, to: 1 }, //variation
];

export { mountSelectInputGenotypeSchema }