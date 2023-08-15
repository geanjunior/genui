import { useCallback, useState } from "react"

interface UIColorPaletteProps {
  colors: string[]
}

const UIColorPalette = ({ colors }: UIColorPaletteProps) => {
  const [isMouseOver, setIsMouseOver] = useState("");
  const [size] = useState(80);

  const clickHandler = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  const mouseOverCallback = useCallback((color: string) => {
    setIsMouseOver(color);
  }, []);

  const mouseOutCallback = useCallback(() => {
    setIsMouseOver("");
  }, []);

  const boxStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "5px",
    width: `${size}px`,
    height: `${size}px`,
    textAlign: "center",
    lineHeight: `${size - 32}px`,
    cursor: "pointer",
    fontFamily: "sans-serif",
    fontWeight: "700",
    color: "#E2E2E2",
    textShadow: "0 25px #525252",
  };

  return <div style={{ display: "inline-block", border: "3px solid #FFFFFF", height: `${size}px`, overflow: "hidden" }}>
    {colors.map((color) =>
      <div
        key={color}
        onMouseOver={() => mouseOverCallback(color)}
        onMouseOut={mouseOutCallback}
        onClick={() => clickHandler(color)}
        style={{ ...boxStyle, backgroundColor: color }}
      >{isMouseOver === color ? color : ""}</div>)}
  </div>
}

export type { UIColorPaletteProps }
export { UIColorPalette };