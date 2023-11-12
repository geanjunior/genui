import { DnaSequence, GenSectionAlignmentPhenotype, GenSectionAlignmentStylePhenotype, textAlignPhenotype } from "..";
import type { Property } from 'csstype';

const flexDirectionPhenotype = ['row', 'row-reverse', 'column', 'column-reverse'];
const alignItemsPhenotype = ['flex-start', 'flex-end', 'center', 'stretch'];

interface GenSectionStylePhenotype extends GenSectionAlignmentStylePhenotype {
  flexDirection?: Property.FlexDirection,
  alignItems?: Property.AlignItems
}

interface GenSectionChildStylePhenotype {
  flexDirection?: Property.FlexDirection,
}

interface GenSectionPhenotype extends GenSectionAlignmentPhenotype {
  variation: number;
  columns: number;
}

const parseToSectionPhenotype = (
  genotypes: number[][]
): GenSectionPhenotype => {

  const sectionGens = genotypes[DnaSequence.Section];

  let i = 0;
  let variation = 1;
  return {
    variation: variation = sectionGens[i++],
    columns: sectionGens[i++],
    
    section: {
      textAlign: textAlignPhenotype[sectionGens[i++]],
      flexDirection: variation === 1 ? flexDirectionPhenotype[sectionGens[i++]] : (() => {i++})(),
      alignItems: variation === 1 ? alignItemsPhenotype[sectionGens[i++]] : (() => {i++})(),
    } as GenSectionStylePhenotype,

    child: {
      flexDirection: variation === 1 ? flexDirectionPhenotype[sectionGens[i++]] : (() => {i++})(),
      padding: `${sectionGens[i++]}px`,
    } as GenSectionChildStylePhenotype
  } as GenSectionPhenotype;
}

export type {
  GenSectionStylePhenotype,
  GenSectionChildStylePhenotype,
  GenSectionPhenotype
}

export {
  parseToSectionPhenotype
}