import { Phenotype } from "..";
import type { Property } from 'csstype';

const textAlignPhenotype = ["left", "right", "center", "justify"] as const;

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