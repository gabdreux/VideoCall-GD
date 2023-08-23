import { AppProps } from 'next/app';
import React, { useContext } from "react";
import '../app/globals.css';
import '../app/responsive.css';
import Header from '../components/header';
import Footer from '../components/footer';






function MyApp({ Component, pageProps }: AppProps) {


  return (

    <div>

        {/* <Header /> */}
        <Component {...pageProps} />
        {/* <Footer /> */}

    </div>
        
  );
}

export default MyApp;