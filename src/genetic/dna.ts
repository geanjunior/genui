import {
  DnaSequence,
  parseToButtonPhenotype,
  parseToColorPalettePhenotype,
  parseToHeaderPhenotype,
  parseToInputPhenotype,
  parseToLabelPhenotype,
  parseToLayoutPhenotype,
  parseToParagraphPhenotype,
  parseToSectionPhenotype,
  parseToSelectInputPhenotype,
  parseToTextInputPhenotype,
  parseToTypographyPhenotype
} from ".";

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
    map[DnaSequence.Layout] = parseToLayoutPhenotype(genotypes, map);
    map[DnaSequence.Section] = parseToSectionPhenotype(genotypes);
    map[DnaSequence.Header] = parseToHeaderPhenotype(genotypes, map);
    map[DnaSequence.Paragraph] = parseToParagraphPhenotype(genotypes, map);
    map[DnaSequence.Button] = parseToButtonPhenotype(genotypes, map);
    map[DnaSequence.Label] = parseToLabelPhenotype(genotypes, map);
    map[DnaSequence.Input] = parseToInputPhenotype(genotypes, map);
    map[DnaSequence.TextInput] = parseToTextInputPhenotype(genotypes);
    map[DnaSequence.SelectInput] = parseToSelectInputPhenotype(genotypes);
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