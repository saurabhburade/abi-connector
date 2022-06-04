import { useWeb3React } from '@web3-react/core'
import React from 'react'
import useWeb3 from '../../hooks/useWeb3'

type Props = {}

export default function WriteMethodCard({ value, contract }) {
  const { account, library } = useWeb3React()
  const handleCall = async (e) => {
    e.preventDefault()
    const args = value?.inputs?.map((val, idx) => {
      return e.target[idx].value
    })
    console.log(
      'handleCall',
      e.target[1].value,
      document.getElementById(e.target[0].id),
      args
    )
    if (contract) {
      console.log('====================================')
      console.log(
        { contract },
        contract?.methods[value?.name](...args),
        library
      ,account)
      const txn = await contract?.methods[value?.name](...args).send({
        from: account,
      })
      console.log({ txn })
    }
  }
  return (
    <div>
      {' '}
      <div className="p-5 my-5 rounded-lg bg-slate-900">
        <p>{value?.name}</p>
        <form onSubmit={handleCall}>
          {value?.inputs?.map((ivalue, idx) => (
            <>
              <div className="mb-3 xl:w-96">
                <label className="inline-block mb-2 text-sm text-gray-500 form-label">
                  {ivalue?.internalType}
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
        text-gray-200
        transition
        ease-in-out
        focus:border-blue-600 focus:text-gray-100 focus:text-gray-700 focus:outline-none
      "
                  id={value.name + '_' + idx}
                  placeholder={ivalue?.internalType}
                />
              </div>

              {/* <input type="text" /> */}
            </>
          ))}
          <button
            type="submit"
            className="px-5 py-2 my-2 text-sm bg-blue-600 rounded-md "
          >
            Call Contract
          </button>
        </form>
      </div>
    </div>
  )
}
