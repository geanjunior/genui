import { DnaSequence, maxWidthPhenotypes, Phenotype, textAlignPhenotype } from "..";
import type { Property } from 'csstype';

interface GenAlignmentSectionStylePhenotype {
  textAlign?: Property.TextAlign
}
interface GenAlignmentSectionChildStylePhenotype {
  paddign?: string
}

interface GenAlignmentSectionPhenotype extends Phenotype {
  maxWidth: string;
  section: GenAlignmentSectionStylePhenotype;
  child: GenAlignmentSectionChildStylePhenotype;
}

const parseToAlignmentSectionPhenotype = (
  genotypes: number[][]
): GenAlignmentSectionPhenotype => {

  const sectionGens = genotypes[DnaSequence.AlignmentSection];

  let i = 0;
  return {
    maxWidth: maxWidthPhenotypes[sectionGens[i++]],
    
    section: {
      textAlign: textAlignPhenotype[sectionGens[i++]],
    } as GenAlignmentSectionStylePhenotype,

    child: {
      padding: `${sectionGens[i++]}px`,
    } as GenAlignmentSectionChildStylePhenotype
  } as GenAlignmentSectionPhenotype;
}

export type {
  GenAlignmentSectionStylePhenotype,
  GenAlignmentSectionChildStylePhenotype,
  GenAlignmentSectionPhenotype
}

export {
  parseToAlignmentSectionPhenotype
}