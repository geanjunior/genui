import { DnaSequence, GenSectionPhenotype, parseToSectionPhenotype } from "..";

const parseToSecondSectionPhenotype = (
  genotypes: number[][],
  sectionType: DnaSequence.Section | DnaSequence.SecondSection = DnaSequence.Section
): GenSectionPhenotype => {
  return parseToSectionPhenotype(genotypes, sectionType)
}

export {
  parseToSecondSectionPhenotype
}