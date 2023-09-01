import { useCallback, useEffect, useRef, useState } from "react";
import { GenTextInputPhenotype, DnaSequence, useDesignSystemDna, GenTextInputStylePhenotype } from "..";

interface GenTextInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLElement>, HTMLElement> {

}

const GenTextInput = ({ style, value, onChange, ...props }: GenTextInputProps) => {
  const [designSystemDna] = useDesignSystemDna();
  const [stylePhen, setStylePhen] = useState<React.CSSProperties | GenTextInputStylePhenotype>();
  const [rows, setRows] = useState<number>(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const texareaRef = useRef<HTMLTextAreaElement>(null);
  const [_value, setValue] = useState<string | number | readonly string[] | undefined>(value || '');
  const [chageInputEvent, setChangeInputEvent] = useState<React.ChangeEvent<HTMLInputElement>>();
  const [chageTextAreaEvent, setChangeTextAreaEvent] = useState<React.ChangeEvent<HTMLTextAreaElement>>();

  useEffect(() => {
    if (designSystemDna) {
      const phenotype = designSystemDna.phenotypes[DnaSequence.TextInput] as GenTextInputPhenotype;
      setRows(phenotype.rows);
      setStylePhen({
        ...phenotype.style,
        ...style
      });
    }
  }, [style, designSystemDna]);

  const changeInputCallback = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setChangeInputEvent(evt);
    setValue(evt.target.value);
  }, []);

  const changeTextAreaCallback = useCallback((evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChangeTextAreaEvent(evt);
    setValue(evt.target.value);
  }, []);

  useEffect(() => {
    if (chageInputEvent && _value == chageInputEvent.target.value) {
      (onChange as React.ChangeEventHandler<HTMLInputElement>)?.(chageInputEvent);
      setChangeInputEvent(undefined);
    }
    if (chageTextAreaEvent && _value == chageTextAreaEvent.target.value) {
      (onChange as React.ChangeEventHandler<HTMLTextAreaElement>)?.(chageTextAreaEvent);
      setChangeTextAreaEvent(undefined);
    }
  }, [_value, chageInputEvent, chageTextAreaEvent, onChange])

  return <>
    {(rows > 1)
      ? <textarea ref={texareaRef} rows={rows} style={{ ...stylePhen }} value={_value} {
        ...(props as React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>)
      } onChange={changeTextAreaCallback} />
      : <input ref={inputRef} type="text" style={{ ...stylePhen }} value={_value} {
        ...(props as React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>)
      } onChange={changeInputCallback} />}
  </>
}

export { GenTextInput };

export type {
  GenTextInputProps
}