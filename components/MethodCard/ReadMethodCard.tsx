import React, { useState } from 'react'

type Props = {}

const ReadMethodCard = ({ value, contract }) => {
  const [output, setOutput] = useState(null)
  const [showOutput, setshowOutput] = useState(false)
  const handleCall = async (e) => {
    e.preventDefault()

    const args = value?.inputs?.map((val, idx) => {
      return e.target[idx].value
    })
 
    if (contract) {
      console.log('====================================')
      console.log({ contract }, contract?.methods[value?.name](...args))

      const outputVal = await contract?.methods[value?.name](...args)?.call()
      console.log({ outputVal })
      if (outputVal) {
        setOutput(outputVal)
        setshowOutput(true)
      }
      console.log('====================================')
    }
  }
  return (
    <div>
      <div className="p-5 my-5 rounded-lg bg-slate-900">
        <p>{value?.name}</p>
        <form onSubmit={handleCall}>
          <div className="flex ">
            {value.inputs.length <= 0 && (
              <>
                <label className="inline-block mb-2 text-sm text-gray-500 break-all form-label">
                  {/* {value?.resp} */}
                  {JSON.stringify(value?.resp)}
                </label>
              </>
            )}
            {value?.inputs?.map((ivalue, idx) => (
              <div className="mb-3 xl:w-96" key={ivalue?.name}>
                <label className="inline-block mb-2 text-sm text-gray-500 form-label">
                  {ivalue?.name?.trim() !== '' ? ivalue?.name : '_'} :{' '}
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
        border-gray-500 bg-gray-800  bg-clip-padding
        px-3 py-1.5 text-base
        font-normal
        text-gray-200
        transition
        ease-in-out
        focus:border-blue-600 focus:text-gray-100 focus:outline-none
      "
                  id={value.name + '_' + idx}
                  placeholder={ivalue?.internalType}
                />
              </div>
            ))}
          </div>
          {value.inputs.length > 0 && (
            <>
              <button
                type="submit"
                className="px-5 py-2 my-2 text-sm bg-blue-600 rounded-md "
              >
                Call Contract
              </button>
            </>
          )}
        </form>
        <p className="mb-2 text-sm text-gray-500 form-label">
          o/p :{/* {JSON.stringify(value?.outputs)} */}
          {value?.outputs?.map(({ type, ...ivalue }) => {
            return (
              <span className="mx-2" key={ivalue?.name}>
                {' '}
                {ivalue?.name?.trim() !== '' ? ivalue?.name : '_'} : {type}{' '}
              </span>
            )
          })}
        </p>
        {showOutput && (
          <p className="mb-2 text-sm text-gray-500 form-label">
            o/p :{/* {JSON.stringify(value?.outputs)} */}
            {output &&
              value?.outputs?.map((val, idx) => {
                return (
                  <span className="mx-2" key={val?.name}>
                    {' '}
                    {val?.name?.trim() !== '' ? val?.name : '_'} :{' '}
                    {JSON.stringify(output[idx])}
                  </span>
                )
              })}
          </p>
        )}
      </div>
    </div>
  )
}
export default ReadMethodCard
