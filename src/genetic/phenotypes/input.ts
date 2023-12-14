import { DnaSequence, Phenotype } from "..";

interface GenInputStylePhenotype {
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

interface GenInputPhenotype extends Phenotype {
  label: number,
  labelBox: {
    verticalAlign: 'middle' | 'top' | 'bottom',
    padding: string,
  },
  input: GenInputStylePhenotype
}

const parseToInputPhenotype = (
  genotypes: number[][],
  phenotypesMap: (string | Phenotype)[]
): GenInputPhenotype => {

  const colorPalette = phenotypesMap[DnaSequence.ColorPalette] as string[];
  const typographyPhenotypes = phenotypesMap[DnaSequence.Typography] as string[];

  const inputGens = genotypes[DnaSequence.Input];

  let i = 0;
  let fontSize = 0;

  return {
    label: inputGens[i++],
    labelBox: {
      verticalAlign: ['middle', 'top', 'bottom'][inputGens[i++]],
      padding: `${inputGens[i++]}px 0`,
    },
    input: {
      //border
      borderStyle: 'solid',
      borderWidth: `${inputGens[i++]}px`,
      borderRadius: `${inputGens[i++]}px`,

      //padding
      paddingTop: `${inputGens[i]}px`,
      paddingBottom: `${inputGens[i++]}px`,
      paddingLeft: `${inputGens[i]}px`,
      paddingRight: `${inputGens[i++]}px`,

      //typography
      fontSize: `${fontSize = inputGens[i++]}px`,
      fontWeight: inputGens[i] ? inputGens[i] as number * 100 : undefined,
      fontFamily: typographyPhenotypes[inputGens[++i] as number],

      lineHeight: `${fontSize + inputGens[++i]}px`,

      //colors
      color: colorPalette[inputGens[++i]],
      borderColor: colorPalette[inputGens[++i]],
      backgroundColor: colorPalette[inputGens[++i]],

      width: '100%'
    }
  } as GenInputPhenotype;
}

export type {
  GenInputStylePhenotype,
  GenInputPhenotype,
}

export {
  parseToInputPhenotype
}