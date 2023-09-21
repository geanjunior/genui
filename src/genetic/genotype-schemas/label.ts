import { Searchspace, getColorsRule, getContrastingColorsRule, mountTypographyGenotypeSchema, textAlignPhenotype } from ".."

const mountLabelGenotypeSchema = () => [
  { type: Searchspace.Range, from: 11, to: 30 }, //font-size
  { type: Searchspace.Range, from: 0, to: 4 }, //font-weight
  { type: Searchspace.Range, from: 0, to: mountTypographyGenotypeSchema().length - 1 }, //font-family
  { type: Searchspace.Range, from: 0, to: 2 }, //letter-spacing
  { type: Searchspace.Range, from: 0, to: 10 }, //word-spacing
  {
    type: Searchspace.Values,
    values: textAlignPhenotype.map((_, i) => i).filter(i => ![
      textAlignPhenotype.indexOf("end"),
      textAlignPhenotype.indexOf("right")
    ].includes(i))
  }, //text-align
  {
    name: "label.color", type: Searchspace.DistinctValuesFromRule,
    rule: getColorsRule, distinctRule: getContrastingColorsRule, exclude: ["layout.background-color"]
  }, //color
]

export {
  mountLabelGenotypeSchema
}