import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import { Layout } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {

    return (
      <Layout title="Github based blog">
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp
