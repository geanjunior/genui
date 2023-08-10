import { useEffect, useState } from "react";
import { GenButtonPhenotype, designSystemConstants, useDesignSystemDna } from "../../genetic-library";

interface GenButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

const GenButton = ({ children, style, ...props }: GenButtonProps) => {
  const [designSystemDna] = useDesignSystemDna();
  const [stylePhen, setStylePhen] = useState<React.CSSProperties | GenButtonPhenotype>();

  useEffect(() => {
    if (designSystemDna) {
      setStylePhen({
        ...(designSystemDna.phenotypes[designSystemConstants.BUTTON_INDEX] as GenButtonPhenotype),
        ...style
      });
    }
  }, [style, designSystemDna]);

  return <>
    <button style={stylePhen} {...props}>{children}</button>
  </>
}

export default GenButton;

export type {
  GenButtonProps
}