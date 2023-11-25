import { Searchspace, getColorsRule, getContrastingColorsRule, mountTypographyGenotypeSchema, textAlignPhenotype } from ".."

const mountHeaderGenotypeSchema = () => [
  { type: Searchspace.Range, from: 0, to: 30 }, //margin-top
  { type: Searchspace.Range, from: 0, to: 30 }, //margin-bottom

  { type: Searchspace.Range, from: 30, to: 80 }, //font-size
  { type: Searchspace.Range, from: 0, to: 9 }, //font-weight
  { type: Searchspace.Range, from: 0, to: mountTypographyGenotypeSchema().length - 1 }, //font-family
  { type: Searchspace.Range, from: 0, to: 20 }, //line-height
  { type: Searchspace.Range, from: 0, to: 2 }, //letter-spacing
  { type: Searchspace.Range, from: 0, to: 10 }, //word-spacing
  {
    type: Searchspace.Values,
    values: textAlignPhenotype.map((_, i) => i).filter(i => ![
      textAlignPhenotype.indexOf("right")
    ].includes(i))
  }, //text-align
  {
    name: "header.color", type: Searchspace.DistinctValuesFromRule,
    rule: getColorsRule, distinctRule: getContrastingColorsRule, exclude: ["layout.background-color"]
  }, //color
]

export {
  mountHeaderGenotypeSchema
}