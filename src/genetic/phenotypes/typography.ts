import { DnaSequence } from "..";

const typographyPhenotype = [
  "serif", "sans-serif", "monospace", "cursive", "fantasy",
  "Arial, Helvetica, sans-serif",
  "Times New Roman, Georgia, serif",
  "Courier New, Monaco, monospace",
  "Baskerville, Bodoni, Trajan, serif",
  "Brush Script, Copperplate, Zapfino, cursive"
];

const parseToTypographyPhenotype = (genotypes: (string|number)[][]) => {
  return genotypes[DnaSequence.Typography].map(phenIndex => typographyPhenotype[phenIndex as number]);
}

export { typographyPhenotype, parseToTypographyPhenotype }