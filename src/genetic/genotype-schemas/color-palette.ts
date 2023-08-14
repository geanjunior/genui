import { Searchspace, colorPalettePhenotype } from "..";

const mountColorPaletteSchema = () => [
  { type: Searchspace.Range, from: 0, to: colorPalettePhenotype.length - 1 }
];

export {
  mountColorPaletteSchema
}