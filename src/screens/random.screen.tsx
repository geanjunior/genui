import { useCallback, useEffect, useMemo, useState } from "react";
import { DnaSequence, UIColorPalette, generateRandomIndividual, useDesignSystemDna } from "../genetic";

import "./random.screen.css"
import UserInterface from "../genetic/user-interface";

function RandomScreen() {
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
      //startAutoGenerateCallback();
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
        <UserInterface />
      </section>
    </>
  )
}

export default RandomScreen;
