import Head from 'next/head'
import Image from 'next/image'
import Web3 from 'web3'
import factory from '../config/abis/factory.json'
import { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import WriteMethodCard from '../components/MethodCard/WriteMethodCard'
import ReadMethodCard from '../components/MethodCard/ReadMethodCard'

import { ToastProvider, useToasts } from 'react-toast-notifications'
import useWeb3 from '../hooks/useWeb3'
import WalletConnect from '../components/WalletConnect/WalletConnect'

export default function Home() {
  const [interfaces, setinterfaces] = useState([])
  const [readableInterfaces, setreadableInterfaces] = useState([])
  const [iabi, setiabi] = useState('')
  const [contractAddress, setContractAddress] = useState('')
  const [rpcUrl, setrpcUrl] = useState('')
  const [showWritables, setshowWritables] = useState(false)
  const [contractState, setcontract] = useState(null)
  const { addToast } = useToasts()
  const { setweb3, web3 } = useWeb3()

  // useEffect(() => {
  //   console.log({ iabi })
  //   const contract = new web3Client.eth.Contract(
  //     iabi !== '' ? JSON.parse(iabi) : [],
  //     '0x28c47268ac24ad46938b08705743d6ad1ccd33ef'
  //   )
  //   const jsonInterface = contract._jsonInterface
  //   const writablejsonInterface = jsonInterface.filter(
  //     (value, idx) =>
  //       value.stateMutability !== 'view' && value.type === 'function'
  //   )
  //   const readablejsonInterface = jsonInterface.filter(
  //     (value, idx) =>
  //       value.stateMutability == 'view' && value.type === 'function'
  //   )
  //   console.log({ writablejsonInterface, jsonInterface })
  //   setinterfaces(writablejsonInterface)
  //   setreadableInterfaces(readablejsonInterface)
  // }, [iabi])
  const handleFetchContract = async() => {
    // 0xe9e7cea3dedca5984780bafc599bd69add087d56 BUSD-BNBChain
    try {
      console.log({ web3 })
      const httpProvider = new Web3.providers.HttpProvider(rpcUrl)
      setweb3(new Web3(httpProvider))
      const web3Client = new Web3(httpProvider)
      const hashRate = await web3Client.eth.getHashrate()
      console.log('web3Client', web3Client, web3Client.eth, { hashRate })
      const contract = new web3.eth.Contract(
        iabi !== '' ? JSON.parse(iabi) : [],
        contractAddress
      )
      const jsonInterface = contract._jsonInterface
      const writablejsonInterface = jsonInterface.filter(
        (value, idx) =>
          value.stateMutability !== 'view' && value.type === 'function'
      )
      const readablejsonInterface = jsonInterface
        .filter(
          (value, idx) =>
            value.stateMutability == 'view' && value.type === 'function'
        )
        .map(async (value, idx) => {
          // const decimals = await contract.methods['_decimals']().call()
          // console.log('contract', decimals)
          if (value.inputs.length <= 0) {
            try {
              const resp = await contract.methods[value.name]().call()
              console.log({ resp })
              return {
                ...value,
                resp,
              }
            } catch (error) {
              if (error) {
                addToast(error.message, {
                  appearance: 'error',
                  autoDismiss: true,
                })
              }
              return {
                ...value,
              }
            }
          } else {
            return value
          }
        })
      console.log({
        writablejsonInterface,
        jsonInterface,
        readablejsonInterface,
      })
      setinterfaces(writablejsonInterface)

      Promise.all(readablejsonInterface).then((val) => {
        console.log({ val })
        setcontract(contract)

        setreadableInterfaces(val)
      })
    } catch (error) {
      if (error) {
        addToast(error.message, { appearance: 'error', autoDismiss: true })
      }
    }
  }
  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-slate-900 to-gray-900">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Header contract={contractState} />
        <div className="grid grid-cols-2 p-5 m-5 my-5 h-96 ">
          <div className="mx-5">
            <h1>ABI</h1>
            <textarea
              className=" form-control
              m-0
        block
        h-80
        w-full
        rounded
        border
        border-solid
        border-gray-500
        bg-gray-800 bg-clip-padding
        px-3 py-1.5 font-mono
        text-base
        font-normal
        text-gray-200
        transition
        ease-in-out focus:border-blue-600 focus:bg-gray-200 focus:text-gray-700 focus:outline-none"
              name=""
              id=""
              value={iabi}
              onChange={(e) => {
                // console.log(e.target.value);
                try {
                  // console.log('JSON', JSON.parse(e.target.value), factory)
                  setiabi(e.target.value)
                } catch (error) {
                  if (error) {
                    addToast(error.message, { appearance: 'error' })
                  }
                }
              }}
            ></textarea>
            <div></div>
          </div>
          <div className="mb-3 xl:w-96">
            <div className="my-5">
              <label className="inline-block text-gray-200 form-label">
                Contract
              </label>
              <input
                type="text"
                className="
        form-control
        m-0
        block
        w-full
        rounded
        border
        border-solid
border-gray-500 bg-gray-800 bg-clip-padding
        px-3 py-1.5 text-base
        font-normal
        text-gray-500
        transition
        ease-in-out
        focus:border-blue-600  focus:text-gray-100 focus:outline-none
      "
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                id="exampleFormControlInput2"
                placeholder="Contract Address"
              />
            </div>
            <div className="my-5">
              <label className="inline-block text-gray-200 form-label">
                RPC URL
              </label>
              <input
                type="text"
                className="
        form-control
        m-0
        block
        w-full
        rounded
        border
        border-solid
   border-gray-500 bg-gray-800 bg-clip-padding
        px-3 py-1.5 text-base
        font-normal
        text-gray-500
        transition
        ease-in-out
        focus:border-blue-600 focus:text-gray-100 focus:text-gray-700 focus:outline-none
      "
                value={rpcUrl}
                onChange={(e) => setrpcUrl(e.target.value)}
                id="exampleFormControlInput3"
                placeholder="RPC"
              />
            </div>
            <button
              className="px-5 py-2 my-5 text-sm bg-blue-600 rounded-md "
              onClick={handleFetchContract}
            >
              Validate Contract
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 p-5 m-5 my-5 rounded-xl bg-white/5 backdrop-blur-sm">
          <div className="my-5 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <ul className="flex flex-wrap -mb-px">
              <li className="mr-2" onClick={() => setshowWritables(false)}>
                <p
                  className={`inline-block rounded-t-lg border-b-2 ${
                    !showWritables
                      ? 'active border-blue-600 dark:border-blue-500'
                      : 'border-transparent'
                  } p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                >
                  Readable Functions
                </p>
              </li>
              <li className="mr-2" onClick={() => setshowWritables(true)}>
                <p
                  className={`inline-block border-b-2 p-4 text-blue-600 ${
                    showWritables
                      ? 'active border-blue-600 dark:border-blue-500'
                      : 'border-transparent'
                  }  rounded-t-lg hover:border-gray-300  dark:text-blue-500`}
                  aria-current="page"
                >
                  Writable Functions
                </p>
              </li>
            </ul>
          </div>
          {showWritables ? (
            <div className="mx-5">
              <h1 className="my-5 text-bold"> Writable Contract Information</h1>
              {interfaces.map((value, idx) => {
                return (
                  //                 <div className="p-5 my-5 rounded-lg bg-slate-900">

                  //                   <p>{value?.name}</p>

                  //                   {value?.inputs?.map((value) => (
                  //                     <>
                  //                       <div className="mb-3 xl:w-96">
                  //                         <label className="inline-block mb-2 text-sm text-gray-500 form-label">
                  //                           {value?.internalType}
                  //                         </label>
                  //                         <input
                  //                           type="text"
                  //                           className="
                  //       form-control
                  //       m-0
                  //       block
                  //       w-full
                  //       rounded
                  //       border
                  //       border-solid
                  // border-gray-500 bg-gray-800 bg-clip-padding
                  //       px-3 py-1.5 text-base
                  //       font-normal
                  //       text-gray-200
                  //       transition
                  //       ease-in-out
                  //       focus:border-blue-600 focus:text-gray-100 focus:text-gray-700 focus:outline-none
                  //     "
                  //                           id="exampleFormControlInput1"
                  //                           placeholder={value?.internalType}
                  //                         />
                  //                       </div>
                  //                       {/* <input type="text" /> */}
                  //                     </>
                  //                   ))}
                  //                 </div>
                  <>
                    <WriteMethodCard
                      value={value}
                      key={value.name}
                      contract={contractState}
                    />
                  </>
                )
              })}
            </div>
          ) : (
            <div className="mx-5">
              <h1 className="my-5 text-bold"> Readable Contract Information</h1>
                <WalletConnect rpc={ rpcUrl} />

              {readableInterfaces.map((value, idx) => {
                return (
                  //             <div className="p-5 my-5 rounded-lg bg-slate-900">
                  //               <p>{value?.name}</p>
                  //               <div className="flex ">
                  //                 {value.inputs.length <= 0 && (
                  //                   <>
                  //                     <label className="inline-block mb-2 text-sm text-gray-500 form-label">
                  //                       {value?.resp}
                  //                     </label>
                  //                   </>
                  //                 )}
                  //                 {value?.inputs?.map((value) => (
                  //                   <>
                  //                     <div className="mb-3 xl:w-96">
                  //                       <label className="inline-block mb-2 text-sm text-gray-500 form-label">
                  //                         {value?.internalType}
                  //                       </label>
                  //                       <input
                  //                         type="text"
                  //                         className="
                  //   form-control
                  //   m-0
                  //   block
                  //   w-full
                  //   rounded
                  //   border
                  //   border-solid
                  //   border-gray-500 bg-gray-800  bg-clip-padding
                  //   px-3 py-1.5 text-base
                  //   font-normal
                  //   text-gray-200
                  //   transition
                  //   ease-in-out
                  //   focus:border-blue-600 focus:text-gray-100 focus:outline-none
                  // "
                  //                         id="exampleFormControlInput1"
                  //                         placeholder={value?.internalType}
                  //                       />
                  //                     </div>
                  //                   </>
                  //                 ))}
                  //               </div>
                  //               {value.inputs.length > 0 && (
                  //                 <>
                  //                   <button
                  //                     className="px-5 py-2 my-2 text-sm bg-blue-600 rounded-md "
                  //                     onClick={handleFetchContract}
                  //                   >
                  //                     Call Contract
                  //                   </button>
                  //                 </>
                  //               )}

                  //               <p className="mb-2 text-sm text-gray-500 form-label">
                  //                 o/p :{/* {JSON.stringify(value?.outputs)} */}
                  //                 {value?.outputs?.map(({ type }) => {
                  //                   return <span className="mx-2">{type} </span>
                  //                 })}
                  //               </p>
                  //             </div>
                  <>
                    <ReadMethodCard
                      value={value}
                      key={value.name}
                      contract={contractState}
                    />
                  </>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
