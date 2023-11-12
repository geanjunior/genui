import { DnaSequence, Phenotype, textAlignPhenotype } from "..";
import type { Property } from 'csstype';

interface GenSectionAlignmentStylePhenotype {
  textAlign?: Property.TextAlign
}
interface GenSectionAlignmentChildStylePhenotype {
  paddign?: string
}

interface GenSectionAlignmentPhenotype extends Phenotype {
  section: GenSectionAlignmentStylePhenotype;
  child: GenSectionAlignmentChildStylePhenotype;
}


const parseToSectionAlignmentPhenotype = (
  genotypes: number[][]
): GenSectionAlignmentPhenotype => {

  const sectionGens = genotypes[DnaSequence.SectionAlignment];

  let i = 0;
  return {
    section: {
      textAlign: textAlignPhenotype[sectionGens[i++]],
    } as GenSectionAlignmentStylePhenotype,

    child: {
      padding: `${sectionGens[i++]}px`,
    } as GenSectionAlignmentChildStylePhenotype
  } as GenSectionAlignmentPhenotype;
}

export type {
  GenSectionAlignmentStylePhenotype,
  GenSectionAlignmentChildStylePhenotype,
  GenSectionAlignmentPhenotype
}

export {
  parseToSectionAlignmentPhenotype
}