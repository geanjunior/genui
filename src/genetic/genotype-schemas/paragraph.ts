import { Searchspace, getColorsRule, getContraingColorsRule, mountTypographyGenotypeSchema } from ".."

const mountParagraphGenotypeSchema = () => [
  { type: Searchspace.Range, from: 0, to: 30 }, //margin-top
  { type: Searchspace.Range, from: 0, to: 30 }, //margin-bottom

  { type: Searchspace.Range, from: 15, to: 30 }, //font-size
  { type: Searchspace.Range, from: 0, to: 5 }, //font-weight
  { type: Searchspace.Range, from: 0, to: mountTypographyGenotypeSchema().length - 1 }, //font-family
  { type: Searchspace.Range, from: 0, to: 40 }, //line-height
  { type: Searchspace.Range, from: 0, to: 2 }, //letter-spacing
  { type: Searchspace.Range, from: 0, to: 10 }, //word-spacing
  { type: Searchspace.Range, from: 0, to: 6 }, //text-align

  {
    name: "paragraph.color", type: Searchspace.DistinctValuesFromRule,
    rule: getColorsRule, distinctRule: getContraingColorsRule, exclude: ["layout.background-color"]
  }, //color
]

export {
  mountParagraphGenotypeSchema
}