import { DnaSequence, Phenotype } from "..";

interface GenButtonPhenotype extends Phenotype {
  children: string,
  borderWidth?: string,
  borderRadius?: string,
  paddingTop?: string,
  paddingBottom?: string,
  paddingLeft?: string,
  paddingRight?: string,
  fontSize?: string,
  fontWeight?: number,
  fontFamily?: string
}

const parseToButtonPhenotype = (genotypes: number[][], typographyPhenotypes: string[]): GenButtonPhenotype => {
  const buttonGens = genotypes[DnaSequence.Button];

  let i = 0;
  return {
    borderWidth: `${buttonGens[i++]}px`,
    borderRadius: `${buttonGens[i++]}px`,
    paddingTop: `${buttonGens[i]}px`,
    paddingBottom: `${buttonGens[i++]}px`,
    paddingLeft: `${buttonGens[i]}px`,
    paddingRight: `${buttonGens[i++]}px`,
    fontSize: `${buttonGens[i++]}px`,
    fontWeight: buttonGens[i] ? buttonGens[i] * 100 : undefined,
    fontFamily: typographyPhenotypes[buttonGens[++i]],
  } as GenButtonPhenotype;
}

export type {
  GenButtonPhenotype,
}

export {
  parseToButtonPhenotype
}