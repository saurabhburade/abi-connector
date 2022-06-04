import React, { useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { wallets } from '../../config/wallets'
import { useWeb3React } from '@web3-react/core'
import { supportedChainIds } from '../../config/wallets'
import { ChainId } from '../../config/chainIds'
type Props = {}

const WalletConnect = (props: Props) => {
  let [isOpen, setIsOpen] = useState(true)
  const [customChainId, setcustomChainId] = useState(1)
  const { connector, activate, account, chainId } = useWeb3React()
//   console.log(
//     { supportedChainIds, ChainId: Object.getOwnPropertyNames(ChainId) },
//     ChainId,
//     chainId
//   )
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  useEffect(() => {
    console.log({ window: window?.ethereum })
  }, [])
  return (
    <div>
      <button
        className="px-5 py-2 mx-3 text-sm bg-blue-600 rounded-md"
        onClick={openModal}
      >
        {account ? account : 'Connect'}
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-gray-800 shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-between text-lg font-medium leading-6 text-gray-300"
                  >
                    <p>Connect Wallet</p>
                    <button
                      className="px-2 text-sm rounded-md bg-slate-700"
                      onClick={closeModal}
                    >
                      X
                    </button>
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="my-5">
                      <label className="inline-block text-sm text-gray-200 form-label">
                        Chain Id
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
        border-gray-500
   bg-gray-800 bg-clip-padding px-3
        py-1.5 text-sm text-base
        font-normal
        text-gray-500
        transition
        ease-in-out
        focus:border-blue-600 focus:text-gray-100 focus:text-gray-700 focus:outline-none
      "
                        value={customChainId}
                        onChange={(e) => setcustomChainId(e.target.value)}
                        id="exampleFormControlInput3"
                        placeholder="Enter Chain ID"
                      />
                    </div>
                    <div className="my-5">
                      <label className="inline-block text-sm text-gray-200 form-label">
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
        border-gray-500
   bg-gray-800 bg-clip-padding px-3
        py-1.5 text-sm text-base
        font-normal
        text-gray-500
        transition
        ease-in-out
        focus:border-blue-600 focus:text-gray-100 focus:text-gray-700 focus:outline-none
      "
                        value={customChainId}
                        onChange={(e) => setcustomChainId(e.target.value)}
                        id="exampleFormControlInput3"
                        placeholder="Enter Chain ID"
                      />
                    </div>
                    <div className="flex">
                      {wallets.map((val, idx) => {
                        return (
                          <>
                            <div
                              onClick={() => {
                                activate(val.connector)
                              }}
                              className="p-5 m-1 cursor-pointer rounded-2xl bg-slate-700"
                            >
                              <img
                                src={val.logo}
                                alt={val.name}
                                className="px-3"
                              />
                              <p className="text-sm text-center text-gray-200">
                                {val.name}
                              </p>
                            </div>
                          </>
                        )
                      })}
                    </div>
                    <p className="my-5 text-sm text-gray-500 ">
                      Please make sure to connect wallet with the ChainId you
                      are going to interact.
                    </p>
                  </div>
                  {/* 
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
export default WalletConnect
