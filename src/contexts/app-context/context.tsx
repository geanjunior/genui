import { PropsWithChildren, createContext, useState } from "react";
import { DesignSystemDna } from "../../genetic-library";

interface AppContextValues {
  designSystemDna?: DesignSystemDna,
  setDesignSystemDna?: (value: DesignSystemDna) => void,
}

const AppContext = createContext<AppContextValues>({});

const AppProvider = ({ children }: PropsWithChildren) => {
  const [designSystemDna, setDesignSystemDna] = useState<DesignSystemDna>();

  return (
    <AppContext.Provider value={{ designSystemDna, setDesignSystemDna }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };