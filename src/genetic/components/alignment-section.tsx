import { useEffect, useState } from "react";
import { GenAlignmentSectionPhenotype, DnaSequence, useDesignSystemDna, GenAlignmentSectionStylePhenotype } from "..";
import React from "react";


interface GenAlignmentSectionProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  childStyle?: React.CSSProperties
}

const GenAlignmentSection = ({ children, style, childStyle, ...props }: GenAlignmentSectionProps) => {
  const [designSystemDna] = useDesignSystemDna();
  const [stylePhen, setStylePhen] = useState<React.CSSProperties | GenAlignmentSectionStylePhenotype>();
  const [_childStyle, setChildStyle] = useState<React.CSSProperties>();
  const [_maxWidth, setMaxWidth] = useState<string>('100%');

  useEffect(() => {
    if (designSystemDna) {
      const sectionPhenotype = designSystemDna.phenotypes[DnaSequence.Section] as GenAlignmentSectionPhenotype;
      const defaultChildStyle = { display: 'inline-block', verticalAlign: 'text-top' };

      setMaxWidth(sectionPhenotype.maxWidth);
      setStylePhen({ ...sectionPhenotype.section, ...{ boxSizing: 'border-box', width: '100%', maxWidth: _maxWidth, display: 'inline-block' }, ...style });
      setChildStyle({ ...sectionPhenotype.child, ...defaultChildStyle, ...childStyle });
    }
  }, [style, childStyle, _maxWidth, designSystemDna]);

  return <section style={{ padding: 0, ...stylePhen }} {...props}>
    {React.Children.map(children, child => <div style={_childStyle}>{child}</div>)}
  </section>
}

export { GenAlignmentSection };

export type {
  GenAlignmentSectionProps
}