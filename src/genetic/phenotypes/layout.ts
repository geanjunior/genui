import { DnaSequence, Phenotype, textAlignPhenotype } from "..";
import type { Property } from 'csstype';

interface GenLayoutPhenotype extends Phenotype {
  textAlign?: Property.TextAlign;
  backgroundColor: string,
}

const parseToLayoutPhenotype = (
  genotypes: number[][],
  phenotypesMap: (string | Phenotype)[]
): GenLayoutPhenotype => {

  const colorPalette = phenotypesMap[DnaSequence.ColorPalette] as string[];
  const layoutGens = genotypes[DnaSequence.Layout];

  let i = 0;
  return {
    padding: `${layoutGens[i++]}px ${layoutGens[i++]}px`,
    textAlign: textAlignPhenotype[layoutGens[i++]],
    backgroundColor: colorPalette[layoutGens[i++]],
  } as GenLayoutPhenotype;
}

export type {
  GenLayoutPhenotype
}

export {
  parseToLayoutPhenotype
}