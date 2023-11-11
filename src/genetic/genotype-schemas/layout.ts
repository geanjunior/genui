import { Searchspace, getColorsRule, textAlignPhenotype } from "..";

const mountLayoutSchema = () => [
  { type: Searchspace.Range, from: 0, to: 100 }, //padding-top-bottom
  { type: Searchspace.Range, from: 0, to: 500 }, //padding-left-right
  { type: Searchspace.Values, values: textAlignPhenotype.map((_, i) => i) }, //text-align
  {
    name: "layout.background-color", type: Searchspace.ValuesFromRule,
    rule: getColorsRule,
  } //background-color
];

export {
  mountLayoutSchema
}