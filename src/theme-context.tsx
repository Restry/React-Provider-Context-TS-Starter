import React from "react";
import { useAppReducer } from "./reducer";
interface ThemeType {
  light: ThemeItemType;
  dark: ThemeItemType;
}
interface ThemeItemType {
  foreground: string;
  background: string;
}

export const themes: ThemeType = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

export const ThemeContext = React.createContext(themes.light);

export function ThemeProvider(props: any) {
  const { state } = useAppReducer();
  const value = React.useMemo(() => state.theme, [state.theme]);
  return <ThemeContext.Provider value={themes[value]} {...props} />;
}

export function useThemeState() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error(`useapp must be used within a appProvider`);
  }

  return context;
}
