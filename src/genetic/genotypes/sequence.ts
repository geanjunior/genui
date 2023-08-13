import { GenotypeSchemas, buttonGenotypeSchema, colorPaletteSchema, typographyGenotypeSchema } from ".";

enum DnaSequence {
  ColorPalette,
  Typography,
  Button
}

const genotypeSequenceMap = ((): GenotypeSchemas[][] => {
  const map = [];
  map[DnaSequence.ColorPalette] = colorPaletteSchema;
  map[DnaSequence.Typography] = typographyGenotypeSchema;
  map[DnaSequence.Button] = buttonGenotypeSchema;
  return map;
})();

export {
  DnaSequence,
  genotypeSequenceMap
}