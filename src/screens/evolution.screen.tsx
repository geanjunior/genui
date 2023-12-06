import { useNavigate } from "react-router-dom";
import IndividualScreen from "./individual.screen";
import { colorPalettePhenotype, generateRandomIndividual, useDesignSystemDna } from "../genetic";
import { useCallback, useEffect, useState } from "react";

const GENERATION_SIZE = 100;
const ELITE_SIZE = 1;
const MUTATION_RATE = 1;

const SAMPLING_SIZE = 7;
const GENERATIONS_BEFORE_INTERACTION = 30;

type FitnessFunction = (chosen: number[][], individual: number[][]) => number;
type SelectionFunction = (generation: number[][][], fitnesses: number[], size: number, excludeIndexes: number[]) => number[][][];
type CrossoverFunction = (parentOne: number[][], parentTwo: number[][]) => number[][];
type MutationFunction = (individual: number[][]) => number[][];

const hammingDistanceFitness: FitnessFunction = (left: number[][], right: number[][]): number => {
  let distance = 0;
  for (let i = 0; i < left.length; i++) {
    for (let j = 0; j < left[i].length; j++) {
      if (left[i][j] !== right[i][j]) {
        distance++;
      }
    }
  }
  return distance;
}

const truncationSelection: SelectionFunction = (generation: number[][][], fitnesses: number[], size: number): number[][][] => {
  const sortedGeneration = generation.sort((a, b) => fitnesses[generation.indexOf(a)] - fitnesses[generation.indexOf(b)]);
  return sortedGeneration
    .map(individual => JSON.stringify(individual))
    .filter((individual, i, arr) => arr.indexOf(individual) === i)
    .map(individual => JSON.parse(individual))
    .slice(0, size)
};

const tournamentSelection: SelectionFunction = (generation: number[][][], fitnesses: number[], size: number, excludeIndexes: number[] = []): number[][][] => {
  const tournamentSize = generation.length * 0.1;
  const population = generation.filter((_, i) => !excludeIndexes.includes(i)).filter((item, pos, self) => {
    const itemString = JSON.stringify(item);
    return self.findIndex(obj => JSON.stringify(obj) === itemString) === pos;
  });

  return Array(size).fill(0).map(() => {
    const participants = Array(tournamentSize).fill(0).map(() => population[Math.floor(Math.random() * population.length)]);
    participants.sort((a, b) => fitnesses[generation.indexOf(a)] - fitnesses[generation.indexOf(b)]);
    population.splice(population.indexOf(participants[0]), 1)
    return participants[0];
  });
};

const middleSinglePointCrossOver: CrossoverFunction = (parentOne: number[][], parentTwo: number[][]): number[][] => {
  const middlePosition = parentOne.length / 2;
  const leftSide = parentOne.slice(0, middlePosition);
  const rightSide = parentTwo.slice(middlePosition, parentTwo.length)
  const offspring = leftSide.concat(rightSide);

  if (colorPalettePhenotype[parentOne[0][0]].length > colorPalettePhenotype[parentTwo[0][0]].length)
    offspring[0][0] = parentOne[0][0];
  if (colorPalettePhenotype[parentTwo[0][0]].length > colorPalettePhenotype[parentOne[0][0]].length)
    offspring[0][0] = parentTwo[0][0];

  return [...offspring.map(gens => [...gens])];
}

const myOwnMutationFunction: MutationFunction = (individual: number[][]) => {
  const randomGens = generateRandomIndividual();
  const mutated = [...individual];

  for (let i = 0; i < MUTATION_RATE; i++) {
    const componentIndex = Math.floor(Math.random() * individual.length);
    const genIndex = Math.floor(Math.random() * individual[componentIndex].length);

    mutated[componentIndex][genIndex] = randomGens[componentIndex][genIndex];
  }

  return mutated;
}
const generateNextGeneration = (
  chosen: number[][],
  generation: number[][][],
  fitnessFunction: FitnessFunction,
  selectionFunction: SelectionFunction,
  crossoverFunction: CrossoverFunction,
  mutationFunction: MutationFunction): number[][][] => {

  // Fitness Evaluation
  const fitnesses = generation.map(individual => fitnessFunction(chosen, individual));

  // Selection
  const selectedIndividuals = selectionFunction === truncationSelection
    ? []
    : truncationSelection(generation, fitnesses, ELITE_SIZE, []);
  const pendingSelectionCount = SAMPLING_SIZE - selectedIndividuals.length;
  const excludeIndexes = selectedIndividuals.map(individual => generation.indexOf(individual));
  selectionFunction(generation, fitnesses, pendingSelectionCount, excludeIndexes)
    .forEach(selected => selectedIndividuals.push(selected));

  // Crossover
  const offspring = [];
  for (let i = 0; i < selectedIndividuals.length - 1; i += 2) {
    const offspringIndividual = crossoverFunction(selectedIndividuals[i], selectedIndividuals[i + 1]);
    offspring.push(offspringIndividual);
  }

  // Mutation
  const mutatedOffspring = offspring.map(individual => mutationFunction(individual));

  // Replacement
  const nextGeneration = selectedIndividuals.concat(mutatedOffspring);

  return nextGeneration;
}

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
  const [currentGeneration, setCurrentGeneration] = useState<number>(0);

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
          myOwnMutationFunction
        );
      }
      setCurrentGeneration(current => current + GENERATIONS_BEFORE_INTERACTION);
      setGeneration(nextGeneration);
      setSampling([]);
    })();
  }, [designSystemDna, generation]);

  useEffect(() => {
    (async () => {
      if (!generation?.length) {
        setCurrentGeneration(current => current + 1);
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
          <button onClick={generateNewGenerationCallback} style={{ cursor: 'pointer' }}>&#x27F3;</button>
        </div>
        <div style={{ float: "right", margin: "13px 10px 0 10px", color: '#fff' }}>
          <span>Geração: {currentGeneration}</span>
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