import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastProvider } from 'react-toast-notifications'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import { Web3Provider } from '@ethersproject/providers'
import { useCallback } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
const POLLING_INTERVAL = 12000
const {library} = useWeb3React()
  const getLibrary = (provider:Web3) => {
    // console.log({ provider })
   
    // const library = new Web3Provider(provider)
    // library.pollingInterval = POLLING_INTERVAL
    //  const _lib =   new Web3(provider)
    return provider
  }
  
  // const memoizedCallback = useCallback(
  //   (provider) => {
  //     return new Web3(library) 
  //   },
  //   [library]
  // )
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
