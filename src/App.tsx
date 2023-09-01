import { useCallback, useEffect, useMemo, useState } from "react";
import { DnaSequence, GenButton, GenHeader, GenLayout, GenParagraph, GenTextInput, UIColorPalette, generateRandomIndividual, useDesignSystemDna } from "./genetic";

import "./App.css"

function App() {
  const [designSystemDna, setDesignSystemDna] = useDesignSystemDna();
  const [intervalId, setIntervalId] = useState<number>();

  const colorPalette: string[] = useMemo(() => {
    if (designSystemDna) {
      return designSystemDna?.phenotypes[DnaSequence.ColorPalette] as string[]
    }
    return [];
  }, [designSystemDna]);

  const startAutoGenerateCallback = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(setInterval(() => setDesignSystemDna(generateRandomIndividual()), 5000));
  }, [intervalId, setDesignSystemDna]);

  const generateRandomCallback = useCallback(() => {
    setDesignSystemDna(generateRandomIndividual());
    if (intervalId)
      startAutoGenerateCallback();
  }, [setDesignSystemDna, intervalId, startAutoGenerateCallback]);

  const toggleAutoGenerateCallback = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
      return;
    }
    startAutoGenerateCallback();
  }, [intervalId, startAutoGenerateCallback]);

  useEffect(() => {
    if (!designSystemDna) {
      generateRandomCallback();
      return () => clearInterval(intervalId);
    }
    console.clear();
    console.log('designSystemDna.genotypes: ', JSON.stringify(designSystemDna?.genotypes));
    console.log('designSystemDna.phenotypes: ', JSON.stringify(designSystemDna?.phenotypes, undefined, 2));
  }, [designSystemDna, setDesignSystemDna, intervalId, generateRandomCallback, startAutoGenerateCallback]);

  return (
    <>
      <section style={{ display: "block", height: "43px", right: 0, padding: "10px", backgroundColor: "#2C3C3C" }}>
        <div style={{ float: "right", margin: "10px 0 0 10px" }}>
          <button onClick={generateRandomCallback} style={{ cursor: 'pointer' }}>&#x27F3;</button>
        </div>
        <div style={{ float: "right", margin: "10px 0 0 10px" }}>
          <button onClick={toggleAutoGenerateCallback} style={{ cursor: 'pointer' }}>{intervalId ? <>&#x23F8;</> : <>&#x23F5;</>}</button>
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
          <GenTextInput value={'Some Text'}
            onChange={(evt: React.ChangeEvent) => console.log(evt.target.getAttribute('value') || evt.target.textContent)}
            style={{width: "500px"}} />
          <br /><br />
          <GenButton onClick={() => setTimeout(() => alert("Button was clicked!"), 0)}>Button</GenButton>
        </GenLayout>
      </section>
    </>
  )
}

export default App
