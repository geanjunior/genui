import { generateRandomIndividual } from "..";

const SELECTION_SIZE = 10;

type FitnessFunction = (chosen: number[][], individual: number[][]) => number;
type SelectionFunction = (generation: number[][][], fitnesses: number[], size: number, excludeIndexes: number[]) => number[][][];
type CrossoverFunction = (parentOne: number[][], parentTwo: number[][]) => number[][];
type MutationFunction = (individual: number[][], rate: number) => number[][];

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
  const population = [...generation];
  const sortedGeneration = population.sort((a, b) => fitnesses[generation.indexOf(a)] - fitnesses[generation.indexOf(b)]);

  const uniqueGeneration = sortedGeneration.reduce((acc, individual) => {
    const key = JSON.stringify(individual);
    if (!acc.has(key)) {
      acc.set(key, individual);
    }
    return acc;
  }, new Map());

  return Array.from(uniqueGeneration.values()).slice(0, size);
};

const tournamentSelection: SelectionFunction = (generation: number[][][], fitnesses: number[], size: number, excludeIndexes: number[] = []): number[][][] => {
  const tournamentSize = Math.floor(generation.length * 0.1);

  const population = generation
    .filter((item, pos, self) => {
      if (excludeIndexes.includes(pos))
        return false;
      const itemString = JSON.stringify(item);
      if (excludeIndexes.some(excluded => JSON.stringify(self[excluded]) === itemString)) {
        return false;
      }
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
  const middlePosition = Math.round(parentOne.length / 2);
  const leftSide = parentOne.slice(0, middlePosition);
  const rightSide = parentTwo.slice(middlePosition, parentTwo.length);
  const offspring = leftSide.concat(rightSide);

  return [...offspring.map(gens => [...gens])];
}

const componentMiddleSinglePointCrossOver: CrossoverFunction = (parentOne: number[][], parentTwo: number[][]): number[][] => {
  const offspring: number[][] = [];
  for (let i = 0; i < parentOne.length; i++) {
    const middlePosition = Math.round(parentOne[i].length / 2);
    const leftSide = parentOne[i].slice(0, middlePosition);
    const rightSide = parentTwo[i].slice(middlePosition, parentTwo[i].length);
    offspring[i] = [...leftSide].concat([...rightSide]);
  }
  return offspring;
}

const uniformMutation: MutationFunction = (individual: number[][], rate: number) => {
  const randomGens = generateRandomIndividual();
  const mutated = [...individual.map(component => [...component])];

  for (let i = 0; i < individual.length; i++) {
    for (let k = 0; k < individual[i].length; k++) {
      if (Math.random() < rate) {
        mutated[i][k] = randomGens[i][k];
      }
    }
  }
  return mutated;
}

const generateNextGeneration = (
  chosen: number[][],
  generation: number[][][],
  parameters: {
    mutationRate?: number,
    generationSize?: number,
    descendantsPerIndividual?: number,

    fitnessFunction?: FitnessFunction,
    selectionFunction?: SelectionFunction,
    crossoverFunction?: CrossoverFunction,
    mutationFunction?: MutationFunction
  }): number[][][] => {

  //parameters
  const mutationRate = parameters.mutationRate || Math.random();
  const generationSize = parameters.generationSize || generation.length;
  const descendantsPerIndividual = parameters.descendantsPerIndividual || 2;

  const fitnessFunction = parameters.fitnessFunction || hammingDistanceFitness;
  const selectionFunction = parameters.selectionFunction || tournamentSelection;
  const crossoverFunction = parameters.crossoverFunction || componentMiddleSinglePointCrossOver;
  const mutationFunction = parameters.mutationFunction || uniformMutation;

  // Fitness Evaluation
  const fitnesses = generation.map(individual => fitnessFunction(chosen, individual));

  // Selection
  const selectedIndividuals = [chosen];
  const pendingSelectionCount = Math.max(0, SELECTION_SIZE - selectedIndividuals.length);

  if (pendingSelectionCount) {
    const excludeIndexes = selectedIndividuals.map(individual => generation.findIndex(pop => JSON.stringify(pop) === JSON.stringify(individual)));
    selectionFunction(generation, fitnesses, pendingSelectionCount, excludeIndexes)
      .forEach(selected => selectedIndividuals.push(selected));
  }
  selectedIndividuals.sort((a, b) => fitnesses[generation.indexOf(a)] - fitnesses[generation.indexOf(b)]);

  // Crossover
  const descendantCount: { [key: number]: number } = {};
  const offspring = [];
  for (let i = 0; i < selectedIndividuals.length; i++) {
    for (let j = 0; j < selectedIndividuals.length; j++) {
      if (i != j) {
        const leftIndex = generation.indexOf(selectedIndividuals[i]);
        const rightIndex = generation.indexOf(selectedIndividuals[j]);
        descendantCount[leftIndex] = descendantCount[leftIndex] ? descendantCount[leftIndex] + 1 : 1;
        descendantCount[rightIndex] = descendantCount[rightIndex] ? descendantCount[rightIndex] + 1 : 1;

        if (descendantCount[leftIndex] <= descendantsPerIndividual && descendantCount[rightIndex] <= descendantsPerIndividual) {
          offspring.push(crossoverFunction(selectedIndividuals[i], selectedIndividuals[j]));
        }
      }
    }
  }
  const notSelected = generation.filter(individual => !selectedIndividuals.some(selected => individual === selected));
  for (let i = 0; i < selectedIndividuals.length; i++) {
    for (let j = 0; j < notSelected.length; j++) {
      offspring.push(crossoverFunction(selectedIndividuals[i], notSelected[j]));
    }
  }

  // Mutation
  const mutatedOffspring = offspring.map(individual => mutationFunction(individual, mutationRate));

  // Replacement
  const nextGeneration = Array.from(selectedIndividuals.concat(mutatedOffspring)
    .reduce((acc, individual) => {
      const key = JSON.stringify(individual);
      if (!acc.has(key)) {
        acc.set(key, individual);
      }
      return acc;
    }, new Map())
    .values());

  console.log('nextGeneration.length', nextGeneration.length);
  return nextGeneration.slice(0, generationSize || generation.length);
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

export type {
  FitnessFunction,
  SelectionFunction,
  CrossoverFunction,
  MutationFunction
}

export {
  hammingDistanceFitness,

  truncationSelection,
  tournamentSelection,

  middleSinglePointCrossOver,
  componentMiddleSinglePointCrossOver,

  uniformMutation,

  generateFirstGenerationAsync,
  generateNextGeneration
}