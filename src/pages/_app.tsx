import 'tailwindcss/tailwind.css'
import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/layout';
import { providers } from 'ethers';

function getLibrary(provider: any, connector: any) {
  return new providers.Web3Provider(provider);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3ReactProvider>
  )
}
export default MyApp
