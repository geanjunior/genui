import { DnaSequence, Phenotype } from "..";

interface GenColorPalettePhenotype extends Phenotype {
  primary: string,
  secondary: string,
  tertiary: string,
  quaternary: string,
  quintennary: string
}

const colorPalettePhenotype: GenColorPalettePhenotype[] = [
  { primary: "#A7C5C5", secondary: "#DEE0D5", tertiary: "#E2AC48", quaternary: "#B96028", quintennary: "#983C2D" },
  { primary: "#00747C", secondary: "#00BBC9", tertiary: "#CACACA", quaternary: "#878787", quintennary: "#202022" },
  { primary: "#F2F2F2", secondary: "#D9D9D9", tertiary: "#A6A6A6", quaternary: "#8C8C8C", quintennary: "#737373" },
  { primary: "#001542", secondary: "#085454", tertiary: "#7A7A7A", quaternary: "#FFFFFF", quintennary: "#FFB30D" },
  
  // UI/UX
  { primary: "#A6785D", secondary: "#594032", tertiary: "#D9A384", quaternary: "#F2F2F2", quintennary: "#0D0D0D" },
  { primary: "#0742F2", secondary: "#527AF2", tertiary: "#9BB8F2", quaternary: "#BBCDF2", quintennary: "#1A2126" },
  { primary: "#F2BB13", secondary: "#F28D35", tertiary: "#F2F2F2", quaternary: "#BFBFBF", quintennary: "#0D0D0D" },
  { primary: "#04D9D9", secondary: "#5FD9D9", tertiary: "#94F2F2", quaternary: "#B6F2F2", quintennary: "#F2F2F2" },
  { primary: "#80838C", secondary: "#012619", tertiary: "#BF9F78", quaternary: "#F2F2F2", quintennary: "#0D0D0D" },
  { primary: "#140DD9", secondary: "#1FBF92", tertiary: "#F2E49B", quaternary: "#F27777", quintennary: "#0D0D0D" },
  { primary: "#18D935", secondary: "#15BF2F", tertiary: "#2DA63F", quaternary: "#D9D9D9", quintennary: "#0D0D0D" },
  { primary: "#4178BF", secondary: "#66B1F2", tertiary: "#F0F1F2", quaternary: "#BF877A", quintennary: "#0D0D0D" },
  { primary: "#152617", secondary: "#BFF205", tertiary: "#84A60A", quaternary: "#D7F205", quintennary: "#0D0D0D" },
  { primary: "#025928", secondary: "#9BBF9D", tertiary: "#D8D9D7", quaternary: "#CED9B8", quintennary: "#0D0D0D" },
  { primary: "#9794F2", secondary: "#B6B9F2", tertiary: "#585859", quaternary: "#8D95A6", quintennary: "#F2F2F2" },
];

const parseToColorPalettePhenotype = (genotypes: (string|number)[][]) => {
  return genotypes[DnaSequence.ColorPalette].map(phenIndex => colorPalettePhenotype[phenIndex as number])[0];
}

export type {
  GenColorPalettePhenotype
}

export {
  colorPalettePhenotype,
  parseToColorPalettePhenotype
}
