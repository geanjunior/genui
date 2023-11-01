import { DnaSequence, Phenotype } from "..";

interface GenSelectInputStylePhenotype {
  borderStyle?: string,
  borderWidth?: string,
  borderRadius?: string,
  paddingTop?: string,
  paddingBottom?: string,
  paddingLeft?: string,
  paddingRight?: string,
  fontSize?: string,
  fontWeight?: number,
  fontFamily?: string,
  lineHeight?: string,
  color: string,
  borderColor: string
  backgroundColor: string,
}

interface GenSelectInputPhenotype extends Phenotype {
  variation: number,
  label: number,
  input: GenSelectInputStylePhenotype
}

const parseToSelectInputPhenotype = (
  genotypes: number[][],
  phenotypesMap: (string | Phenotype)[]
): GenSelectInputPhenotype => {

  const colorPalette = phenotypesMap[DnaSequence.ColorPalette] as string[];
  const typographyPhenotypes = phenotypesMap[DnaSequence.Typography] as string[];

  const selectInputGens = genotypes[DnaSequence.SelectInput];

  let i = 0;
  let fontSize = 0;

  return {
    variation: selectInputGens[i++],
    label: selectInputGens[i++],
    input: {
      //border
      borderStyle: 'solid',
      borderWidth: `${selectInputGens[i++]}px`,
      borderRadius: `${selectInputGens[i++]}px`,

      //padding
      paddingTop: `${selectInputGens[i]}px`,
      paddingBottom: `${selectInputGens[i++]}px`,
      paddingLeft: `${selectInputGens[i]}px`,
      paddingRight: `${selectInputGens[i++]}px`,

      //typography
      fontSize: `${fontSize = selectInputGens[i++]}px`,
      fontWeight: selectInputGens[i] ? selectInputGens[i] as number * 100 : undefined,
      fontFamily: typographyPhenotypes[selectInputGens[++i] as number],

      lineHeight: `${fontSize + selectInputGens[++i]}px`,

      //colors
      color: colorPalette[selectInputGens[++i]],
      borderColor: colorPalette[selectInputGens[++i]],
      backgroundColor: colorPalette[selectInputGens[++i]],
    }
  } as GenSelectInputPhenotype;
}

export type {
  GenSelectInputStylePhenotype,
  GenSelectInputPhenotype,
}

export {
  parseToSelectInputPhenotype
}