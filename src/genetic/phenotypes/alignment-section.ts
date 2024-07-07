import { DnaSequence, Phenotype, textAlignPhenotype } from "..";
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

const maxComponentWidthList = ['100%', '1024px', '720px', '500px'];

const parseToAlignmentSectionPhenotype = (
  genotypes: number[][]
): GenAlignmentSectionPhenotype => {

  const sectionGens = genotypes[DnaSequence.AlignmentSection];

  let i = 0;
  return {
    maxWidth: maxComponentWidthList[sectionGens[i++]],
    
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