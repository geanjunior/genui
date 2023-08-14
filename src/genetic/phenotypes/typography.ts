import { DnaSequence } from "..";

const typographyPhenotype = [
  //web-safe
  "serif", "sans-serif", "monospace", "cursive", "fantasy",

  "Arial, Helvetica, sans-serif",
  "Verdana, Tahoma, sans-serif",
  "Tahoma, Verdana, sans-serif",
  "Trebuchet, Gill Sans, sans-serif",
  "Gill Sans, Trebuchet, sans-serif",
  "Arial Black, Impact, sans-serif",
  "Helvetica, Arial, sans-serif",
  
  "Times New Roman, Georgia, serif",
  "Georgia, Times New Roman, serif",
  "Palatino, Baskerville, serif",
  "Baskerville, Palatino, serif",
  "Bodoni, Trajan, serif",
  "Trajan, Bodoni, serif",
  
  "Courier New, Monaco, monospace",
  "Monaco, Courier New, monospace",
  "Andalé Mono, Lucida Console, monospace",
  "Lucida Console, Andalé Mono, monospace",
  
  "Brush Script, Copperplate, Zapfino, cursive",
  "Copperplate, Brush Script, Zapfino, cursive",
  "Zapfino, Copperplate, Brush Script, cursive",
  "Bradley Hand, Comic Sans, cursive",
  "Comic Sans, Bradley Hand, cursive",

  "Luminari, cursive",
];

const parseToTypographyPhenotype = (genotypes: (string|number)[][]) => {
  return genotypes[DnaSequence.Typography].map(phenIndex => typographyPhenotype[phenIndex as number]);
}

export { typographyPhenotype, parseToTypographyPhenotype }