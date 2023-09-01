import { DnaSequence, Phenotype } from "..";

interface GenTextInputStylePhenotype {
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
  color: string,
  borderColor: string
  backgroundColor: string,
}

interface GenTextInputPhenotype extends Phenotype {
  rows: number,
  style: GenTextInputStylePhenotype
}

const parseToTextInputPhenotype = (
  genotypes: number[][],
  phenotypesMap: (string | Phenotype)[]
): GenTextInputPhenotype => {

  const colorPalette = phenotypesMap[DnaSequence.ColorPalette] as string[];
  const typographyPhenotypes = phenotypesMap[DnaSequence.Typography] as string[];

  const textInputGens = genotypes[DnaSequence.TextInput];

  let i = 0;

  return {
    rows: textInputGens[i++],
    style: {
      //border
      borderStyle: 'solid',
      borderWidth: `${textInputGens[i++]}px`,
      borderRadius: `${textInputGens[i++]}px`,

      //padding
      paddingTop: `${textInputGens[i]}px`,
      paddingBottom: `${textInputGens[i++]}px`,
      paddingLeft: `${textInputGens[i]}px`,
      paddingRight: `${textInputGens[i++]}px`,

      //typography
      fontSize: `${textInputGens[i++]}px`,
      fontWeight: textInputGens[i] ? textInputGens[i] as number * 100 : undefined,
      fontFamily: typographyPhenotypes[textInputGens[++i] as number],

      //colors
      color: colorPalette[textInputGens[++i]],
      borderColor: colorPalette[textInputGens[++i]],
      backgroundColor: colorPalette[textInputGens[++i]],
    }
  } as GenTextInputPhenotype;
}

export type {
  GenTextInputStylePhenotype,
  GenTextInputPhenotype,
}

export {
  parseToTextInputPhenotype
}