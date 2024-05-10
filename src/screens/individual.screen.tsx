import { useMemo } from "react";
import { DnaSequence, UITypography, UIColorPalette, useDesignSystemDna } from "../genetic";

import "./individual.screen.css"
import UserInterface from "./user-interface";

const IndividualScreen = () => {
  const [designSystemDna] = useDesignSystemDna();

  const colorPalette: string[] = useMemo(() => {
    if (designSystemDna) {
      return designSystemDna?.phenotypes[DnaSequence.ColorPalette] as string[];
    }
    return [];
  }, [designSystemDna]);

  const fonts: string[] = useMemo(() => {
    if (designSystemDna) {
      return designSystemDna?.phenotypes[DnaSequence.Typography] as string[];
    }
    return [];
  }, [designSystemDna]);

  return (
    <>
      <div style={{ position: "absolute", left: "0", right: "0", height: "43px", padding: "10px", backgroundColor: "#2C3C3C" }}>
        <div style={{ float: "right", marginLeft: "20px" }}>
          <UIColorPalette colors={colorPalette} />
        </div>
        <div style={{ float: "right", color: "#fff" }}>
          <UITypography fonts={fonts} />
        </div>
      </div>
      <div style={{ position: "absolute", top: "63px", bottom: "0", left: "0", right: "0" }}>
        <UserInterface />
      </div>
    </>
  );
}

export default IndividualScreen;
