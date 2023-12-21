import { Searchspace, mountTypographyGenotypeSchema, getColorsRule, getContrastingColorsRule } from "..";

const mountInputGenotypeSchema = () => [
  { type: Searchspace.Range, from: 0, to: 2 }, //label 2
  { type: Searchspace.Range, from: 0, to: 2 }, //label-box { vertical-align }
  { type: Searchspace.Range, from: 5, to: 15 }, //label-box { padding-top, padding-bottom }

  { type: Searchspace.Range, from: 1, to: 4 }, //border-width
  { type: Searchspace.Range, from: 0, to: 30 }, //border-radius
  { type: Searchspace.Range, from: 5, to: 20 }, //padding-top-bottom
  { type: Searchspace.Range, from: 5, to: 20 }, //padding-left-right
  { type: Searchspace.Range, from: 10, to: 30 }, //font-size
  { type: Searchspace.Range, from: 0, to: 9 }, //font-weight
  { type: Searchspace.Range, from: 0, to: mountTypographyGenotypeSchema().length - 1 }, //font-family
  { type: Searchspace.Range, from: 5, to: 25 }, //line-height
  {
    name: "text-input.colors", type: Searchspace.DistinctValuesFromRule,
    rule: getColorsRule, exclude: ["text-input.background-color"]
  }, //color
  {
    type: Searchspace.ValuesFromRule,
    rule: getColorsRule
  }, //border-color
  {
    name: "text-input.background-color", type: Searchspace.DistinctValuesFromRule,
    rule: getColorsRule, distinctRule: getContrastingColorsRule, exclude: ["text-input.colors"]
  }, //background-color
];

export { mountInputGenotypeSchema }