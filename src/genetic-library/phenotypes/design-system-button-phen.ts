import { DesignSystemPhenotype } from ".";
import { GenotypeValuesSchema, DnaSequence, designSystemGenotypeSchema } from "..";

interface GenButtonPhenotype extends DesignSystemPhenotype {
  children: string,
  borderWidth?: string,
  borderRadius?: string,
  padding?: string,
  fontSize?: string,
  fontWeight?: number,
  fontFamily?: string,

  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const parseToTypographyPhenotype = (dna: number[]): string[] => {
  return dna.map((phenIndex, genIndex) => (
    designSystemGenotypeSchema[DnaSequence.Typography][genIndex] as GenotypeValuesSchema
  ).values[phenIndex]);
}

const parseToButtonPhenotype = (dna: number[], typography: string[]): GenButtonPhenotype => {
  console.log('typography = ', typography)
  let i = 0;
  return {
    borderWidth: `${dna[i++]}px`,
    borderRadius: `${dna[i++]}px`,
    padding: `${dna[i++]}px`,
    fontSize: `${dna[i++]}px`,
    fontWeight: dna[i] ? dna[i] * 100 : undefined,
    fontFamily: typography[dna[++i]],
  } as GenButtonPhenotype
}

export type {
  GenButtonPhenotype,
}

export {
  parseToTypographyPhenotype,
  parseToButtonPhenotype
}