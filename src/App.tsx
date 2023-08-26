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
    <>
      <section style={{ display: "block", height: "43px", right: 0, padding: "10px", backgroundColor: "#2C3C3C" }}>
        <div style={{ float: "right", margin: "10px" }}>
          <button onClick={onClickCallback} style={{ cursor: 'pointer' }}>&#x27F3;</button>
        </div>
        <div style={{ float: "right" }}>
          <UIColorPalette colors={colorPalette}></UIColorPalette>
        </div>
      </section>
      <section style={{ position: "absolute", top: "63px", bottom: 0, right: 0, left: 0 }}>
        <GenLayout>
          <GenHeader>Wellcome to Genetic UI</GenHeader>
          <GenParagraph>
            GeneticUI is a cutting-edge React library that introduces genetic algorithms to UI design. By harnessing real-time interactivity, users can modify design variables like colors and spacing, prompting the genetic algorithm to evolve UI components accordingly. This innovative approach leads to a collaborative and ever-changing UI experience, reflecting the dynamic nature of genetic evolution.
          </GenParagraph>
          <GenButton>Button</GenButton>
        </GenLayout>
      </section>
    </>
  )
}

export default App
