import { AppProps } from 'next/app';
import '../app/globals.css';
import '../app/responsive.css';
import Header from '../components/header';
import Footer from '../components/footer';




function MyApp({ Component, pageProps }: AppProps) {



  return (

        <>

        {/* <Header /> */}
        <Component {...pageProps} />
        {/* <Footer /> */}

        </>
        
  );
}

export default MyApp;