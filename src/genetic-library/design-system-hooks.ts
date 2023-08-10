import { useCallback, useContext, useEffect } from "react";
import { AppContext } from "../contexts";
import {
  DesignSystemDna,
  designSystemConstants,
  generateRandomIndividual,
  parseToButtonPhenotype,
  parseToTypographyPhenotype
} from ".";

const useDesignSystemDna = (defaultValue?: number[][]): [DesignSystemDna | undefined, (value: number[][]) => void] => {
  const { designSystemDna, setDesignSystemDna } = useContext(AppContext);

  const _setDesignSystemDna = useCallback((value: number[][]) => {
    if (value && setDesignSystemDna) {
      const typographyGens = value[designSystemConstants.TYPOGRAPHY_INDEX];
      const buttonGens = value[designSystemConstants.BUTTON_INDEX];
      
      const typographyPhens = parseToTypographyPhenotype(typographyGens);
      const buttonPhens = parseToButtonPhenotype(buttonGens, typographyPhens);

      setDesignSystemDna!({
        genotypes: value,
        phenotypes: [
          typographyPhens,
          buttonPhens
        ]
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

