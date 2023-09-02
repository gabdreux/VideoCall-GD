import { AppProps } from 'next/app';
import React, { useState, useEffect } from "react";
import '../app/globals.css';
import '../app/responsive.css';
import Header from '../components/header';
import Footer from '../components/footer';

import { AuthProvider } from '../authContext';




function MyApp({ Component, pageProps }: AppProps) {

  return (

    <AuthProvider>

    <div>
{/* 
        <Header /> */}
        <Component {...pageProps} />
        {/* <Footer /> */}

    </div>

    </AuthProvider>
    
        
  );


}


export default MyApp;