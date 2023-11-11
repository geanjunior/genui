import { DnaSequence, Phenotype, textAlignPhenotype } from "..";
import type { Property } from 'csstype';

const flexDirectionPhenotype = ['row', 'row-reverse', 'column', 'column-reverse'];
const alignItemsPhenotype = ['flex-start', 'flex-end', 'center', 'stretch'];

interface GenSectionStylePhenotype {
  textAlign?: Property.TextAlign,
  flexDirection?: Property.FlexDirection,
  alignItems?: Property.AlignItems
}
interface GenSectionChildStylePhenotype {
  paddign?: string,
  flexDirection?: Property.FlexDirection,
}

interface GenSectionPhenotype extends Phenotype {
  variation: number;
  columns: number;
  row: GenSectionStylePhenotype;
  child: GenSectionChildStylePhenotype;
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
    
    row: {
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