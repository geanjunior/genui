import { useEffect, useState } from "react";
import { GenButtonPhenotype, DnaSequence, useDesignSystemDna } from "../../genetic";

interface GenButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

const GenButton = ({ children, style, ...props }: GenButtonProps) => {
  const [designSystemDna] = useDesignSystemDna();
  const [stylePhen, setStylePhen] = useState<React.CSSProperties | GenButtonPhenotype>();

  useEffect(() => {
    if (designSystemDna) {
      setStylePhen({
        ...(designSystemDna.phenotypes[DnaSequence.Button] as GenButtonPhenotype),
        ...style
      });
    }
  }, [style, designSystemDna]);

  return <>
    <button style={{ ...stylePhen }} {...props}>{children}</button>
  </>
}

export { GenButton };

export type {
  GenButtonProps
}