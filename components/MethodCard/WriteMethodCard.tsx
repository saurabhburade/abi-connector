import React from 'react'

type Props = {}

export default function WriteMethodCard({value}) {
  return (
    <div>
      {' '}
      <div className="p-5 my-5 rounded-lg bg-slate-900">
        <p>{value?.name}</p>

        {value?.inputs?.map((ivalue) => (
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
                id="exampleFormControlInput1"
                placeholder={ivalue?.internalType}
              />
            </div>
            {/* <input type="text" /> */}
          </>
        ))}
      </div>
    </div>
  )
}