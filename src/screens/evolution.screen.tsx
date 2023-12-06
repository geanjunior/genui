import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import IndividualScreen from "./individual.screen";
import {
  GENERATION_SIZE,
  generateFirstGenerationAsync,
  generateNextGeneration,
  hammingDistanceFitness,
  middleSinglePointCrossOver,
  uniformMutationFunction,
  tournamentSelection,
  useDesignSystemDna
} from "../genetic";

const SAMPLING_SIZE = 26;
const GENERATIONS_BEFORE_INTERACTION = 30;

const EvolutionScreen = () => {
  const navigate = useNavigate();
  const [designSystemDna, setDesignSystemDna] = useDesignSystemDna();
  const [generation, setGeneration] = useState<number[][][]>();
  const [sampling, setSampling] = useState<number[][][]>();
  const [currentGeneration, setCurrentGeneration] = useState<number>(0);
  const [currentInteraction, setCurrentInteraction] = useState<number>(0);

  const selectSampleCallback = useCallback((i: number | number[][]) => {
    if (i instanceof Array) {
      console.log('new designSystemDna!');
      console.log(JSON.stringify(i));
      setDesignSystemDna(i);
      return;
    }

    if (!sampling?.[i]) return;

    console.log('new designSystemDna!');
    console.log(JSON.stringify(sampling[i]));
    setDesignSystemDna(sampling[i]);
  }, [setDesignSystemDna, sampling]);

  // const generateRandomCallback = useCallback(() => {
  //   (async () => {
  //     setGeneration(await generateFirstGenerationAsync(GENERATION_SIZE));
  //     setSampling([]);
  //   })();
  // }, []);

  const generateNewGenerationCallback = useCallback(() => {
    (async () => {
      let nextGeneration = generation;
      for (let i = 0; i < GENERATIONS_BEFORE_INTERACTION; i++) {
        nextGeneration = generateNextGeneration(
          designSystemDna!.genotypes,
          [...nextGeneration!.map(arr => [...arr])],
          hammingDistanceFitness,
          tournamentSelection,
          middleSinglePointCrossOver,
          uniformMutationFunction
        );

        setCurrentGeneration(current => current + 1);
      }
      setCurrentInteraction(current => current + 1);
      setGeneration(nextGeneration);
      setSampling([]);
    })();
  }, [designSystemDna, generation]);

  useEffect(() => {
    (async () => {
      if (!generation?.length) {
        setCurrentGeneration(current => current + 1);
        setCurrentInteraction(current => current + 1);
        setGeneration(await generateFirstGenerationAsync(GENERATION_SIZE));
        return;
      }

      if (generation?.length && !sampling?.length) {
        const sampling = generation.slice(0, SAMPLING_SIZE);

        console.log("new sampling!");
        setSampling(sampling);
        selectSampleCallback(sampling[0]);
        return;
      }
    })();
  }, [designSystemDna, setDesignSystemDna, selectSampleCallback, generation, sampling]);

  return (
    <div style={{ position: "absolute", top: "0", bottom: "0", left: "0", right: "0" }}>
      <div style={{ position: "absolute", left: "0", right: "0", height: "43px", backgroundColor: "#000" }}>
        <div style={{ float: "left", margin: "10px 0 0 10px" }}>
          <button onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>&larr;</button>
        </div>
        <div style={{ float: "right", margin: "10px 10px 0 10px" }}>
          <button onClick={generateNewGenerationCallback} style={{ cursor: 'pointer' }}>NEXT</button>
        </div>
        <div style={{ float: "right", margin: "13px 10px 0 10px", color: '#fff' }}>
          <span>Interaction: {currentInteraction}</span>
        </div>
        <div style={{ float: "right", margin: "13px 10px 0 10px", color: '#fff' }}>
          <span>Generation: {currentGeneration}</span>
        </div>
      </div>
      <div style={{ position: "absolute", textAlign: "center", overflow: "auto", paddingTop: "20px", backgroundColor: "#989898", top: "43px", bottom: "0", left: "0", right: "calc(100% - 150px)" }}>
        {sampling?.map((_, i) => (
          <div key={i} style={{ display: "inline-block", margin: '5px', width: "50px", height: "50px", border: designSystemDna?.genotypes === sampling[i] ? '5px solid #000' : undefined }}>
            <button onClick={() => selectSampleCallback(i)} style={{ width: "100%", height: "100%", cursor: 'pointer' }}>{i + 1}</button>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", top: "43px", border: "2px solid #fff", borderLeft: "2px solid #fff", bottom: "0", left: "150px", right: "0" }}>
        {designSystemDna
          ? <IndividualScreen />
          : <h3 style={{ textAlign: "center" }}>Processando a primeira geração...</h3>}
      </div>
    </div>
  )
}

export default EvolutionScreen;