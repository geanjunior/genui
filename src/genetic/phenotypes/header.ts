import { DnaSequence, GenColorPalettePhenotype, Phenotype } from "..";

interface GenHeaderPhenotype extends Phenotype {
  marginTop?: string,
  marginBottom?: string,
  fontSize?: string,
  fontWeight?: number,
  fontFamily?: string,
  color: string,
}

const parseToHeaderPhenotype = (
  genotypes: (string|number)[][],
  phenotypesMap: (string | Phenotype)[]
): GenHeaderPhenotype => {

  const colorPalette = phenotypesMap[DnaSequence.ColorPalette] as GenColorPalettePhenotype;
  const typographyPhenotypes = phenotypesMap[DnaSequence.Typography] as string[];

  const headerGens = genotypes[DnaSequence.Header];

  let i = 0;
  return {
    //margin
    marginTop:`${headerGens[i++]}px`,
    marginBottom:`${headerGens[i++]}px`, 

    //typography
    fontSize: `${headerGens[i++]}px`,
    fontWeight: headerGens[i] ? headerGens[i] as number * 100 : undefined,
    fontFamily: typographyPhenotypes[headerGens[++i] as number],

    //colors
    color: colorPalette[headerGens[++i] as (keyof typeof colorPalette)],
  } as GenHeaderPhenotype;
}

export type {
  GenHeaderPhenotype
}

export {
  parseToHeaderPhenotype
}