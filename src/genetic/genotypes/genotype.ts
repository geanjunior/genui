import { DnaSequence, colorPalettePhenotype } from "..";

type GenotypeBaseSchema = { type: string };

type GenotypeValuesSchema = GenotypeBaseSchema & {
  values: number[]
};

type GenotypeDistinctValuesSchema = GenotypeValuesSchema & {
  name: string
};

type GenotypeValuesFromRuleSchema = GenotypeBaseSchema & {
  rule: (individualGens: { genotypeSchema: GenotypeSchemas; gen: number; }[][]) => number[]
};

type GenotypeDistinctValuesFromRuleSchema = GenotypeValuesFromRuleSchema & {
  name: string
};


type GenotypeRangeSchema = GenotypeBaseSchema & {
  from: number,
  to: number
};

type GenotypeSchemas = GenotypeRangeSchema | GenotypeValuesSchema | GenotypeValuesFromRuleSchema;

enum Searchspace {
  Values = "values",
  DistinctValues = "distinct-values",
  ValuesFromRule = "values-from-rules",
  DistinctValuesFromRule = "distinct-values-from-rules",
  Range = "range"
}

const getColorsRule = (individualGens: { genotypeSchema: GenotypeSchemas; gen: number; }[][]) => {
  const values = colorPalettePhenotype[individualGens[DnaSequence.ColorPalette][0].gen];
  return Object.keys(values).map(k => parseInt(k)).filter(k => !isNaN(k))
};

export type {
  GenotypeValuesSchema,
  GenotypeDistinctValuesSchema,
  GenotypeValuesFromRuleSchema,
  GenotypeDistinctValuesFromRuleSchema,
  GenotypeRangeSchema,
  GenotypeSchemas
}

export {
  Searchspace,
  getColorsRule
}