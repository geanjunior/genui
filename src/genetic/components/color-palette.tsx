import { useState } from "react"

interface UIColorPaletteProps {
  colors: string[]
}

const UIColorPalette = ({ colors }: UIColorPaletteProps) => {
  const [size] = useState(80);

  const clickHandler = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  const boxStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "5px",
    width: `${size}px`,
    height: `${size}px`,
    textAlign: "center",
    lineHeight: `${size}px`,
    cursor: "pointer",
  };

  return <>
    {colors.map((color) =>
      <div
        key={color}
        onClick={() => clickHandler(color)}
        style={{ ...boxStyle, backgroundColor: color }}
      >{color}</div>)}
  </>
}

export type { UIColorPaletteProps }
export { UIColorPalette };