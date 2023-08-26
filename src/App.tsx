import { useCallback, useEffect, useMemo } from "react";
import { DnaSequence, GenButton, GenHeader, GenLayout, GenParagraph, UIColorPalette, generateRandomIndividual, useDesignSystemDna } from "./genetic";

import "./App.css"

function App() {
  const [designSystemDna, setDesignSystemDna] = useDesignSystemDna();

  const colorPalette: string[] = useMemo(() => {
    if (designSystemDna) {
      return designSystemDna?.phenotypes[DnaSequence.ColorPalette] as string[]
    }
    return [];
  }, [designSystemDna]);

  useEffect(() => {
    if (!designSystemDna) {
      setDesignSystemDna(generateRandomIndividual());
      setInterval(() => setDesignSystemDna(generateRandomIndividual()), 5000)
      return;
    }
    console.clear();
    console.log('designSystemDna.genotypes: ', JSON.stringify(designSystemDna?.genotypes));
    console.log('designSystemDna.phenotypes: ', JSON.stringify(designSystemDna?.phenotypes, undefined, 2));
  }, [designSystemDna, setDesignSystemDna]);

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
        <GenParagraph>
          GeneticUI is a cutting-edge React library that introduces genetic algorithms to UI design. By harnessing real-time interactivity, users can modify design variables like colors and spacing, prompting the genetic algorithm to evolve UI components accordingly. This innovative approach leads to a collaborative and ever-changing UI experience, reflecting the dynamic nature of genetic evolution.
        </GenParagraph>
      </section>
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
