import { GenotypeSchemas, buttonGenotypeSchema, typographyGenotypeSchema } from ".";

enum DnaSequence {
  CollorPalette,
  Typography,
  Button
}

const genotypeSequenceMap = ((): GenotypeSchemas[][] => {
  const map = [];
  map[DnaSequence.CollorPalette] = [];
  map[DnaSequence.Typography] = typographyGenotypeSchema;
  map[DnaSequence.Button] = buttonGenotypeSchema;
  return map;
})();

export {
  DnaSequence,
  genotypeSequenceMap
}