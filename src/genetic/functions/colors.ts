const rgbToHex = (rgb: string) => {
  return rgb.replace("rgba", "").replace("rgb", "").replace("(", "").replace(")", "")
    .split(",")
    .map((s, i) => (i < 3
      ? parseInt(s.trim()).toString(16)
      : Math.round(parseFloat(s.trim()) * 255).toString(16)
    ).padStart(2, "0"))
    .reduce((prev, current) => `${prev}${current}`, "#");
}

//https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o

const hexToRgb = (colorHex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  colorHex = colorHex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHex);

  if (!result)
    throw new Error(`Invalid color "${colorHex}"`);

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
}

const calculateColorLuminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

const calculateColorsContrastRatio = (colorHex1: string, colorHex2: string) => {
  const color1rgb = hexToRgb(colorHex1);
  const color2rgb = hexToRgb(colorHex2);
  const color1luminance = calculateColorLuminance(color1rgb.r, color1rgb.g, color1rgb.b);
  const color2luminance = calculateColorLuminance(color2rgb.r, color2rgb.g, color2rgb.b);
  const ratio = color1luminance > color2luminance
    ? ((color2luminance + 0.05) / (color1luminance + 0.05))
    : ((color1luminance + 0.05) / (color2luminance + 0.05));
  return ratio;
}

//https://natclark.com/tutorials/javascript-lighten-darken-hex-color/
const doShadeColor = (hexColor: string, magnitude: number) => {
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
    return hexColor;
  }
};

export {
  rgbToHex,
  calculateColorsContrastRatio,
  doShadeColor
}