import { Searchspace, mountTypographyGenotypeSchema, getColorsRule } from "..";

const mountButtonGenotypeSchema = () => [
  { type: Searchspace.Range, from: 0, to: 4 }, //border-width
  { type: Searchspace.Range, from: 0, to: 30 }, //border-radius

  { type: Searchspace.Range, from: 5, to: 30 }, //padding-top-bottom
  { type: Searchspace.Range, from: 5, to: 30 }, //padding-left-right

  { type: Searchspace.Range, from: 13, to: 30 }, //font-size
  { type: Searchspace.Range, from: 0, to: 9 }, //font-weight
  { type: Searchspace.Range, from: 0, to: mountTypographyGenotypeSchema.length - 1 }, //font-family

  {
    type: Searchspace.DistinctValuesFromRule, rule: getColorsRule,
    name: "button.colors", exclude: ["button.background-color"]
  }, //color
  { type: Searchspace.ValuesFromRule, rule: getColorsRule }, //border-color
  {
    type: Searchspace.DistinctValuesFromRule, rule: getColorsRule,
    name: "button.background-color", exclude: ["button.colors", "layout.background-color"]
  }, //background-color
];

export { mountButtonGenotypeSchema }