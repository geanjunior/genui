import { useCallback, useEffect, useRef, useState } from "react";
import { GenButtonPhenotype, DnaSequence, useDesignSystemDna, doShadeColor, rgbToHex } from "../../genetic";

interface GenButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

const GenButton = ({ children, style, ...props }: GenButtonProps) => {
  const [designSystemDna] = useDesignSystemDna();
  const [stylePhen, setStylePhen] = useState<React.CSSProperties | GenButtonPhenotype>();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (designSystemDna) {
      setStylePhen({
        ...(designSystemDna.phenotypes[DnaSequence.Button] as GenButtonPhenotype),
        ...style
      });
    }
  }, [style, designSystemDna]);

  const mouseOverCallback = useCallback(() => {
    if (buttonRef?.current) {
      buttonRef.current.style.backgroundColor = stylePhen?.backgroundColor as string;
      const colorBase = rgbToHex(buttonRef.current.style.backgroundColor);
      buttonRef.current.style.backgroundColor = doShadeColor(colorBase, 25);
    }
  }, [buttonRef, stylePhen]);

  const mouseOutCallback = useCallback(() => {
    if (buttonRef?.current) {
      buttonRef.current.style.backgroundColor = stylePhen?.backgroundColor as string;
    }
  }, [buttonRef, stylePhen]);

  const mouseDownCallback = useCallback(() => {
    if (buttonRef?.current) {
      const colorBase = stylePhen?.backgroundColor as string;
      buttonRef.current.style.backgroundColor = doShadeColor(colorBase, 50);
    }
  }, [buttonRef, stylePhen]);

  return <>
    <button
      ref={buttonRef}
      style={{ ...stylePhen }}
      onMouseOverCapture={mouseOverCallback}
      onMouseOutCapture={mouseOutCallback}
      onMouseDownCapture={mouseDownCallback}
      onMouseUpCapture={mouseOverCallback}
      {...props}>{children}</button>
  </>
}

export { GenButton };

export type {
  GenButtonProps
}