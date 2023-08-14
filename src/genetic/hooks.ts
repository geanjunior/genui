import { useCallback, useContext, useEffect } from "react";
import {
  GeneticContext,
  Dna,
  generateRandomIndividual,
  parsePhenotypes
} from ".";

const useDesignSystemDna = (defaultGenotypes?: number[][]) : [
  Dna | undefined,
  (genotypes: number[][]) => void
] => {

  const { designSystemDna, setDesignSystemDna } = useContext(GeneticContext);

  const _setDesignSystemDna = useCallback((genotypes: number[][]) => {
    if (genotypes && setDesignSystemDna) {
      const phenotypes = parsePhenotypes(genotypes);
      setDesignSystemDna!({ genotypes, phenotypes });
    }
  }, [setDesignSystemDna]);

  useEffect(() => {
    if (defaultGenotypes && !designSystemDna) {
      _setDesignSystemDna(defaultGenotypes);
    }
  }, [defaultGenotypes, designSystemDna, _setDesignSystemDna]);

  return [designSystemDna, _setDesignSystemDna];
}

const useRandomDesignSystemDna = () => {
  return useDesignSystemDna(generateRandomIndividual());
};

export {
  useDesignSystemDna,
  useRandomDesignSystemDna,
};

