import { useEffect, useState } from "react";
import { GenLabelPhenotype, DnaSequence, useDesignSystemDna } from "../../genetic";

interface GenHeaderProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {

}

const GenHeader = ({ children, style, ...props }: GenHeaderProps) => {
  const [designSystemDna] = useDesignSystemDna();
  const [stylePhen, setStylePhen] = useState<React.CSSProperties | GenLabelPhenotype>();

  useEffect(() => {
    if (designSystemDna) {
      setStylePhen({
        ...(designSystemDna.phenotypes[DnaSequence.Header] as GenLabelPhenotype),
        ...style
      });
    }
  }, [style, designSystemDna]);

  return <>
    <h1 style={{ ...stylePhen }} {...props}>{children}</h1>
  </>
}

export { GenHeader }

export type {
  GenHeaderProps
}