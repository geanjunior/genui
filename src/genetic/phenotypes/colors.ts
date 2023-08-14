import { DnaSequence } from "..";

const colorPalettePhenotype: string[][] = [
  ["#A7C5C5", "#DEE0D5", "#E2AC48", "#B96028", "#983C2D"],
  ["#00747C", "#00BBC9", "#CACACA", "#878787", "#202022"],
  ["#F2F2F2", "#D9D9D9", "#A6A6A6", "#8C8C8C", "#737373"],
  ["#001542", "#085454", "#7A7A7A", "#FFFFFF", "#FFB30D"],
  
  // UI/UX
  ["#A6785D", "#594032", "#D9A384", "#F2F2F2", "#0D0D0D"],
  ["#0742F2", "#527AF2", "#9BB8F2", "#BBCDF2", "#1A2126"],
  ["#F2BB13", "#F28D35", "#F2F2F2", "#BFBFBF", "#0D0D0D"],
  ["#04D9D9", "#5FD9D9", "#94F2F2", "#B6F2F2", "#F2F2F2"],
  ["#80838C", "#012619", "#BF9F78", "#F2F2F2", "#0D0D0D"],
  ["#140DD9", "#1FBF92", "#F2E49B", "#F27777", "#0D0D0D"],
  ["#18D935", "#15BF2F", "#2DA63F", "#D9D9D9", "#0D0D0D"],
  ["#4178BF", "#66B1F2", "#F0F1F2", "#BF877A", "#0D0D0D"],
  ["#152617", "#BFF205", "#84A60A", "#D7F205", "#0D0D0D"],
  ["#025928", "#9BBF9D", "#D8D9D7", "#CED9B8", "#0D0D0D"],
  ["#9794F2", "#B6B9F2", "#585859", "#8D95A6", "#F2F2F2"],
];

const parseToColorPalettePhenotype = (genotypes: number[][]) => {
  return genotypes[DnaSequence.ColorPalette].map(phenIndex => colorPalettePhenotype[phenIndex as number])[0];
}

export {
  colorPalettePhenotype,
  parseToColorPalettePhenotype
}
