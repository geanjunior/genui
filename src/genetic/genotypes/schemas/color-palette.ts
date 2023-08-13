import { Searchspace } from "..";
import { colorPalettePhenotype } from "../..";

const colorPaletteSchema = [
  { type: Searchspace.Range, from: 0, to: colorPalettePhenotype.length - 1 }
];

export {
  colorPaletteSchema
}