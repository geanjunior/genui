import { Searchspace, typographyGenotypeSchema } from ".";

const buttonGenotypeSchema = [
  { type: Searchspace.Range, from: 0, to: 5 }, //border-width
  { type: Searchspace.Range, from: 0, to: 80 }, //border-radius
  { type: Searchspace.Range, from: 3, to: 60 }, //padding-top-bottom
  { type: Searchspace.Range, from: 3, to: 60 }, //padding-left-right
  { type: Searchspace.Range, from: 13, to: 50 }, //font-size
  { type: Searchspace.Range, from: 0, to: 9 }, //font-weight
  { type: Searchspace.Range, from: 0, to: typographyGenotypeSchema.length - 1 }, //font-family
];

export { buttonGenotypeSchema }