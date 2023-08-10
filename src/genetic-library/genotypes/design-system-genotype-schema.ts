type GenotypeBaseSchema = { type: string };

type GenotypeRangeSchema = GenotypeBaseSchema & {
  from: number,
  to: number
};

type GenotypeValuesSchema = GenotypeBaseSchema & {
  values: string[]
};

type GenotypeSchemas = GenotypeRangeSchema | GenotypeValuesSchema;

const designSystemConstants = {
  TYPOGRAPHY_INDEX: 0,
  BUTTON_INDEX: 1
};

const typographyFontList = [
  "serif", "sans-serif", "monospace", "cursive", "fantasy",
  "Arial, Helvetica, sans-serif",
  "Times New Roman, Georgia, serif",
  "Courier New, Monaco, monospace",
  "Baskerville, Bodoni, Trajan, serif",
  "Brush Script, Copperplate, Zapfino, cursive"
];

const designSystemGenotypeSchema = [
  [
    { type: "values", values: typographyFontList },
    { type: "values", values: typographyFontList }
  ],
  //button
  [
    { type: "range", from: 0, to: 5 }, //border-width
    { type: "range", from: 0, to: 25 }, //border-radius
    { type: "range", from: 3, to: 30 }, //padding
    { type: "range", from: 13, to: 50 }, //font-size
    { type: "range", from: 0, to: 9 }, //font-weight
    { type: "range", from: 0, to: 1 }, //font-family //TODO: the size of the range needs to be restricted by the amount of the fonts in typography
  ]
] as GenotypeSchemas[][];

const generateRandomIndividual = () => {
  return [
    [
      generateRandomGenotypeValue(designSystemGenotypeSchema[designSystemConstants.TYPOGRAPHY_INDEX][0]),
      generateRandomGenotypeValue(designSystemGenotypeSchema[designSystemConstants.TYPOGRAPHY_INDEX][1])
    ],
    //button
    [ //TODO: usar constante para os valores das posições do array
      generateRandomGenotypeValue(designSystemGenotypeSchema[designSystemConstants.BUTTON_INDEX][0]), // border-width (px) 
      generateRandomGenotypeValue(designSystemGenotypeSchema[designSystemConstants.BUTTON_INDEX][1]), // border-radius (px)
      generateRandomGenotypeValue(designSystemGenotypeSchema[designSystemConstants.BUTTON_INDEX][2]), // padding (px)
      generateRandomGenotypeValue(designSystemGenotypeSchema[designSystemConstants.BUTTON_INDEX][3]), // font-size (px)
      generateRandomGenotypeValue(designSystemGenotypeSchema[designSystemConstants.BUTTON_INDEX][4]), // font-weight (number)
      generateRandomGenotypeValue(designSystemGenotypeSchema[designSystemConstants.BUTTON_INDEX][5]), // font-family (number)
    ]
  ];
}

export type {
  GenotypeValuesSchema
}

export {
  designSystemConstants,
  designSystemGenotypeSchema,
  generateRandomIndividual
}

//#region PRIVATE AREA
const generateRandomGenotypeValue = (params: GenotypeSchemas): number => {
  if (params.type === "range")
    return generateRandomGenotypeValueFromRange(params as GenotypeRangeSchema);
  if (params.type === "values")
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
//#endregion