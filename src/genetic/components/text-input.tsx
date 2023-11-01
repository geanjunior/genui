import { useCallback, useEffect, useMemo, useState } from "react";
import { GenTextInputPhenotype, DnaSequence, useDesignSystemDna, GenTextInputStylePhenotype, GenLabel, doShadeColor, hexToRgb, calculateColorLuminance } from "..";
import React from "react";

type GenTextInputElement = (HTMLElement | HTMLInputElement | HTMLTextAreaElement) & {
  value: string | number | readonly string[] | undefined
};

interface GenTextInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLElement>, HTMLElement> {
  label?: string
  rows?: number
  ref?: React.RefObject<GenTextInputElement>
}

const GenTextInput = React.forwardRef(({ label, id, style, value, rows, placeholder, onChange, ...props }: GenTextInputProps, ref) => {
  const [designSystemDna] = useDesignSystemDna();
  const [stylePhen, setStylePhen] = useState<React.CSSProperties | GenTextInputStylePhenotype>();
  const [_rows, setRows] = useState<number>(rows || 1);
  const [_label, setLabel] = useState<number>(0);
  const [_value, setValue] = useState<string | number | readonly string[] | undefined>(value || '');

  const [changeEvent, setChangeEvent] = useState<React.ChangeEvent<GenTextInputElement>>();

  const placeholderStyle = useMemo(() => {
    if (!stylePhen?.backgroundColor) return;

    const shadeParmeter = 70;
    const backgroundColor = stylePhen.backgroundColor;
    const backgroundColorRgb = hexToRgb(backgroundColor);
    const backgroundLuminance = calculateColorLuminance(backgroundColorRgb.r, backgroundColorRgb.g, backgroundColorRgb.b);
    const placeholderColor = doShadeColor(backgroundColor, shadeParmeter * (backgroundLuminance > 0.5 ? -1 : 1));

    return `
      ::placeholder {
        color: ${placeholderColor};
      }
      ::-webkit-input-placeholder {
        color: ${placeholderColor};
      }
      ::-moz-placeholder {
        color: ${placeholderColor};
      }
      :-ms-input-placeholder {
        color: ${placeholderColor};
      }
      :-moz-placeholder {
        color: ${placeholderColor};
      }
    `;
  }, [stylePhen?.backgroundColor]);

  const changeCallback = useCallback((evt: React.ChangeEvent<GenTextInputElement>) => {
    setChangeEvent(evt);
    setValue(evt.target.value);
  }, []);

  useEffect(() => {
    if (designSystemDna) {
      const phenotype = designSystemDna.phenotypes[DnaSequence.TextInput] as GenTextInputPhenotype;
      setRows(rows || phenotype.rows);
      setLabel(phenotype.label);
      setStylePhen({
        ...phenotype.input,
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
  }, [_value, changeEvent, onChange]);

  const input = (_rows > 1)
    ? <textarea
      id={id}
      ref={ref as React.LegacyRef<HTMLTextAreaElement>}
      rows={_rows}
      style={{ ...stylePhen }}
      value={_value}
      {...(props as React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>)}
      placeholder={_label === 0 ? placeholder || label : placeholder}
      onChange={changeCallback}
    />
    : <input
      id={id}
      ref={ref as React.LegacyRef<HTMLInputElement>}
      type="text"
      style={{ ...stylePhen }}
      value={_value}
      {...(props as React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>)}
      placeholder={_label === 0 ? placeholder || label : placeholder}
      onChange={changeCallback}
    />;

  return <div style={{ display: 'inline-block' }}>
    <style>{placeholderStyle}</style>
    {(() => {
      switch (_label) {
        case 1: return <>
          <div style={{ display: 'table-cell', verticalAlign: _rows === 1 ? 'middle' : 'top' }}>
            <GenLabel
              htmlFor={id}
              style={{ display: 'inline-block', marginRight: '10px', marginTop: _rows === 1 ? undefined : stylePhen?.paddingTop }}
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

export { GenTextInput };

export type {
  GenTextInputElement,
  GenTextInputProps
}