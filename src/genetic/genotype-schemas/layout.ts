import { Searchspace, getColorsRule } from "..";

const mountLayoutPaletteSchema = () => [
  { type: Searchspace.Range, from: 0, to: 100 }, //padding
  {
    type: Searchspace.ValuesFromRule, rule: getColorsRule,
    name: "layout.background-color"
  } //background-color
];

export {
  mountLayoutPaletteSchema
}