import { AppProps } from 'next/app';
import React, { useContext } from "react";
import '../app/globals.css';
import '../app/responsive.css';
import Header from '../components/header';
import Footer from '../components/footer';

import { AuthProvider } from '../authContext';
import { ContextProvider } from '@/socketContext';





function MyApp({ Component, pageProps }: AppProps) {


  return (

    <AuthProvider>
    <ContextProvider>
    <div>

        <Header />
        <Component {...pageProps} />
        {/* <Footer /> */}

    </div>
    </ContextProvider>  
    </AuthProvider>
    
        
  );
}

export default MyApp;