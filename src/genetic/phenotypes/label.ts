import { DnaSequence, Phenotype, TextBasedPhenotype, textAlignPhenotype } from "..";

interface GenLabelPhenotype extends TextBasedPhenotype {}

const parseToLabelPhenotype = (
  genotypes: number[][],
  phenotypesMap: (string | Phenotype)[]
): GenLabelPhenotype => {

  const colorPalette = phenotypesMap[DnaSequence.ColorPalette] as string[];
  const typographyPhenotypes = phenotypesMap[DnaSequence.Typography] as string[];

  const labelGens = genotypes[DnaSequence.Label];

  let i = 0;
  return {
    //typography
    fontSize: `${labelGens[i++]}px`,
    fontWeight: labelGens[i] ? labelGens[i] as number * 100 : undefined,
    fontFamily: typographyPhenotypes[labelGens[++i] as number],
    letterSpacing: `${labelGens[++i]}px`,
    wordSpacing: `${labelGens[++i]}px`,
    textAlign: textAlignPhenotype[labelGens[++i]],

    //colors
    color: colorPalette[labelGens[++i]],
  } as GenLabelPhenotype;
}

export type {
  GenLabelPhenotype
}

export {
  parseToLabelPhenotype
}