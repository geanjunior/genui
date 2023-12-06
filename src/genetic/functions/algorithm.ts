import { generateRandomIndividual } from "..";

const GENERATION_SIZE = 100;
const SELECTION_SIZE = 5;
const ELITE_SIZE = 1;
const MUTATION_RATE = 0.1;

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

  return [...offspring.map(gens => [...gens])];
}

const uniformMutationFunction: MutationFunction = (individual: number[][]) => {
  const randomGens = generateRandomIndividual();
  const mutated = [...individual.map(component => [...component])];

  for (let i = 0; i < individual.length; i++) {
    for (let k = 0; k < individual[i].length; k++) {
      if (Math.random() < MUTATION_RATE) {
        mutated[i][k] = randomGens[i][k];
      }
    }
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
  const pendingSelectionCount = SELECTION_SIZE - selectedIndividuals.length;
  const excludeIndexes = selectedIndividuals.map(individual => generation.indexOf(individual));
  selectionFunction(generation, fitnesses, pendingSelectionCount, excludeIndexes)
    .forEach(selected => selectedIndividuals.push(selected));

  // Crossover
  const offspring = [];
  for (let i = 0; i < selectedIndividuals.length; i++) {
    for (let j = 0; j < selectedIndividuals.length; j++) {
      if (i != j)
        offspring.push(crossoverFunction(selectedIndividuals[i], selectedIndividuals[j]));
    }
  }
  const notSelected = generation.filter(individual => !selectedIndividuals.some(selected => individual === selected));
  for (let i = 0; i < selectedIndividuals.length; i++) {
    for (let j = 0; j < notSelected.length; j++) {
      offspring.push(crossoverFunction(selectedIndividuals[i], notSelected[j]));
    }
  }

  // Mutation
  const mutatedOffspring = offspring.map(individual => mutationFunction(individual));

  // Replacement
  const nextGeneration = selectedIndividuals.concat(mutatedOffspring)
    .map(individual => JSON.stringify(individual))
    .filter((individual, i, self) => self.indexOf(individual) === i)
    .map(individual => JSON.parse(individual));
  const nextGenerationFitnesses = nextGeneration.map(individual => fitnessFunction(chosen, individual));
  nextGeneration.sort((a, b) => nextGenerationFitnesses[nextGeneration.indexOf(a)] - nextGenerationFitnesses[nextGeneration.indexOf(b)]);

  return nextGeneration.slice(0, GENERATION_SIZE);
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
  GENERATION_SIZE,
  ELITE_SIZE,
  MUTATION_RATE,

  hammingDistanceFitness,

  truncationSelection,
  tournamentSelection,

  middleSinglePointCrossOver,

  uniformMutationFunction,

  generateFirstGenerationAsync,
  generateNextGeneration
}