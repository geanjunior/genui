import { DnaSequence, Phenotype, textAlignPhenotype } from "..";

interface GenLayoutPhenotype extends Phenotype {
  textAlign?: typeof textAlignPhenotype[number];
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
    padding: `${layoutGens[i++]}px`,
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