import { useCallback, useEffect } from "react";
import GenButton from "./components/button/button"
import { generateRandomIndividual, useDesignSystemRandomDna } from "./genetic-library";

function App() {
  const [ designSystemDna, setDesignSystemDna] = useDesignSystemRandomDna();

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
