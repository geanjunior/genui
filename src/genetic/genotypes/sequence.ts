import { GenotypeSchemas, buttonGenotypeSchema, colorPaletteSchema, headerGenotypeSchema, typographyGenotypeSchema } from ".";

enum DnaSequence {
  ColorPalette,
  Typography,
  Header,
  Button
}

const genotypeSequenceMap = ((): GenotypeSchemas[][] => {
  const map = [];
  map[DnaSequence.ColorPalette] = colorPaletteSchema;
  map[DnaSequence.Typography] = typographyGenotypeSchema;
  map[DnaSequence.Header] = headerGenotypeSchema;
  map[DnaSequence.Button] = buttonGenotypeSchema;
  return map;
})();

export {
  DnaSequence,
  genotypeSequenceMap
}