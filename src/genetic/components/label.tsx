import { useEffect, useState } from "react";
import { DnaSequence, GenLabelPhenotype, useDesignSystemDna } from "..";

interface GenLabelProps extends React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
}

const GenLabel = ({ children, style, htmlFor, ...props }: GenLabelProps) => {
  const [designSystemDna] = useDesignSystemDna();
  const [stylePhen, setStylePhen] = useState<React.CSSProperties | GenLabelPhenotype>();

  useEffect(() => {
    if (designSystemDna) {
      const phenotype = designSystemDna.phenotypes[DnaSequence.Label] as GenLabelPhenotype;
      setStylePhen({
        ...phenotype,
        ...style
      });
    }
  }, [style, designSystemDna]);

  return <label htmlFor={htmlFor} style={{ ...stylePhen }} {...props}>{children}</label>
};

export { GenLabel };