import { AppProps } from 'next/app';
import React, { useState, useEffect } from "react";
import '../app/globals.css';
import '../app/responsive.css';
import Header from '../components/header';
import Footer from '../components/footer';

import { AuthProvider } from '../authContext';


import  { ChatModalProvider } from '@/useModal';





function MyApp({ Component, pageProps }: AppProps) {

  return (

    <AuthProvider>
      <ChatModalProvider>
      <div>

          {/* <Header /> */}
          <Component {...pageProps} />
          {/* <Footer /> */}

      </div>

      </ChatModalProvider>

    </AuthProvider>
    
        
  );


}


export default MyApp;