import { DnaSequence, Phenotype, TextBasedPhenotype, textAlignPhenotype } from "..";

interface GenParagraphPhenotype extends TextBasedPhenotype {
  textIndent?: string,
}

const parseToParagraphPhenotype = (
  genotypes: number[][],
  phenotypesMap: (string | Phenotype)[]
): GenParagraphPhenotype => {

  const colorPalette = phenotypesMap[DnaSequence.ColorPalette] as string[];
  const typographyPhenotypes = phenotypesMap[DnaSequence.Typography] as string[];

  const paragraphGens = genotypes[DnaSequence.Paragraph];

  let i = 0;
  let fontSize = 0;
  return {
    //margin
    marginTop: `${paragraphGens[i++]}px`,
    marginBottom: `${paragraphGens[i++]}px`,

    //typography
    fontSize: `${fontSize = paragraphGens[i++]}px`,
    fontWeight: paragraphGens[i] ? paragraphGens[i] as number * 100 : undefined,
    fontFamily: typographyPhenotypes[paragraphGens[++i] as number],
    lineHeight: `${fontSize + paragraphGens[++i]}px`,
    letterSpacing: `${paragraphGens[++i]}px`,
    wordSpacing: `${paragraphGens[++i]}px`,
    textIndent: paragraphGens[++i] ? `${paragraphGens[i]}px` : undefined,
    textAlign: textAlignPhenotype[paragraphGens[++i]],

    //colors
    color: colorPalette[paragraphGens[++i]],
  } as GenParagraphPhenotype;
}

export type {
  GenParagraphPhenotype
}

export {
  parseToParagraphPhenotype
}