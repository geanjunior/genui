import { DnaSequence, parseToButtonPhenotype, parseToTypographyPhenotype } from ".";

interface Phenotype {

}

interface Dna {
  genotypes: number[][]
  phenotypes: Phenotype[]
}

const parsePhenotypes = (genotypes: number[][]) => {
  const phenotypeSequenceMap = (() => {
    const map = [];
    map[DnaSequence.CollorPalette] = [];
    map[DnaSequence.Typography] = parseToTypographyPhenotype(genotypes);
    map[DnaSequence.Button] = parseToButtonPhenotype(genotypes, map[DnaSequence.Typography]);
    return map;
  })();

  const phenotypes = Object
    .values(DnaSequence)
    .filter(i => !isNaN(Number(i)))
    .map(i => (phenotypeSequenceMap[i as DnaSequence]));

  return phenotypes
}

export type {
  Dna,
  Phenotype
}

export {
  parsePhenotypes
}