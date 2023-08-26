import { useEffect, useState } from "react";
import { GenParagraphPhenotype, DnaSequence, useDesignSystemDna } from "..";

interface GenParagraphProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {

}

const GenParagraph = ({ children, style, ...props }: GenParagraphProps) => {
  const [designSystemDna] = useDesignSystemDna();
  const [stylePhen, setStylePhen] = useState<React.CSSProperties | GenParagraphPhenotype>();

  useEffect(() => {
    if (designSystemDna) {
      setStylePhen({
        ...(designSystemDna.phenotypes[DnaSequence.Paragraph] as GenParagraphPhenotype),
        ...style
      });
    }
  }, [style, designSystemDna]);

  return <>
    <p style={{ ...stylePhen }} {...props}>{children}</p>
  </>
}

export { GenParagraph }

export type {
  GenParagraphProps
}