import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import "../styles/globals.css"
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { SessionProvider } from "next-auth/react"
import { useEffect } from 'react';



// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

declare module "@mui/material/styles" {
  interface TypeBackground {
    secondary: string
    dark: string
  }
}

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function MyApp(props: MyAppProps) {
  const [mode, setMode] = React.useState<PaletteMode>("light");
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

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const colorMode = React.useMemo(
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
        );
      },
    }),
    [],
  );

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>AdSpace</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </SessionProvider>
    </CacheProvider>
  );
}


export default MyApp