import { Searchspace, typographyGenotypeSchema } from "..";
import { colorPalettePhenotype } from "../..";

const colors = Object.keys(colorPalettePhenotype[0]);

const buttonGenotypeSchema = [
  { type: Searchspace.Range, from: 0, to: 2 }, //border-width
  { type: Searchspace.Range, from: 0, to: 30 }, //border-radius

  { type: Searchspace.Range, from: 5, to: 30 }, //padding-top-bottom
  { type: Searchspace.Range, from: 5, to: 30 }, //padding-left-right

  { type: Searchspace.Range, from: 13, to: 40 }, //font-size
  { type: Searchspace.Range, from: 0, to: 9 }, //font-weight
  { type: Searchspace.Range, from: 0, to: typographyGenotypeSchema.length - 1 }, //font-family

  { type: Searchspace.DistinctValues, name: "make-different", values: colors }, //color
  { type: Searchspace.Values, values: colors }, //border-color
  { type: Searchspace.DistinctValues, name: "make-different", values: colors }, //background-color
];

export { buttonGenotypeSchema }