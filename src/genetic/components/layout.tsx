import { useEffect, useState } from "react";
import { GenLayoutPhenotype, DnaSequence, useDesignSystemDna } from "../../genetic";

import "./layout.css";

interface GenLayoutProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

const GenLayout = ({ children, style, ...props }: GenLayoutProps) => {
  const [designSystemDna] = useDesignSystemDna();
  const [stylePhen, setStylePhen] = useState<React.CSSProperties | GenLayoutPhenotype>();

  useEffect(() => {
    if (designSystemDna) {
      setStylePhen({
        ...(designSystemDna.phenotypes[DnaSequence.Layout] as GenLayoutPhenotype),
        ...style
      });
    }
  }, [style, designSystemDna]);

  return <>
    <div className="gen-layout" style={{ ...stylePhen }} {...props}>{children}</div>
  </>
}

export { GenLayout };

export type {
  GenLayoutProps
}