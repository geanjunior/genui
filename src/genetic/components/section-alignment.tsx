import { useEffect, useState } from "react";
import { GenSectionAlignmentPhenotype, DnaSequence, useDesignSystemDna, GenSectionAlignmentStylePhenotype } from "../../genetic";
import React from "react";


interface GenSectionAlignmentProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {

}

const GenSectionAlignment = ({ children, style, ...props }: GenSectionAlignmentProps) => {
  const [designSystemDna] = useDesignSystemDna();
  const [stylePhen, setStylePhen] = useState<React.CSSProperties | GenSectionAlignmentStylePhenotype>();
  const [childStyle, setChildStyle] = useState<React.CSSProperties>();

  useEffect(() => {
    if (designSystemDna) {
      const sectionPhenotype = designSystemDna.phenotypes[DnaSequence.Section] as GenSectionAlignmentPhenotype;
      const childStyle = { display: 'inline-block', verticalAlign: 'text-top' };

      setStylePhen({ ...sectionPhenotype.section, ...style });
      setChildStyle({ ...sectionPhenotype.child, ...childStyle });
    }
  }, [style, designSystemDna]);

  return <section style={{ padding: 0 }} {...props}>
    {<div style={{ ...stylePhen }}>
      {React.Children.map(children, child => <div style={childStyle}>{child}</div>)}
    </div>}
  </section>
}

export { GenSectionAlignment };

export type {
  GenSectionAlignmentProps
}