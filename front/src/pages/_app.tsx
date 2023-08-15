import { AppProps } from 'next/app';
import '../app/globals.css';
import '../app/responsive.css';
import Header from '../components/header';
import Footer from '../components/footer';

import { ContextProvider } from '@/socketContext';

function MyApp({ Component, pageProps }: AppProps) {



  return (

        <>
        <ContextProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
        </ContextProvider>
        </>
        
  );
}

export default MyApp;