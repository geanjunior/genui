import { useCallback, useContext, useEffect } from "react";
import { AppContext } from "../contexts";
import {
  DesignSystemDna,
  DnaSequence,
  generateRandomIndividual,
  parseToButtonPhenotype,
  parseToTypographyPhenotype
} from ".";

const useDesignSystemDna = (defaultValue?: number[][]): [DesignSystemDna | undefined, (value: number[][]) => void] => {
  const { designSystemDna, setDesignSystemDna } = useContext(AppContext);

  const _setDesignSystemDna = useCallback((value: number[][]) => {
    if (value && setDesignSystemDna) {
      const typographyGens = value[DnaSequence.Typography];
      const buttonGens = value[DnaSequence.Button];

      const typographyPhens = parseToTypographyPhenotype(typographyGens);
      const buttonPhens = parseToButtonPhenotype(buttonGens, typographyPhens);

      const phenotypeSequenceMap = (() => {
        const map = [];
        map[DnaSequence.Typography] = typographyPhens;
        map[DnaSequence.Button] = buttonPhens;
        return map;
      })();

      const phenotypes = Object
        .values(DnaSequence)
        .filter(i => !isNaN(Number(i)))
        .map(i => (phenotypeSequenceMap[i as DnaSequence]))

      setDesignSystemDna!({
        genotypes: value,
        phenotypes: phenotypes
      });
    }
  }, [setDesignSystemDna]);

  useEffect(() => {
    if (defaultValue && !designSystemDna) {
      _setDesignSystemDna(defaultValue);
    }
  }, [defaultValue, designSystemDna, _setDesignSystemDna]);

  return [designSystemDna, _setDesignSystemDna];
}

const useDesignSystemRandomDna = () => {
  return useDesignSystemDna(generateRandomIndividual());
};

export {
  useDesignSystemDna,
  useDesignSystemRandomDna,
};

