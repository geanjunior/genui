interface UITypographyProps {
  fonts: string[]
}

const UITypography = ({ fonts }: UITypographyProps) => {
  return <div style={{ textAlign: "right" }}>{fonts.map((font, i) => <div key={i}>{font}</div>)}</div>;
}

export { UITypography };