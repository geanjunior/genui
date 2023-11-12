import { useEffect, useState } from "react";
import { GenSectionAlignmentPhenotype, DnaSequence, useDesignSystemDna, GenSectionAlignmentStylePhenotype } from "../../genetic";
import React from "react";


interface GenSectionAlignmentProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  childStyle?: React.CSSProperties
}

const GenSectionAlignment = ({ children, style, childStyle, ...props }: GenSectionAlignmentProps) => {
  const [designSystemDna] = useDesignSystemDna();
  const [stylePhen, setStylePhen] = useState<React.CSSProperties | GenSectionAlignmentStylePhenotype>();
  const [_childStyle, setChildStyle] = useState<React.CSSProperties>();

  useEffect(() => {
    if (designSystemDna) {
      const sectionPhenotype = designSystemDna.phenotypes[DnaSequence.Section] as GenSectionAlignmentPhenotype;
      const defaultChildStyle = { display: 'inline-block', verticalAlign: 'text-top' };

      setStylePhen({ ...sectionPhenotype.section, ...{ boxSizing: 'border-box', width: '100%' }, ...style });
      setChildStyle({ ...sectionPhenotype.child, ...defaultChildStyle, ...childStyle });
    }
  }, [style, childStyle, designSystemDna]);

  return <section style={{ padding: 0, ...stylePhen }} {...props}>
    {React.Children.map(children, child => <div style={_childStyle}>{child}</div>)}
  </section>
}

export { GenSectionAlignment };

export type {
  GenSectionAlignmentProps
}