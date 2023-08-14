type GenotypeValuesSchema = GenotypeBaseSchema & {
  values: number[]
};

type GenotypeDistinctValuesSchema = GenotypeBaseSchema & {
  name: string,
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
  DistinctValues = "distinct-values",
  Range = "range"
}

export type {
  GenotypeValuesSchema,
  GenotypeDistinctValuesSchema,
  GenotypeRangeSchema,
  GenotypeSchemas
}

export {
  Searchspace
}