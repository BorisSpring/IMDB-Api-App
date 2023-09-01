import { ThemeProvider, createTheme } from "@mui/material";
import { createContext, useMemo, useState } from "react";

export const ToggleColorContext = createContext();

export function ToggleColorProvider({ children }) {
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  return (
    <ToggleColorContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ToggleColorContext.Provider>
  );
}
