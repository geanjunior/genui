import { DnaSequence } from "..";

//TODO: https://palett.es/API/v1/palette?_=1

const colorPalettePhenotype: string[][] = [
  ["#ed1c16", "#ffffff"],
  ["#f65a5b", "#204056"],
  ["#d2ea32", "#016773"],
  ["#000000", "#ffffff"],
  ["#0d3b66", "#faf0ca"],
  ["#9bafd9", "#103783"],
  ["#95f9c3", "#0b3866"],
  ["#00272b", "#e0ff4f"],
  ["#e7ecef", "#274c77"],
  ["#102542", "#f87060"],
  ["#ffd800", "#7902aa"],
  ["#dad2d8", "#143642"],

  ["#fedf00", "#1e1e1e", "#a7a8aa"],
  ["#4cc2c4", "#f54785", "#343434"],
  ["#ba0c2f", "#ffcd00", "#c9c9c9"],
  ["#3399ff", "#222222", "#eeeeee"],
  ["#283044", "#78a1bb", "#ebf5ee"],
  ["#3d348b", "#7678ed", "#f7b801"],
  ["#160c28", "#efcb68", "#e1efe6"],
  ["#2c6e49", "#4c956c", "#fefee3"],
  ["#6699cc", "#fff275", "#ff8c42"],
  ["#06aed5", "#086788", "#f0c808"],
  ["#001524", "#15616d", "#ffecd1"],
  ["#c1c1c1", "#2c4251", "#d16666"],
  ["#3d5a80", "#98c1d9", "#e0fbfc"],
  ["#262626", "#acbfa4", "#e2e8ce"],
  ["#ada8b6", "#ffeedb", "#4c3b4d"],
  ["#485696", "#e7e7e7", "#f9c784"],
  ["#08415c", "#cc2936", "#bcc6cc"],

  ["#eb0a1e", "#ffffff", "#000000", "#58595b"],

  // UI/UX
  // ["#A6785D", "#594032", "#D9A384", "#F2F2F2", "#0D0D0D"],
  // ["#0742F2", "#527AF2", "#9BB8F2", "#BBCDF2", "#1A2126"],
  // ["#F2BB13", "#F28D35", "#F2F2F2", "#BFBFBF", "#0D0D0D"],
  // ["#80838C", "#012619", "#BF9F78", "#F2F2F2", "#0D0D0D"],
  ["#140DD9", "#1FBF92", "#F2E49B", "#F27777", "#0D0D0D"],
  // ["#18D935", "#15BF2F", "#2DA63F", "#D9D9D9", "#0D0D0D"],
  // ["#4178BF", "#66B1F2", "#F0F1F2", "#BF877A", "#0D0D0D"],
  // ["#152617", "#BFF205", "#84A60A", "#D7F205", "#0D0D0D"],
  // ["#025928", "#9BBF9D", "#D8D9D7", "#CED9B8", "#0D0D0D"],
  // ["#9794F2", "#B6B9F2", "#585859", "#8D95A6", "#F2F2F2"],
  // ["#f48024", "#222426", "#bcbbbb", "#e1ecf4", "#0a95ff"],

  // ["#469597", "#5BA199", "#BBC6C8", "#E5E3E4", "#DDBEAA"],
  // ["#212517", "#374709", "#759242", "#DED3A6", "#F2F2EF"],
  // ["#090c13", "#384a58", "#2d6d7a", "#e6eef0", "#998973"],
  // ["#BB35AE", "#E99FF4", "#EDE7F8", "#F5BB2C", "#D2B4AA"],

  // ["#001219", "#005F73", "#0A9396", "#94D2BD", "#E9D8A6", "#EE9B00", "#CA6702", "#BB3E03", "#AE2012", "#9B2226"],
  // ["#0B090A", "#161A1D", "#660708", "#A4161A", "#BA181B", "#E5383B", "#B1A7A6", "#D3D3D3", "#F5F3F4", "#FFFFFF"],
];

const parseToColorPalettePhenotype = (genotypes: number[][]) => {
  return genotypes[DnaSequence.ColorPalette].map(phenIndex => colorPalettePhenotype[phenIndex as number])[0];
}

export {
  colorPalettePhenotype,
  parseToColorPalettePhenotype
}
