import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import { ColorSchemaProvider } from '../src/contexts/ColorSchema';


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>AdSpace</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <ColorSchemaProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </ColorSchemaProvider>
      </SessionProvider>
    </CacheProvider>
  );
}

export default MyApp