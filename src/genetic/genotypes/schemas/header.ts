import { Searchspace, typographyGenotypeSchema } from ".."
import { colorPalettePhenotype } from "../..";

const colors = Object.keys(colorPalettePhenotype[0]).map(k => parseInt(k)).filter(k => !isNaN(k));

const headerGenotypeSchema = [
  { type: Searchspace.Range, from: 0, to: 30 }, //margin-top
  { type: Searchspace.Range, from: 0, to: 30 }, //margin-bottom

  { type: Searchspace.Range, from: 30, to: 80 }, //font-size
  { type: Searchspace.Range, from: 0, to: 9 }, //font-weight
  { type: Searchspace.Range, from: 0, to: typographyGenotypeSchema.length - 1 }, //font-family

  { type: Searchspace.Values, values: colors }, //border-color
]

export {
  headerGenotypeSchema
}