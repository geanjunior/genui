import { PropsWithChildren, createContext, useState } from "react";
import { Dna } from ".";

interface GeneticContextValues {
  designSystemDna?: Dna,
  setDesignSystemDna?: (dna: Dna) => void,
}

const GeneticContext = createContext<GeneticContextValues>({});

const GeneticProvider = ({ children }: PropsWithChildren) => {
  const [designSystemDna, setDesignSystemDna] = useState<Dna>();

  return (
    <GeneticContext.Provider value={{ designSystemDna, setDesignSystemDna }}>
      {children}
    </GeneticContext.Provider>
  );
};

export { GeneticContext, GeneticProvider };