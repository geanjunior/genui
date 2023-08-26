import { DnaSequence, Phenotype, TextBasedPhenotype, textAlignPhenotype } from "..";

interface GenHeaderPhenotype extends TextBasedPhenotype {}

const parseToHeaderPhenotype = (
  genotypes: number[][],
  phenotypesMap: (string | Phenotype)[]
): GenHeaderPhenotype => {

  const colorPalette = phenotypesMap[DnaSequence.ColorPalette] as string[];
  const typographyPhenotypes = phenotypesMap[DnaSequence.Typography] as string[];

  const headerGens = genotypes[DnaSequence.Header];

  let i = 0;
  let fontSize = 0;
  return {
    //margin
    marginTop:`${headerGens[i++]}px`,
    marginBottom:`${headerGens[i++]}px`, 

    //typography
    fontSize: `${fontSize = headerGens[i++]}px`,
    fontWeight: headerGens[i] ? headerGens[i] as number * 100 : undefined,
    fontFamily: typographyPhenotypes[headerGens[++i] as number],
    lineHeight: `${fontSize + headerGens[++i]}px`,
    letterSpacing: `${headerGens[++i]}px`,
    wordSpacing: `${headerGens[++i]}px`,
    textAlign: textAlignPhenotype[headerGens[++i]],

    //colors
    color: colorPalette[headerGens[++i]],
  } as GenHeaderPhenotype;
}

export type {
  GenHeaderPhenotype
}

export {
  parseToHeaderPhenotype
}