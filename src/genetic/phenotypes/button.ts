import { DnaSequence, Phenotype } from "..";

interface GenButtonPhenotype extends Phenotype {
  borderStyle?: string,
  borderWidth?: string,
  borderRadius?: string,
  paddingTop?: string,
  paddingBottom?: string,
  paddingLeft?: string,
  paddingRight?: string,
  fontSize?: string,
  fontWeight?: number,
  fontFamily?: string,
  color: string,
  borderColor: string
  backgroundColor: string,
}

const parseToButtonPhenotype = (
  genotypes: number[][],
  phenotypesMap: (string | Phenotype)[]
): GenButtonPhenotype => {

  const colorPalette = phenotypesMap[DnaSequence.ColorPalette] as string[];
  const typographyPhenotypes = phenotypesMap[DnaSequence.Typography] as string[];

  const buttonGens = genotypes[DnaSequence.Button];

  let i = 0;
  return {
    //border
    borderStyle: 'solid',
    borderWidth: `${buttonGens[i++]}px`,
    borderRadius: `${buttonGens[i++]}px`,

    //padding
    paddingTop: `${buttonGens[i]}px`,
    paddingBottom: `${buttonGens[i++]}px`,
    paddingLeft: `${buttonGens[i]}px`,
    paddingRight: `${buttonGens[i++]}px`,

    //typography
    fontSize: `${buttonGens[i++]}px`,
    fontWeight: buttonGens[i] ? buttonGens[i] as number * 100 : undefined,
    fontFamily: typographyPhenotypes[buttonGens[++i] as number],

    //colors
    color: colorPalette[buttonGens[++i]],
    borderColor: colorPalette[buttonGens[++i]],
    backgroundColor: colorPalette[buttonGens[++i]],
  } as GenButtonPhenotype;
}

export type {
  GenButtonPhenotype,
}

export {
  parseToButtonPhenotype
}