import { useCallback, useEffect, useMemo, useState } from "react";
import { GenTextInputPhenotype, DnaSequence, useDesignSystemDna, GenInputStylePhenotype, GenLabel, doShadeColor, hexToRgb, calculateColorLuminance, GenInputPhenotype } from "..";
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
  const [stylePhen, setStylePhen] = useState<React.CSSProperties | GenInputStylePhenotype>();
  const [_rows, setRows] = useState<number>(rows || 1);
  const [_label, setLabel] = useState<number>(0);
  const [_value, setValue] = useState<string | number | readonly string[] | undefined>(value || '');
  const [_inputPhenotype, setInputPhenotype] = useState<GenInputPhenotype>();

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
      const inputPhenotype = designSystemDna.phenotypes[DnaSequence.Input] as GenInputPhenotype;
      const textInputPhenotype = designSystemDna.phenotypes[DnaSequence.TextInput] as GenTextInputPhenotype;

      setInputPhenotype(inputPhenotype);
      setRows(rows || textInputPhenotype.rows);
      setLabel(inputPhenotype.label);
      setStylePhen({
        boxSizing: 'border-box',
        ...inputPhenotype.input,
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

  return <div style={{ display: 'inline-block', width: (stylePhen as React.CSSProperties)?.width }}>
    <style>{placeholderStyle}</style>
    {(() => {
      switch (_label) {
        case 1: return <>
          <div style={{ display: 'table-cell', ...(_rows === 1 ? {} : _inputPhenotype?.labelBox) }}>
          <GenLabel
            htmlFor={id}
            style={{ display: 'inline-block', marginRight: '10px' }}
          >{label}</GenLabel>
        </div >
          <div style={{ display: 'table-cell', width: (stylePhen as React.CSSProperties)?.width }}>
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
    }) ()}
  </div >
});

export { GenTextInput };

export type {
  GenTextInputElement,
  GenTextInputProps
}