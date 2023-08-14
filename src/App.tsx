import { useCallback, useEffect, useMemo } from "react";
import { DnaSequence, GenButton, GenHeader, GenLayout, UIColorPalette, generateRandomIndividual, useRandomDesignSystemDna } from "./genetic";

import "./App.css"

function App() {
  const [designSystemDna, setDesignSystemDna] = useRandomDesignSystemDna();

  const colorPalette: string[] = useMemo(() => {
    if (designSystemDna) {
      return designSystemDna?.phenotypes[DnaSequence.ColorPalette] as string[]
    }
    return [];
  }, [designSystemDna]);

  useEffect(() => {
    if (!designSystemDna) return;
    console.clear();
    console.log('designSystemDna.genotypes: ', JSON.stringify(designSystemDna?.genotypes));
    console.log('designSystemDna.phenotypes: ', JSON.stringify(designSystemDna?.phenotypes, undefined, 2));
  }, [designSystemDna]);

  const onClickCallback = useCallback(() => {
    setDesignSystemDna(generateRandomIndividual());
  }, [setDesignSystemDna]);

  return (
    <GenLayout>
      <button
        onClick={onClickCallback}
        style={{ cursor: 'pointer', position: "absolute", top: "10px", right: "10px" }}
      >&#x27F3;</button>

      <GenHeader>Wellcome to Genetic UI</GenHeader>
      <section>
        <UIColorPalette colors={colorPalette}></UIColorPalette>
      </section>
      <section>
        <GenButton>Button</GenButton>
      </section>
    </GenLayout>
  )
}

export default App
