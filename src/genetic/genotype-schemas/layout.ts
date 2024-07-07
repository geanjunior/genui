import { Searchspace, getColorsRule, textAlignPhenotype } from "..";

const mountLayoutSchema = () => [
  { type: Searchspace.Range, from: 0, to: 50 }, //padding-top-bottom
  { type: Searchspace.Range, from: 0, to: 400 }, //padding-left-right
  { type: Searchspace.Range, from: 0, to: textAlignPhenotype.length - 1 }, //text-align
  {
    name: "layout.background-color",
    type: Searchspace.ValuesFromRule,
    rule: getColorsRule,
  } //background-color
];

export {
  mountLayoutSchema
}