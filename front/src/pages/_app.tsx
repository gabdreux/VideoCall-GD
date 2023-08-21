import { AppProps } from 'next/app';
import '../app/globals.css';
import '../app/responsive.css';
import Header from '../components/header';
import Footer from '../components/footer';

import { ContextProvider } from '@/socketContext';



function MyApp({ Component, pageProps }: AppProps) {


  return (


    <ContextProvider>

        <div>
        <Header />
        <Component {...pageProps} />
        <Footer />
        </div>
        </ContextProvider>
  );
}

export default MyApp;