import { DnaSequence, Phenotype } from "..";

interface GenColorPalettePhenotype extends Phenotype {
  primary: string,
  secondary: string,
  neutral: string
}

const colorPalettePhenotype: GenColorPalettePhenotype[] = [
  /* Sunny - A bright and cheerful palette that is perfect for a summery feel. */
  { primary: "#FFD700", secondary: "#29ABCA", neutral: "#FFFFFF" },
  // /* Oceanic - A calming and relaxing palette that is perfect for a beachy or nautical theme. */
  // { primary: "#007ACC", secondary: "#C5E1A5", neutral: "#FFFFFF" },
  // /* Sunset - A vibrant and energetic palette that is perfect for a party or a celebration. */
  // { primary: "#FF5722", secondary: "#E066FF", neutral: "#FFFFFF" },
  // /* Autumnal - A warm and earthy palette that is perfect for the fall season. */
  // { primary: "#E67E22", secondary: "#90EE90", neutral: "#FFFFFF" },
  // /* Wintery - A cool and crisp palette that is perfect for the winter season. */
  // { primary: "#1E90FF", secondary: "#D3D3D3", neutral: "#FFFFFF" },
  // /* Monochromatic - A simple and elegant palette that is perfect for a minimalist or modern design. */
  // { primary: "#333333", secondary: "#666666", neutral: "#FFFFFF" },
  // /* Pastel - A soft and gentle palette that is perfect for a calming or relaxing space. */
  // { primary: "#87CEFA", secondary: "#F0FFFF", neutral: "#FFFFFF" },
  // /* Neon - A bright and eye-catching palette that is perfect for a pop of color. */
  // { primary: "#FF00FF", secondary: "#00FFFF", neutral: "#FFFFFF" },
  // /* Earthy - A warm and natural palette that is perfect for a cozy or inviting space. */
  // { primary: "#7B68EE", secondary: "#BDB76B", neutral: "#FFFFFF" },
  // /* Cobalt - A cool and refreshing palette that is perfect for a modern or minimalist design. */
  // { primary: "#3498DB", secondary: "#A9D0F5", neutral: "#FFFFFF" },
  // /* Forest - A calming and natural palette that is perfect for a spa or wellness center. */
  // { primary: "#556B2F", secondary: "#728942", neutral: "#FFFFFF" },
  // /* Passion - A vibrant and energetic palette that is perfect for a party or a celebration. */
  // { primary: "#FF6A00", secondary: "#FFC300", neutral: "#FFFFFF" },
  // /* Emerald - A luxurious and sophisticated palette that is perfect for a high-end brand or product. */
  // { primary: "#1ABC9C", secondary: "#42A5F5", neutral: "#FFFFFF" },
  // /* Banana - A cheerful and playful palette that is perfect for a children's product or website. */
  // { primary: "#9ACD32", secondary: "#D4E157", neutral: "#FFFFFF" },
  // /* Lilac - A romantic and feminine palette that is perfect for a wedding or a beauty product. */
  // { primary: "#B39DDB", secondary: "#D8BFD8", neutral: "#FFFFFF" },
  // /* Ocean - A serene and calming palette that is perfect for a beach or spa theme. */
  // { primary: "#5F9EA0", secondary: "#87CEEB", neutral: "#FFFFFF" },
  // /* Peach - A warm and inviting palette that is perfect for a home decor or food brand. */
  // { primary: "#FFF176", secondary: "#FFE5B4", neutral: "#FFFFFF" },
  // /* Rust - A rustic and earthy palette that is perfect for a farmhouse or outdoor brand. */
  // { primary: "#8D6E63", secondary: "#BD978E", neutral: "#FFFFFF" }
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
