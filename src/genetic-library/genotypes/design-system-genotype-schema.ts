type GenotypeValuesSchema = GenotypeBaseSchema & {
  values: string[]
};

type GenotypeBaseSchema = { type: string };

type GenotypeRangeSchema = GenotypeBaseSchema & {
  from: number,
  to: number
};

type GenotypeSchemas = GenotypeRangeSchema | GenotypeValuesSchema;

const typographyFontList = [
  "serif", "sans-serif", "monospace", "cursive", "fantasy",
  "Arial, Helvetica, sans-serif",
  "Times New Roman, Georgia, serif",
  "Courier New, Monaco, monospace",
  "Baskerville, Bodoni, Trajan, serif",
  "Brush Script, Copperplate, Zapfino, cursive"
];

enum Searchspace {
  Values = "values",
  Range = "range"
}

const typographyGenotypeSchema = [
  { type: Searchspace.Values, values: typographyFontList },
  { type: Searchspace.Values, values: typographyFontList }
];

const buttonGenotypeSchema = [
  { type: Searchspace.Range, from: 0, to: 5 }, //border-width
  { type: Searchspace.Range, from: 0, to: 25 }, //border-radius
  { type: Searchspace.Range, from: 3, to: 30 }, //padding
  { type: Searchspace.Range, from: 13, to: 50 }, //font-size
  { type: Searchspace.Range, from: 0, to: 9 }, //font-weight
  { type: Searchspace.Range, from: 0, to: typographyGenotypeSchema.length - 1 }, //font-family
];

enum DnaSequence {
  CollorPalette,
  Typography,
  Button
}

const genotypeSequenceMap = ((): GenotypeSchemas[][] => {
  const map = [];
  map[DnaSequence.Typography] = typographyGenotypeSchema;
  map[DnaSequence.Button] = buttonGenotypeSchema;
  return map;
})();

const designSystemGenotypeSchema = Object
  .values(DnaSequence)
  .filter(i => !isNaN(Number(i)))
  .map(i => (genotypeSequenceMap[i as DnaSequence]));

const generateRandomIndividual = () => {
  return designSystemGenotypeSchema
    .map(elementSchema => elementSchema
      ? elementSchema.map(genotypeSchema => generateRandomGenotypeValue(genotypeSchema))
      : []);

  return [
    [
      generateRandomGenotypeValue(designSystemGenotypeSchema[DnaSequence.Typography][0]),
      generateRandomGenotypeValue(designSystemGenotypeSchema[DnaSequence.Typography][1])
    ],
    //button
    [ //TODO: usar constante para os valores das posições do array
      generateRandomGenotypeValue(designSystemGenotypeSchema[DnaSequence.Button][0]), // border-width (px) 
      generateRandomGenotypeValue(designSystemGenotypeSchema[DnaSequence.Button][1]), // border-radius (px)
      generateRandomGenotypeValue(designSystemGenotypeSchema[DnaSequence.Button][2]), // padding (px)
      generateRandomGenotypeValue(designSystemGenotypeSchema[DnaSequence.Button][3]), // font-size (px)
      generateRandomGenotypeValue(designSystemGenotypeSchema[DnaSequence.Button][4]), // font-weight (number)
      generateRandomGenotypeValue(designSystemGenotypeSchema[DnaSequence.Button][5]), // font-family (number)
    ]
  ];
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
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export type {
  GenotypeValuesSchema
}

export {
  DnaSequence,
  designSystemGenotypeSchema,
  generateRandomIndividual
}