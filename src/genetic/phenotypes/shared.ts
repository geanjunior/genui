import { Phenotype } from "..";
import type { Property } from 'csstype';

const textAlignPhenotype = ["start", "end", "left", "right", "center", "justify", "match-parent"] as const;

interface TextBasedPhenotype extends Phenotype {
  marginTop?: string,
  marginBottom?: string,
  fontSize?: string,
  fontWeight?: number,
  fontFamily?: string,
  letterSpacing?: string,
  wordSpacing?: string,
  textAlign?: Property.TextAlign,
  color: string,
}

export type { TextBasedPhenotype }

export { textAlignPhenotype }