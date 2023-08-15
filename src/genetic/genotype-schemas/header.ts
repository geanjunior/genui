import { Searchspace, getColorsRule, mountTypographyGenotypeSchema } from ".."

const mountHeaderGenotypeSchema = () => [
  { type: Searchspace.Range, from: 0, to: 30 }, //margin-top
  { type: Searchspace.Range, from: 0, to: 30 }, //margin-bottom

  { type: Searchspace.Range, from: 30, to: 80 }, //font-size
  { type: Searchspace.Range, from: 0, to: 9 }, //font-weight
  { type: Searchspace.Range, from: 0, to: mountTypographyGenotypeSchema.length - 1 }, //font-family

  {
    type: Searchspace.DistinctValuesFromRule, rule: getColorsRule,
    name: "header.color", exclude: ["layout.background-color"]
  }, //color
]

export {
  mountHeaderGenotypeSchema
}