import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import IndividualScreen from "./individual.screen";
import {
  generateFirstGenerationAsync,
  generateNextGeneration,
  hammingDistanceFitness,
  componentMiddleSinglePointCrossOver,
  uniformMutation,
  tournamentSelection,
  useDesignSystemDna,
  truncationSelection
} from "../genetic";

type SampleListItemType = { sample: number[][], fitness: number | undefined, visible: boolean };

interface SampleListItemProps {
  index: number,
  selected: boolean,
  sample: SampleListItemType,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  onRemove?: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>, sample: SampleListItemType, index: number) => void,
  onUndoRemotion?: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, sample: SampleListItemType, index: number) => void
}

const topHeight = 63;
const EvolutionScreen = () => {
  const navigate = useNavigate();

  const [generationSize, setGenerationSize] = useState<number>(100);
  const [mutationRate, setMutationRate] = useState<number>(0.06);
  const [generationsBeforeInteraction, setGenerationsBeforeInteraction] = useState<number>(5);
  const [samplingSize, setSamplingSize] = useState<number>(20);
  const [descendantsPerIndividual, setDescendantsPerIndividual] = useState<number>(9);

  type SamplingStrategyType = "truncate" | "tournament" | "random";
  const [samplingStragegy, setSamplingStragegy] = useState<SamplingStrategyType>('truncate');

  const [designSystemDna, setDesignSystemDna] = useDesignSystemDna();
  const [generation, setGeneration] = useState<number[][][]>();
  const [sampling, setSampling] = useState<SampleListItemType[]>();
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
    setDesignSystemDna(sampling[i].sample);
  }, [setDesignSystemDna, sampling]);

  const generateNewGenerationCallback = useCallback(() => {
    (async () => {
      const chosen = designSystemDna!.genotypes;
      let population = generation;

      for (let i = 0; i < generationsBeforeInteraction; i++) {
        population = generateNextGeneration(
          chosen,
          population!,
          {
            mutationRate: mutationRate,
            generationSize: generationSize,
            descendantsPerIndividual: descendantsPerIndividual,

            fitnessFunction: hammingDistanceFitness,
            selectionFunction: tournamentSelection,
            crossoverFunction: componentMiddleSinglePointCrossOver,
            mutationFunction: uniformMutation
          }
        );
        setCurrentGeneration(current => current + 1);
      }

      setCurrentInteraction(current => current + 1);
      setGeneration(population);
      setSampling([]);
    })();
  }, [designSystemDna, generation, mutationRate, generationSize, generationsBeforeInteraction, descendantsPerIndividual]);

  const onSampleRemoveCallback = useCallback((_: React.MouseEvent<HTMLDivElement, MouseEvent>, __: SampleListItemType, index: number): void => {
    if (sampling?.filter(sample => sample.visible).length === 1) {
      alert("Cannot remove the last one!")
      return;
    }
    setSampling(current => {
      if (current) {
        current[index].visible = false;

        //select previous visible element or, if not have previous visible, next visible element
        if (designSystemDna?.genotypes === current[index].sample) {
          let pointer = index;
          let found = false;
          while (++pointer < current.length) {
            if (current[pointer].visible) {
              selectSampleCallback(pointer);
              found = true;
              break;
            }
          }

          pointer = index;

          while (!found && --pointer >= 0) {
            if (current[pointer].visible) {
              selectSampleCallback(pointer);
              break;
            }
          }
        }

        return [...current];
      }
    });
  }, [designSystemDna?.genotypes, sampling, selectSampleCallback]);

  useEffect(() => {
    (async () => {
      if (!generation?.length) {
        setCurrentGeneration(current => current + 1);
        setCurrentInteraction(current => current + 1);
        setGeneration(await generateFirstGenerationAsync(generationSize));
        return;
      }

      if (generation?.length && !sampling?.length) {
        const sampling: number[][][] = [];
        if (designSystemDna) {
          const chosen = designSystemDna.genotypes;
          const fitnesses = generation.map(inidividual => hammingDistanceFitness(chosen, inidividual));

          if (samplingStragegy === 'tournament') {
            const excluded = [generation.findIndex(individual => JSON.stringify(individual) === JSON.stringify(chosen))];
            [chosen].concat(
              tournamentSelection(generation, fitnesses, samplingSize - 1, excluded)

            ).forEach(individual => sampling.push(individual));

          } else if (samplingStragegy === 'random') {
            const population = generation.filter(individual => individual !== chosen);
            [chosen].concat(Array(samplingSize - 1).fill(0).map(() => {
              const randomIndex = Math.floor(Math.random() * population.length);
              const randomIndividual = population[randomIndex];
              population.splice(randomIndex, 1); //remove to avoid duplication
              return randomIndividual;

            })).forEach(individual => sampling.push(individual));

          } else {
            truncationSelection(generation, fitnesses, samplingSize, []).forEach(individual => sampling.push(individual));
          }

          sampling.sort((a, b) => fitnesses[generation.indexOf(a)] - fitnesses[generation.indexOf(b)]);

        } else {
          generation.slice(0, samplingSize).forEach(individual => sampling.push(individual));
        }

        console.log("new sampling!");
        setSampling(sampling
          .map(sample => ({
            sample,
            fitness: currentInteraction > 1 ? hammingDistanceFitness(designSystemDna!.genotypes, sample) : undefined,
            visible: true
          })));
        selectSampleCallback(sampling[0]);
        return;
      }
    })();
  }, [designSystemDna, setDesignSystemDna, selectSampleCallback, generation, sampling, generationSize, samplingSize, samplingStragegy, currentInteraction]);

  return (
    <div style={{ position: "absolute", top: "0", bottom: "0", left: "0", right: "0" }}>
      <div style={{ position: "absolute", left: "0", right: "0", height: `${topHeight}px`, backgroundColor: "#000", textAlign: "right" }}>
        <div style={{ float: "left", margin: "13px 0 0 10px" }}>
          <button onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>&larr;</button>
        </div>
        <div style={{ float: "right", margin: "13px 10px 0 10px" }}>
          <button onClick={generateNewGenerationCallback} style={{ cursor: 'pointer' }}>NEXT</button>
        </div>
        <div style={{ float: "right", margin: "13px 10px 0 10px", color: '#fff' }}>
          <span>Interaction: {currentInteraction}</span>
        </div>
        <div style={{ float: "right", margin: "13px 10px 0 10px", color: '#fff' }}>
          <span>Generation: {currentGeneration}</span>
        </div>
        <div style={{ float: "right", margin: "13px 10px 0 10px", color: '#fff' }}>
          <div>Generations Before Interaction: </div>
          <input type="number" style={{ width: "40px", textAlign: "center", padding: "2px" }}
            value={generationsBeforeInteraction}
            onChange={evt => setGenerationsBeforeInteraction(parseInt(evt.target.value) || generationsBeforeInteraction)} />
        </div>
        <div style={{ float: "right", margin: "13px 10px 0 10px", color: '#fff' }}>
          <div>Generation Size: </div>
          <input type="number" style={{ width: "40px", textAlign: "center", padding: "2px" }}
            value={generationSize}
            onChange={evt => setGenerationSize(parseInt(evt.target.value) || generationSize)} />
        </div>
        <div style={{ float: "right", margin: "13px 10px 0 10px", color: '#fff' }}>
          <div>Mutation Rate (%): </div>
          <input type="number" style={{ width: "40px", textAlign: "center", padding: "2px" }}
            value={naiveRound(mutationRate * 100, 2)}
            onChange={evt => setMutationRate(Math.min(1, Math.max(0, Number(evt.target.value) / 100)))} />
        </div>
        <div style={{ float: "right", margin: "13px 10px 0 10px", color: '#fff' }}>
          <div>Descendants Per Individual: </div>
          <input type="number" style={{ width: "40px", textAlign: "center", padding: "2px" }}
            value={descendantsPerIndividual}
            onChange={evt => setDescendantsPerIndividual(parseInt(evt.target.value) || descendantsPerIndividual)} />
        </div>
        <div style={{ float: "right", margin: "13px 10px 0 10px", color: '#fff' }}>
          <div>Sampling Size: </div>
          <input type="number" style={{ width: "40px", textAlign: "center", padding: "2px" }}
            value={samplingSize}
            onChange={evt => setSamplingSize(parseInt(evt.target.value) || samplingSize)} />
        </div>
        <div style={{ float: "right", margin: "13px 10px 0 10px", color: '#fff' }}>
          <div>Sampling Strategy: </div>
          <select onChange={evt => setSamplingStragegy(evt.target.value as SamplingStrategyType || 'truncate')}>
            <option value="truncate">Truncate</option>
            <option value="tournament">Tournament</option>
            <option value="random">Random</option>
          </select>
        </div>
      </div>
      <div
        style={{ position: "absolute", textAlign: "center", overflow: "auto", paddingTop: "20px", backgroundColor: "#989898", top: `${topHeight}px`, bottom: "0", left: "0", right: "calc(100% - 150px)" }}
      >
        {sampling?.map((_, i) => (
          <SampleListItem
            key={i}
            index={i}
            sample={sampling[i]}
            selected={designSystemDna?.genotypes === sampling[i].sample}
            onClick={() => selectSampleCallback(i)}
            onRemove={onSampleRemoveCallback}
            onUndoRemotion={(_, __, index) => {
              setSampling(current => {
                if (current) {
                  current[index].visible = true;
                  //selectSampleCallback(index);
                  return [...current];
                }
              });
            }}
          />
        ))}
      </div>
      <div style={{ position: "absolute", top: `${topHeight}px`, border: "2px solid #fff", borderLeft: "2px solid #fff", bottom: "0", left: "150px", right: "0" }}>
        {designSystemDna
          ? <IndividualScreen />
          : <h3 style={{ textAlign: "center" }}>Processando a primeira geração...</h3>}
      </div>
    </div>
  )
}

const SampleListItem = ({ index, selected, sample, onClick, onRemove, onUndoRemotion }: SampleListItemProps) => {
  const [onOver, setOnOver] = useState(false);
  const onRemoveCallback = useCallback((evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onRemove?.(evt, sample, index);
  }, [index, sample, onRemove]);

  const onUndoRemotionCallback = useCallback((evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onUndoRemotion?.(evt, sample, index);
  }, [index, sample, onUndoRemotion]);

  return (
    sample.visible
      ? (
        <div
          style={{ display: "inline-block", position: "relative", margin: '7px', width: "37px", height: "25px", borderRadius: "3px", border: selected ? '5px solid #000' : '5px solid #FFF', cursor: 'pointer', overflow: "visible" }}
          onMouseEnter={() => setOnOver(true)}
          onMouseLeave={() => setOnOver(false)}
        >
          {sample.fitness !== undefined && <div
            title={`Fitness: ${sample.fitness}`}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", right: "-10px", bottom: "-10px", width: "20px", height: "20px", borderRadius: "10px", fontSize: "10px", textAlign: "center", backgroundColor: "#555", color: "#FFF" }}
          >
            {sample.fitness}
          </div>}
          {onOver && <div
            title={`Remove Sample`}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", right: "-10px", top: "-10px", width: "18px", height: "18px", border: "1px solid red", borderRadius: "10px", fontWeight: "bolder", textAlign: "center", backgroundColor: "#FFF", color: "red" }}
            onClick={onRemoveCallback}
          >
            &#10799;
          </div>}
          <button
            style={{ width: "100%", height: "100%", border: "0", cursor: 'pointer', backgroundColor: "#FFF" }}
            onClick={onClick}>
            {index + 1}
          </button>
        </div>
      )
      : (
        <div style={{ display: "inline-block", position: "relative", margin: "7px", width: "37px", height: "37px", border: "5px solid #989898", overflow: "visible" }}>
          <button
            title="Undo Remotion"
            style={{ width: "100%", height: "100%", border: "0", cursor: 'pointer', backgroundColor: "#AAA", color: "#FFF", fontSize: "20px" }}
            onClick={onUndoRemotionCallback}>&#x21b6;</button>
        </div>
      )
  )
}

function naiveRound(num: number, decimalPlaces: number = 0) {
  const p = Math.pow(10, decimalPlaces);
  return Math.round(num * p) / p;
}

export default EvolutionScreen;