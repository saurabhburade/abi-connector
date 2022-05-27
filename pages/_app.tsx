import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastProvider } from 'react-toast-notifications'
import { Web3ReactProvider } from '@web3-react/core'

function MyApp({ Component, pageProps }: AppProps) {
  const getLibrary = async (_lib) => {
    return _lib
  }
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </Web3ReactProvider>
    </>
  )
}

export default MyApp
