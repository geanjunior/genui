import { DnaSequence, Phenotype } from "..";

interface GenSelectInputPhenotype extends Phenotype {
  variation: number
}

const parseToSelectInputPhenotype = (
  genotypes: number[][]
): GenSelectInputPhenotype => {

  const selectInputGens = genotypes[DnaSequence.SelectInput];

  let i = 0;

  return {
    variation: selectInputGens[i++]
  } as GenSelectInputPhenotype;
}

export type {
  GenSelectInputPhenotype,
}

export {
  parseToSelectInputPhenotype
}