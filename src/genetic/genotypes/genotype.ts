import { DnaSequence, calculateColorsContrastRatio, colorPalettePhenotype } from "..";

type IndividualSchemaAndGen = {
  genotypeSchema: GenotypeSchemas;
  gen: number;
}

type GenotypeBaseSchema = { type: string, name?: string };

type GenotypeDistinctBaseSchema = GenotypeBaseSchema & {
  exclude: string[]
};

type GenotypeValuesSchema = GenotypeBaseSchema & {
  values: number[]
};

type GenotypeDistinctValuesSchema = GenotypeValuesSchema & GenotypeDistinctBaseSchema;

type GenotypeValuesFromRuleSchema = GenotypeBaseSchema & {
  rule: (individualGens: IndividualSchemaAndGen[][]) => number[]
};

type GenotypeDistinctValuesFromRuleSchema = GenotypeValuesFromRuleSchema & GenotypeDistinctBaseSchema & {
  distinctRule?: (individualGens: IndividualSchemaAndGen[][], valueGens: number[], excludedGens: number[]) => number[]
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

const getColorsRule = (individualGens: IndividualSchemaAndGen[][]) => {
  const colors = colorPalettePhenotype[individualGens[DnaSequence.ColorPalette][0].gen];
  const values = Object.keys(colors).map(k => parseInt(k)).filter(k => !isNaN(k));
  return values;
};

const getContrastingColorsRule = (individualGens: IndividualSchemaAndGen[][], valueGens: number[], excludedGens: number[]) => {
  const colors = colorPalettePhenotype[individualGens[DnaSequence.ColorPalette][0].gen];

  const contrastRatioMap = valueGens.map(valueGen => excludedGens.map(excludedGen => {
    const colorValue = colors[valueGen];
    const colorExcluded = colors[excludedGen];
    const contrastRatio = calculateColorsContrastRatio(colorValue, colorExcluded);
    return contrastRatio;
  }));
  const filteredValues = valueGens.filter((_, index) => !contrastRatioMap[index].some(contrastRatio => contrastRatio >= 1 / 3));

  return filteredValues.length
    ? filteredValues
    : (() => {
      const arr = valueGens.map((_, index) => Math.max.apply(null, contrastRatioMap[index]));
      const min = Math.min.apply(null, arr);
      return [valueGens[arr.indexOf(min)]];
    })();
};

export type {
  IndividualSchemaAndGen,
  GenotypeValuesSchema,
  GenotypeDistinctValuesSchema,
  GenotypeValuesFromRuleSchema,
  GenotypeDistinctValuesFromRuleSchema,
  GenotypeRangeSchema,
  GenotypeSchemas
}

export {
  Searchspace,
  getColorsRule,
  getContrastingColorsRule
}