import {
  DnaSequence,
  GenAlignmentSection,
  GenButton,
  GenHeader,
  GenLayout,
  GenParagraph,
  GenSection,
  GenSelectInput,
  GenSelectInputElement,
  GenSelectOption,
  GenTextInput,
  GenTextInputElement
} from "../genetic";

const UserInterface = () => {
  return <GenLayout>
    <GenHeader>Wellcome to Genetic UI</GenHeader>
    <GenSection>
      <GenParagraph>
        GeneticUI is a cutting-edge React library that introduces genetic algorithms into UI design.
        By leveraging real-time interactivity, programmers and designers can modify design variables
        like colors and spacing, causing the genetic algorithm to evolve UI components accordingly.
        This innovative approach leads to a collaborative and ever-changing UI experience,
        reflecting the dynamic nature of genetic evolution.
      </GenParagraph>

      <form>
        <GenSection sectionType={DnaSequence.SecondSection}>
          <GenSelectInput id="selector" label="Choose"
            //placeholder="Choose one option..."
            onChange={(evt: React.ChangeEvent<GenSelectInputElement>) => { console.log(evt.target.value); }}>
            <GenSelectOption label="Option One" value={1} />
            <GenSelectOption label="Option Two" value={"2"} />
            <GenSelectOption label="Option Three" value={"three"} />
            <GenSelectOption label="Option Four" value={4} />
            <GenSelectOption label="Option Five" value={"5"} />
            <GenSelectOption label="Option Six" value={"six"} />
            <GenSelectOption label="Option Seven" value={7} />
            <GenSelectOption label="Option Eight" value={"8"} />
            <GenSelectOption label="Option Nine" value={"nine"} />
          </GenSelectInput>

          <GenTextInput id="test-label" label="Label"
            placeholder="Put your text here..."
            onChange={(evt: React.ChangeEvent<GenTextInputElement>) => { console.log(evt.target.value); }} />
          
          <GenTextInput id="test-label2" label="Label" rows={1}
            value={'Typed text...'}
            onChange={(evt: React.ChangeEvent<GenTextInputElement>) => { console.log(evt.target.value); }} />
        </GenSection>

        <GenAlignmentSection>
          <GenButton onClick={(evt) => {
            setTimeout(() => alert("Button was clicked!"), 0);
            evt.preventDefault();
          }}>Button</GenButton>
        </GenAlignmentSection>
      </form>
    </GenSection>
  </GenLayout>
}

export default UserInterface;