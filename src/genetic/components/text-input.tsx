import { useCallback, useEffect, useState } from "react";
import { GenTextInputPhenotype, DnaSequence, useDesignSystemDna, GenTextInputStylePhenotype } from "..";
import React from "react";

type GenTextInputElement = (HTMLElement | HTMLInputElement | HTMLTextAreaElement) & {
  value: string | number | readonly string[] | undefined
};

interface GenTextInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLElement>, HTMLElement> {
  rows?: number
  ref?: React.RefObject<GenTextInputElement>
}

const GenTextInput = React.forwardRef(({ style, value, rows, onChange, ...props }: GenTextInputProps, ref) => {
  const [designSystemDna] = useDesignSystemDna();
  const [stylePhen, setStylePhen] = useState<React.CSSProperties | GenTextInputStylePhenotype>();
  const [_rows, setRows] = useState<number>(rows || 1);
  const [_value, setValue] = useState<string | number | readonly string[] | undefined>(value || '');

  const [changeEvent, setChangeEvent] = useState<React.ChangeEvent<GenTextInputElement>>();

  const changeCallback = useCallback((evt: React.ChangeEvent<GenTextInputElement>) => {
    setChangeEvent(evt);
    setValue(evt.target.value);
  }, []);

  useEffect(() => {
    if (designSystemDna) {
      const phenotype = designSystemDna.phenotypes[DnaSequence.TextInput] as GenTextInputPhenotype;
      setRows(rows || phenotype.rows);
      setStylePhen({
        ...phenotype.style,
        ...style
      });
    }
  }, [style, designSystemDna, rows]);

  useEffect(() => {
    const targetValue = (changeEvent?.target.getAttribute("value") || changeEvent?.target.textContent) as string;
    if (changeEvent && _value == targetValue) {
      onChange?.(changeEvent);
      setChangeEvent(undefined);
    }
  }, [_value, changeEvent, onChange])

  return <>
    {(_rows > 1)
      ? <textarea
        ref={ref as React.LegacyRef<HTMLTextAreaElement>}
        rows={_rows}
        style={{ ...stylePhen }}
        value={_value} {...(props as React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>)}
        onChange={changeCallback}
      />
      : <input
        ref={ref as React.LegacyRef<HTMLInputElement>}
        type="text"
        style={{ ...stylePhen }}
        value={_value} {...(props as React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>)}
        onChange={changeCallback}
      />}
  </>
});

export { GenTextInput };

export type {
  GenTextInputElement,
  GenTextInputProps
}