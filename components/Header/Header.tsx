import React, { useEffect } from 'react'
import WalletConnect from '../WalletConnect/WalletConnect'

type Props = {}

export default function Header(props) {
    // useEffect(() => {
    //   console.log({ props })
    // }, [props])    
  return (
    <div className="flex items-center justify-between px-8 py-5 text-white bg-slate-900">
      <p className="logo">LOGO</p>
      <div className="flex items-center">
        <a href="#" className="mx-3">
          Home
        </a>
        <a href="#" className="mx-3">
          About
        </a>
        <a href="#" className="mx-3">
          docs
        </a>
        <button className="px-5 py-2 mx-3 text-sm bg-blue-600 rounded-md">Connect</button>
        <WalletConnect/>
      </div>
    </div>
  )
}