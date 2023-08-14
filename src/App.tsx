import { useCallback, useEffect, useMemo } from "react";
import { DnaSequence, GenColorPalettePhenotype, generateRandomIndividual, useRandomDesignSystemDna } from "./genetic";
import { UIColorPalette, GenButton, GenHeader } from "./genetic/components";

import "./App.css"

function App() {
  const [designSystemDna, setDesignSystemDna] = useRandomDesignSystemDna();

  const colorPalette: string[] = useMemo(() => {
    if (designSystemDna) {
      return Object.values(designSystemDna?.phenotypes[DnaSequence.ColorPalette] as GenColorPalettePhenotype)
    }
    return [];
  }, [designSystemDna]);

  useEffect(() => {
    if (!designSystemDna) return;
    console.log('designSystemDna.genotypes: ', JSON.stringify(designSystemDna?.genotypes));
    console.log('designSystemDna.phenotypes: ', JSON.stringify(designSystemDna?.phenotypes, undefined, 2));
  }, [designSystemDna]);

  const onClickCallback = useCallback(() => {
    setDesignSystemDna(generateRandomIndividual());
  }, [setDesignSystemDna]);

  return (
    <>
      <h1 style={{ display: "inline-block", paddingRight: "10px" }}>Wellcome to Genetic UI </h1>
      <button
        onClick={onClickCallback}
        style={{ textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}>&#x27F3;</button>
      <section>
        <UIColorPalette colors={colorPalette}></UIColorPalette>
      </section>
      <section>
        <GenHeader>Page Title</GenHeader>
      </section>
      <section>
        <GenButton>Button</GenButton>
      </section>
    </>
  )
}

export default App
