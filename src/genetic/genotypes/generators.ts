import { DnaSequence, GenotypeDistinctValuesSchema, GenotypeRangeSchema, GenotypeSchemas, GenotypeValuesSchema, Searchspace, genotypeSequenceMap } from ".";

const genotypeSchema = Object
  .values(DnaSequence)
  .filter(i => !isNaN(Number(i)))
  .map(i => (genotypeSequenceMap[i as DnaSequence]));

const generateRandomIndividual = () => {
  const individualGens: { genotypeSchema: GenotypeSchemas, gen: string | number }[][] = [];
  genotypeSchema.forEach(elementSchema => {
    const elementGens: { genotypeSchema: GenotypeSchemas, gen: string | number }[] = [];
    individualGens.push(elementGens);
    elementSchema.forEach(genotypeSchema => {
      elementGens.push({ genotypeSchema, gen: generateRandomGenotypeValue(genotypeSchema, individualGens) });
    });
  });
  return individualGens.map(element => element.map(gen => gen.gen));
}

const generateRandomGenotypeValue = (
  genSchema: GenotypeSchemas,
  individualGens: { genotypeSchema: GenotypeSchemas, gen: string | number }[][]
): string | number => {

  if (genSchema.type === Searchspace.Range)
    return generateRandomGenotypeValueFromRange(genSchema as GenotypeRangeSchema);
  if (genSchema.type === Searchspace.Values)
    return generateRandomGenotypeValueFromValues(genSchema as GenotypeValuesSchema);
  if (genSchema.type === Searchspace.DistinctValues)
    return generateRandomGenotypeDistinctValueFromValues(genSchema as GenotypeDistinctValuesSchema, individualGens);
  return 0;
};

const generateRandomGenotypeValueFromRange = (genSchema: GenotypeRangeSchema): number => {
  const min = genSchema.from ?? 0;
  const max = genSchema.to ?? 0;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateRandomGenotypeValueFromValues = (genSchema: GenotypeValuesSchema): string | number => {
  const min = 0;
  const max = genSchema.values.length - 1;
  return genSchema.values[Math.floor(Math.random() * (max - min + 1) + min)];
};

const generateRandomGenotypeDistinctValueFromValues = (
  genSchema: GenotypeDistinctValuesSchema,
  individualGens: { genotypeSchema: GenotypeSchemas, gen: string | number }[][]
): string | number => {

  const exceptGens = individualGens
    .reduce((prev, current) => prev.concat(current), [])
    .filter(g => g.genotypeSchema.type === Searchspace.DistinctValues
      && (g.genotypeSchema as GenotypeDistinctValuesSchema).name === genSchema.name)
    .reduce((prev, current) => {
      prev.add(current.gen);
      return prev;
    }, new Set());

  const validValues = genSchema.values.filter(v => !exceptGens.has(v));

  const min = 0;
  const max = validValues.length - 1;
  return validValues[Math.floor(Math.random() * (max - min + 1) + min)];
};

export {
  genotypeSchema,
  generateRandomIndividual
}