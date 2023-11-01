import { Searchspace } from "..";

const mountTextInputGenotypeSchema = () => [
  { type: Searchspace.Range, from: 1, to: 5 }, //rows
];

export { mountTextInputGenotypeSchema }