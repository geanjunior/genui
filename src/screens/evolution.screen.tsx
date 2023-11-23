import { useNavigate } from "react-router-dom";
import IndividualScreen from "./individual.screen";
import { generateRandomIndividual, useDesignSystemDna } from "../genetic";
import { useCallback, useEffect, useState } from "react";

const GENERATION_SIZE = 100;
const SAMPLING_SIZE = 7;

const generateFirstGenerationAsync = async (size: number) => {
  const promises = [] as Promise<number[][]>[];
  for (let i = 0; i < size; i++) {
    promises.push(new Promise((resolve) => {
      resolve(generateRandomIndividual());
    }));
  }
  return await Promise.all(promises);
}

const EvolutionScreen = () => {
  const navigate = useNavigate();
  const [designSystemDna, setDesignSystemDna] = useDesignSystemDna();
  const [generation, setGeneration] = useState<number[][][]>();
  const [sampling, setSampling] = useState<number[][][]>();

  const selectSampleCallback = useCallback((i: number | number[][]) => {
    if (i instanceof Array) {
      setDesignSystemDna(i);
      return;
    }

    if (!sampling) return;

    console.log('designSystemDna', JSON.stringify(sampling[i]))
    setDesignSystemDna(sampling[i]);
  }, [setDesignSystemDna, sampling]);

  const generateRandomCallback = useCallback(() => {
    (async () => {
      setGeneration(await generateFirstGenerationAsync(GENERATION_SIZE));
      setSampling([]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!generation?.length) {
        setGeneration(await generateFirstGenerationAsync(GENERATION_SIZE));
        return;
      }

      if (generation?.length && !sampling?.length) {
        console.log("new sampling!");
        const sampling = generation.slice(0, SAMPLING_SIZE);
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
          <button onClick={generateRandomCallback} style={{ cursor: 'pointer' }}>&#x27F3;</button>
        </div>
      </div>
      <div style={{ position: "absolute", textAlign: "center", overflow: "auto", paddingTop: "20px", backgroundColor: "#989898", top: "43px", bottom: "0", left: "0", right: "calc(100% - 150px)" }}>
        {sampling?.map((_, i) => (
          <div key={i} style={{ display: "inline-block", margin: '5px', width: "100px", height: "100px", border: designSystemDna?.genotypes === sampling[i] ? '5px solid #000' : undefined }}>
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