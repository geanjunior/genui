import { useCallback, useState } from "react"

interface UIColorPaletteProps {
  colors: string[]
}

const UIColorPalette = ({ colors }: UIColorPaletteProps) => {
  const [isMouseOver, setIsMouseOver] = useState("");
  const [size] = useState(30);

  const clickHandler = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  const mouseOverCallback = useCallback((color: string) => {
    setIsMouseOver(color);
  }, []);

  const mouseOutCallback = useCallback(() => {
    setIsMouseOver("");
  }, []);

  const componentStyle: React.CSSProperties = {
    display: "inline-block",
    border: "2px solid #C2C2C2",
    boxShadow: "0 0 3px #565656",
    borderRadius: "5px",
    height: `${size + 6}px`,
    overflow: "hidden"
  }

  const boxStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "5px",
    width: `${size}px`,
    height: `${size}px`,
    textAlign: "center",
    lineHeight: `${size - 15}px`,
    cursor: "pointer",
    fontSize: "8px",
    fontFamily: "sans-serif",
    fontWeight: "700",
    color: "#E2E2E2",
    textShadow: "0 15px #525252",
    overflow: "hidden"
  }

  return <div style={componentStyle}>
    {colors.map((color, i) =>
      <div
        key={i}
        onMouseOver={() => mouseOverCallback(color)}
        onMouseOut={mouseOutCallback}
        onClick={() => clickHandler(color)}
        style={{ ...boxStyle, backgroundColor: color }}
      >{isMouseOver === color ? color : ""}</div>)}
  </div>
}

export type { UIColorPaletteProps }
export { UIColorPalette };