import { DnaSequence, GenotypeRangeSchema, GenotypeSchemas, GenotypeValuesSchema, Searchspace, genotypeSequenceMap } from ".";

const genotypeSchema = Object
  .values(DnaSequence)
  .filter(i => !isNaN(Number(i)))
  .map(i => (genotypeSequenceMap[i as DnaSequence]));

const generateRandomIndividual = () => {
  return genotypeSchema
    .map(elementSchema => elementSchema
      ? elementSchema.map(genotypeSchema => generateRandomGenotypeValue(genotypeSchema))
      : []);
}

const generateRandomGenotypeValue = (params: GenotypeSchemas): number => {
  if (params.type === Searchspace.Range)
    return generateRandomGenotypeValueFromRange(params as GenotypeRangeSchema);
  if (params.type === Searchspace.Values)
    return generateRandomGenotypeValueFromValues(params as GenotypeValuesSchema);
  return 0;
};

const generateRandomGenotypeValueFromRange = (params: GenotypeRangeSchema): number => {
  const min = params.from ?? 0;
  const max = params.to ?? 0;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateRandomGenotypeValueFromValues = (params: GenotypeValuesSchema): number => {
  const min = 0;
  const max = params.values.length - 1;
  return params.values[Math.floor(Math.random() * (max - min + 1) + min)];
};

export {
  genotypeSchema,
  generateRandomIndividual
}