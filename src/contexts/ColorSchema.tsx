import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

const ColorModeContext = createContext({toggleColorMode: () => { }})

export const ColorSchemaProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    const colorSchema = localStorage.getItem("color-schema") as PaletteMode
    if (colorSchema) {
      setMode(colorSchema)
    }
  }, [])

  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...mode === "light" ?
        {
          primary: {
            main: "#12BB59",
            contrastText: "#000"
          },
          background: {
            default: "rgb(242, 244, 245)",
            paper: "#fff",
          },
          text: {
            primary: "#000",
          },
        }
        :
        {
          primary: {
            main: "#12BB59",
            contrastText: "#000",
          },
          background: {
            default: "#3e3e42",
            paper: "#252526",
          },
          text: {
            primary: "#fff",
          },
        },
    },
  })

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          if (prevMode === "light") {
            localStorage.setItem("color-schema", "dark")
          }
          else {
            localStorage.setItem("color-schema", "light")
          }
          return prevMode === 'light' ? 'dark' : 'light'
        }
        )
      },
    }),
    [],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

const useColorSchema = () => useContext(ColorModeContext)

export default useColorSchema