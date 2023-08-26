import { Phenotype } from "..";

const textAlignPhenotype = ["start", "end", "left", "right", "center", "justify", "match-parent"] as const;

interface TextBasedPhenotype extends Phenotype {
  marginTop?: string,
  marginBottom?: string,
  fontSize?: string,
  fontWeight?: number,
  fontFamily?: string,
  letterSpacing?: string,
  wordSpacing?: string,
  textAlign?: typeof textAlignPhenotype[number]
  color: string,
}

export type { TextBasedPhenotype }

export { textAlignPhenotype }