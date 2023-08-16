import { Searchspace, getColorsRule } from "..";

const mountLayoutPaletteSchema = () => [
  { type: Searchspace.Range, from: 20, to: 100 }, //padding
  {
    name: "layout.background-color", type: Searchspace.ValuesFromRule,
    rule: getColorsRule,
  } //background-color
];

export {
  mountLayoutPaletteSchema
}