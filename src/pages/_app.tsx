import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/AuthContext';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/inter/variable.css'
import { useEffect, useState } from 'react';
  

function MyApp({ Component, pageProps }: AppProps) {

  const [uiTheme, setUITheme]= useState("dark");
  
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      setUITheme(localStorage.getItem('chakra-ui-color-mode')||'dark')
  }
  },[])
 
      const theme = extendTheme({  
        config: {
          initialColorMode: uiTheme,
        }})
          
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  )
 
}

export default MyApp;
