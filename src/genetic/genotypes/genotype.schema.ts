type GenotypeValuesSchema = GenotypeBaseSchema & {
  values: number[]
};

type GenotypeBaseSchema = { type: string };

type GenotypeRangeSchema = GenotypeBaseSchema & {
  from: number,
  to: number
};

type GenotypeSchemas = GenotypeRangeSchema | GenotypeValuesSchema;

enum Searchspace {
  Values = "values",
  Range = "range"
}

export type {
  GenotypeValuesSchema,
  GenotypeRangeSchema,
  GenotypeSchemas
}

export {
  Searchspace
}