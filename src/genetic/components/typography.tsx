interface UITypographyProps {
  fonts: string[]
}

const UITypography = ({ fonts }: UITypographyProps) => {
  return <div style={{ textAlign: "right" }}>{fonts.map((font, i) => <div style={{fontFamily: font}} key={i}>{font}</div>)}</div>;
}

export { UITypography };