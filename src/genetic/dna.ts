import { DnaSequence, parseToButtonPhenotype, parseToColorPalettePhenotype, parseToHeaderPhenotype, parseToTypographyPhenotype } from ".";

interface Phenotype {

}

interface Dna {
  genotypes: number[][]
  phenotypes: (string | Phenotype)[]
}

const parsePhenotypes = (genotypes: number[][]) => {
  const phenotypeSequenceMap = (() => {
    const map: (string | Phenotype)[] = [];
    map[DnaSequence.ColorPalette] = parseToColorPalettePhenotype(genotypes);
    map[DnaSequence.Typography] = parseToTypographyPhenotype(genotypes);
    map[DnaSequence.Header] = parseToHeaderPhenotype(genotypes, map);
    map[DnaSequence.Button] = parseToButtonPhenotype(genotypes, map);
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