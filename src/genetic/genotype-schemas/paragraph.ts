import { Searchspace, getColorsRule, getContrastingColorsRule, mountTypographyGenotypeSchema, textAlignPhenotype } from ".."

const mountParagraphGenotypeSchema = () => [
  { type: Searchspace.Range, from: 0, to: 30 }, //margin-top
  { type: Searchspace.Range, from: 0, to: 30 }, //margin-bottom

  { type: Searchspace.Range, from: 15, to: 30 }, //font-size
  { type: Searchspace.Range, from: 0, to: 4 }, //font-weight
  { type: Searchspace.Range, from: 0, to: mountTypographyGenotypeSchema().length - 1 }, //font-family
  { type: Searchspace.Range, from: 0, to: 20 }, //line-height
  { type: Searchspace.Range, from: 0, to: 2 }, //letter-spacing
  { type: Searchspace.Range, from: 0, to: 10 }, //word-spacing
  { type: Searchspace.Values, values: [0] }, //text-indent
  {
    type: Searchspace.Values,
    values: textAlignPhenotype.map((_, i) => i).filter(i => ![
      textAlignPhenotype.indexOf("end"),
      textAlignPhenotype.indexOf("right")
    ].includes(i))
  }, //text-align
  {
    name: "paragraph.color", type: Searchspace.DistinctValuesFromRule,
    rule: getColorsRule, distinctRule: getContrastingColorsRule, exclude: ["layout.background-color"]
  }, //color
]

export {
  mountParagraphGenotypeSchema
}