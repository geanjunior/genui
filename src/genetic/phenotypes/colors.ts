import { DnaSequence } from "..";

// //TODO: https://palett.es/API/v1/palette?_=1

//======================================================================

const colorPalettePhenotype: string[][] = [
  // ["#A6785D", "#594032", "#D9A384", "#F2F2F2", "#0D0D0D"],
  // ["#0742F2", "#527AF2", "#9BB8F2", "#BBCDF2", "#1A2126"],
  // ["#F2BB13", "#F28D35", "#F2F2F2", "#BFBFBF", "#0D0D0D"],
  // ["#80838C", "#012619", "#BF9F78", "#F2F2F2", "#0D0D0D"],
  // ["#140DD9", "#1FBF92", "#F2E49B", "#F27777", "#0D0D0D"],
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

  //good design principles https://www.phind.com/search?cache=ihvp6avl6og5nj1s6q7iiheh
  ["#3C91E6", "#342E37", "#FA824C", "#A2D729", "#D8315B"], // Inspired by a sunset
  ["#2EC4B6", "#011627", "#FF9F1C", "#E71D36", "#FDFFFC"], // Inspired by a tropical beach
  ["#5C80BC", "#94A3A8", "#C6D8D3", "#F7F7FF", "#FFB140"], // Inspired by a winter day
  ["#FF6B6B", "#4ECDC4", "#1A535C", "#F7FFF7", "#FFD166"], // Inspired by a summer day
  ["#D00000", "#FFBA08", "#3F88C5", "#032B43", "#136F63"], // Inspired by a vibrant cityscape
  ["#08415C", "#CC2936", "#E3B505", "#3C91E6", "#3E92CC"], // Inspired by a quiet forest
  ["#F2D7EE", "#D3BCC0", "#A5668B", "#69306D", "#0E103D"], // Inspired by a blooming garden
  ["#FFBA08", "#FAA307", "#F48C06", "#E85D04", "#DC2F02"], // Monochromatic scheme inspired by a flame
  ["#003049", "#D62828", "#F77F00", "#FCBF49", "#EAE2B7"], // Complementary scheme inspired by a desert
  ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"], // Analogous scheme inspired by a fall landscape
  ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7"], // Soft pastels
  ["#FF6F61", "#FFB447", "#E0F8CF", "#5DD9C1", "#2A6A9E"], // Tropical sunset
  ["#2B2E4A", "#E84545", "#903749", "#53354A", "#233D4D"], // Dark berry tones
  ["#FFD460", "#FF8360", "#E8E288", "#7DCE82", "#3BCEAC"], // Bright and bold
  ["#3E92CC", "#526760", "#7E6C6C", "#C9ADA7", "#A3E7FC"], // Cool blues and warm neutrals
  ["#F25F5C", "#FFE066", "#247BA0", "#50514F", "#70C1B3"], // Vibrant and contrasting
  ["#1A1F33", "#69306D", "#A74482", "#F84AA7", "#FF3562"], // Dark to light gradient
  ["#F8B400", "#F3FFB9", "#94F8FF", "#4AB1F7", "#1C2B2D"], // Bright and cheerful
  ["#FFB6B9", "#FAE3D9", "#BBDED6", "#8AC4D0", "#1D2E58"], // Soft and soothing
  ["#E3E7D3", "#BCD8C1", "#D6DBB2", "#E7E5A5", "#E9EDDE"], // Earthy and natural
  ["#B83B5E", "#FF826A", "#FFB396", "#FFD9B5", "#FFE9E3"], // Warm gradients
  ["#4F345A", "#6C3F5B", "#FF6978", "#FFB1A6", "#FFCDB2"], // Deep purple to light pink
  ["#2D728F", "#3B8EA5", "#F5EE9E", "#F49E4C", "#AB3428"], // Ocean to desert
  ["#FFAEBC", "#A0E7E5", "#B4F8C8", "#FBE7C6", "#F67940"], // Pastel rainbow
  ["#002A32", "#004643", "#FF7477", "#FFB6C1", "#FFCCCB"], // Dark to light with a pop
  ["#3F7A89", "#AABD8C", "#E9C46A", "#EFB366", "#E76F51"], // Analogous and earthy
  ["#F72585", "#7209B7", "#4361EE", "#4CC9F0", "#4895EF"], // Bright and bold spectrum
  ["#1B998B", "#ED217C", "#2D3047", "#FFFD82", "#FF9B71"], // Contrasting and vibrant
  ["#2E1A47", "#053C5E", "#035397", "#F77F00", "#D62828"], // Deep blues and bright accents
  ["#006D77", "#83C5BE", "#EDF6F9", "#FFDDD2", "#E29578"], // Cool with a warm finish
  ["#FFD166", "#06D6A0", "#1B9AAA", "#EF476F", "#073B4C"], // Bright and playful
  ["#E63946", "#F1FAEE", "#A8DADC", "#457B9D", "#1D3557"], // Cool blues with a warm accent
  ["#D8A47F", "#AA4465", "#861657", "#660708", "#2D1E2F"], // Warm earth tones
  ["#F4D35E", "#EE964B", "#F95738", "#563E20", "#254441"], // Sunlit autumn leaves
  ["#FCFCFC", "#F7567C", "#FFCE5C", "#3FEEE6", "#5E2E86"], // Bright and contrasting
  ["#293462", "#216583", "#F76262", "#FAB85F", "#99D17B"], // Balanced spectrum
  ["#2B9348", "#55A630", "#80B918", "#AACC00", "#D4F70C"], // Shades of green
  ["#F72585", "#7209B7", "#3A0CA3", "#4361EE", "#4CC9F0"], // Vibrant spectrum
  ["#FFBA08", "#FAA307", "#F48C06", "#E85D04", "#DC2F02"], // Monochromatic scheme inspired by a flame
  ["#003049", "#D62828", "#F77F00", "#FCBF49", "#EAE2B7"], // Complementary scheme inspired by a desert
  ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"], // Analogous scheme inspired by a fall landscape
  ["#F72585", "#B5179E", "#7209B7", "#560BAD", "#480CA8"], // Shades of purple
  ["#7400B8", "#6930C3", "#5E60CE", "#5390D9", "#4EA8DE"], // Cool blues
  ["#25283D", "#8C1F40", "#CE8964", "#E2E2E2", "#89937C"], // Earthy and neutral
  ["#F94144", "#F3722C", "#F8961E", "#F9C74F", "#90BE6D"], // From warm to cool
  ["#FFA69E", "#FAF3DD", "#B8F2E6", "#AED9E0", "#5E6472"], // Soft and pastel
  ["#50514F", "#F25F5C", "#FFE066", "#247BA0", "#70C1B3"], // Vibrant and contrasting
  ["#D9ED92", "#B5E48C", "#99D98C", "#76C893", "#52B69A"], // Shades of green
  ["#FF165D", "#FF1654", "#FF3A20", "#FF4E00", "#FF6A00"], // Warm spectrum
  ["#5A189A", "#4D6CFA", "#28B5B5", "#2BAE66", "#6DCB8B"],  // Cool spectrum

  //more popular in Adobo Color's public gallery
  ["#1A1A1D", "#4E4E50", "#6F7072", "#BCBCBD", "#F7F7F7"], // Grayscale
  ["#5D737E", "#64B6AC", "#C0FDFB", "#D0FFFD", "#FCFFFD"], // Cool Blues
  ["#FFB997", "#F67E7D", "#843B62", "#0B032D", "#74546A"], // Dessert Sunset
  ["#F4D35E", "#EE964B", "#F95738", "#563E20", "#254441"], // Sunlit Autumn Leaves
  ["#5C0029", "#8A084B", "#CF3976", "#F76262", "#FFCDB2"], // Pinky Promise
  ["#D9ED92", "#B5E48C", "#99D98C", "#76C893", "#52B69A"], // Shades of Green
  ["#08415C", "#CC2936", "#E3B505", "#3C91E6", "#3E92CC"], // Inspired by a Quiet Forest
  ["#5A189A", "#4D6CFA", "#28B5B5", "#2BAE66", "#6DCB8B"], // Cool Spectrum
  ["#FFBA08", "#FAA307", "#F48C06", "#E85D04", "#DC2F02"], // Monochromatic Scheme Inspired by a Flame
  ["#F94144", "#F3722C", "#F8961E", "#F9C74F", "#90BE6D"]  // From Warm to Cool
];

const parseToColorPalettePhenotype = (genotypes: number[][]) => {
  return genotypes[DnaSequence.ColorPalette].map(phenIndex => colorPalettePhenotype[phenIndex as number])[0];
}

export {
  colorPalettePhenotype,
  parseToColorPalettePhenotype
}
