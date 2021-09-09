import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import React from 'react'
import Layout from '../components/layout'
import { Web3ReactProvider } from '@web3-react/core'
import { providers } from 'ethers'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

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
