import { DnaSequence, Phenotype } from "..";

interface GenTextInputPhenotype extends Phenotype {
  rows: number
}

const parseToTextInputPhenotype = (
  genotypes: number[][]
): GenTextInputPhenotype => {

  const textInputGens = genotypes[DnaSequence.TextInput];

  let i = 0;

  return {
    rows: textInputGens[i++]
  } as GenTextInputPhenotype;
}

export type {
  GenTextInputPhenotype,
}

export {
  parseToTextInputPhenotype
}