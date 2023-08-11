import { useCallback, useEffect } from "react";
import { generateRandomIndividual, useRandomDesignSystemDna } from "./genetic";
import GenButton from "./genetic/components/button";

function App() {
  const [ designSystemDna, setDesignSystemDna] = useRandomDesignSystemDna();

  useEffect(() => {
    console.log('designSystemDna.genotypes: ', JSON.stringify(designSystemDna?.genotypes));
    console.log('designSystemDna.phenotypes: ', JSON.stringify(designSystemDna?.phenotypes, undefined, 2));
  }, [designSystemDna]);

  const onClickCallback = useCallback(() => {
      setDesignSystemDna(generateRandomIndividual());
  }, [setDesignSystemDna]);

  return (
    <>
      <h1>Wellcome to Genetic UI</h1>
      <section>
        <GenButton onClick={onClickCallback}>Click Me!</GenButton>
      </section>
    </>
  )
}

export default App
