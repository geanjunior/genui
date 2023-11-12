import { useEffect, useState } from "react";
import { GenSectionPhenotype, DnaSequence, useDesignSystemDna, GenSectionStylePhenotype, GenSectionAlignment } from "../../genetic";
import React from "react";


interface GenSectionProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {

}

const GenSection = ({ children, style, ...props }: GenSectionProps) => {
  const [designSystemDna] = useDesignSystemDna();
  const [stylePhen, setStylePhen] = useState<React.CSSProperties | GenSectionStylePhenotype>();
  const [childStyle, setChildStyle] = useState<React.CSSProperties>();
  const [_variation, setVariation] = useState<number>(0);
  const [_columns, setColumns] = useState<number>(1);

  useEffect(() => {
    if (designSystemDna) {
      const sectionPhenotype = designSystemDna.phenotypes[DnaSequence.Section] as GenSectionPhenotype;
      let sectionStyle = { padding: 0 };
      let childStyle = { display: 'inline-block', verticalAlign: 'text-top' };

      switch (sectionPhenotype.variation) {
        case 1:
          sectionStyle = { ...sectionStyle, ...{ display: 'flex' } };
          childStyle = { ...childStyle, ...{ display: 'flex', flex: 1, flexBasis: '100%' } };
          break;
        default:
          childStyle = { ...childStyle, ...{ width: `${[100, 45, 28][sectionPhenotype.columns - 1]}%`, boxSizing: 'border-box' } };
          break;
      }

      setVariation(sectionPhenotype.variation);
      setColumns(sectionPhenotype.columns);
      setStylePhen({ ...sectionPhenotype.section, ...sectionStyle, ...style });
      setChildStyle({ ...sectionPhenotype.child, ...childStyle });
    }
  }, [style, designSystemDna]);

  return <section style={{padding: 0}} {...props}>
    {(() => {
      switch (_variation) {
        case 1:
          return (() => {
            const _children = React.Children.toArray(children);
            const rows = [];
            for (let i = 0; _children.length; i++) {
              const cols = _children.splice(0, _columns);
              rows.push(<div style={{ ...stylePhen }} key={`${props.id}_${i}`}>
                {cols.map((child, k) => <div key={`${props.id}_${i}_${k}`} style={childStyle}>{child}</div>)}
              </div>);
            }
            return rows;
          })()
        default:
          return <GenSectionAlignment {...props}>{children}</GenSectionAlignment>;
      }
    })()}
  </section>
}

export { GenSection };

export type {
  GenSectionProps
}