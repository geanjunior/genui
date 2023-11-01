import { useCallback, useEffect, useState } from "react";
import { GenSelectInputPhenotype, DnaSequence, useDesignSystemDna, GenSelectInputStylePhenotype, GenLabel } from "..";
import React from "react";

type GenSelectInputElement = (HTMLElement | HTMLSelectElement) & {
  value: string | number | readonly string[] | undefined
};

interface GenSelectInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLElement>, HTMLElement> {
  label?: string
  ref?: React.RefObject<GenSelectInputElement>
}

interface GenSelectOptionProps {
  name?: string,
  label?: string,
  placeholder?: boolean,
  style?: React.CSSProperties
  value?: string | number | readonly string[],
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const GenSelectOption = ({ name, label, value, placeholder, onChange }: GenSelectOptionProps) => {
  const [designSystemDna] = useDesignSystemDna();
  const [stylePhen, setStylePhen] = useState<React.CSSProperties>();
  const [_variation, setVariation] = useState<number>(0);

  useEffect(() => {
    if (designSystemDna) {
      const phenotype = designSystemDna.phenotypes[DnaSequence.SelectInput] as GenSelectInputPhenotype;
      setVariation(phenotype.variation);
      setStylePhen({ color: phenotype.input.color, lineHeight: phenotype.input.lineHeight });
    }
  }, [designSystemDna]);

  return _variation == 0
    ? <option value={value} hidden={placeholder}>{label}</option>
    : <GenLabel style={{ ...stylePhen, display: 'block', textAlign: 'left' }}>
      <input type="radio" name={name} value={value} onChange={onChange} /> {label}
    </GenLabel>;
}

const GenSelectInput = React.forwardRef(({ label, id, style, value, placeholder, children, onChange, ...props }: GenSelectInputProps, ref) => {
  const [designSystemDna] = useDesignSystemDna();
  const [stylePhen, setStylePhen] = useState<React.CSSProperties | GenSelectInputStylePhenotype>();
  const [_variation, setVariation] = useState<number>(0);
  const [_label, setLabel] = useState<number>(0);
  const [_value, setValue] = useState<string | number | readonly string[] | undefined>(value || '');

  const [changeEvent, setChangeEvent] = useState<React.ChangeEvent<GenSelectInputElement>>();

  const changeCallback = useCallback((evt: React.ChangeEvent<GenSelectInputElement | HTMLInputElement>) => {
    setChangeEvent(evt);
    setValue(evt.target.value);
  }, []);

  useEffect(() => {
    if (designSystemDna) {
      const phenotype = designSystemDna.phenotypes[DnaSequence.SelectInput] as GenSelectInputPhenotype;
      setVariation(phenotype.variation);
      setLabel(phenotype.label);
      setStylePhen({
        ...phenotype.input,
        ...style
      });
    }
  }, [style, designSystemDna]);

  useEffect(() => {
    const targetValue = changeEvent?.target.value;
    if (changeEvent && _value == targetValue) {
      onChange?.(changeEvent);
      setChangeEvent(undefined);
    }
  }, [_value, changeEvent, onChange]);

  const input = _variation == 0
    ? <select
      id={id}
      ref={ref as React.LegacyRef<HTMLSelectElement>}
      style={{ ...stylePhen, textAlign: 'left' }}
      {...(props as React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>)}
      onChange={changeCallback}
    >{placeholder || _label === 0
      ? <>
        <GenSelectOption placeholder value={undefined} label={_label === 0 ? placeholder || label : placeholder} />
        {children}
      </>
      : children}</select>
    : <div style={{ ...stylePhen }} title={placeholder}>
      {(() => {
        const name = `select-input-name-${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}`;
        return <>
          {(placeholder || _label == 0) && <div style={{ textAlign: 'left', overflow: 'hidden' }}>{placeholder || label}</div>}
          <div style={{ overflowY: 'auto', maxHeight: '150px' }}>
            {React.Children.map(children,
              child => React.cloneElement(child as React.ReactElement<GenSelectOptionProps>, { name, onChange: changeCallback }))}
          </div>
        </>
      })()}
    </div>;

  return <div style={{ display: 'inline-block' }}>
    {(() => {
      switch (_label) {
        case 1: return <>
          <div style={{ display: 'table-cell', verticalAlign: _variation == 0 ? undefined : 'top' }}>
            <GenLabel
              htmlFor={id}
              style={{ display: 'inline-block', marginRight: '10px', marginTop: stylePhen?.paddingTop }}
            >{label}</GenLabel>
          </div>
          <div style={{ display: 'table-cell' }}>
            {input}
          </div>
        </>

        case 2: return <>
          <div style={{ textAlign: 'left', paddingLeft: stylePhen?.borderWidth }}>
            <GenLabel
              htmlFor={id}
              style={{ display: 'inline-block', marginBottom: '5px' }}
            >{label}</GenLabel>
          </div>
          <div>
            {input}
          </div>
        </>

        default: return <>
          {input}
        </>
      }
    })()}
  </div>
});

export { GenSelectInput, GenSelectOption };

export type {
  GenSelectInputElement,
  GenSelectInputProps
}