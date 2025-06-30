import React from 'react'
import { FaSpinner } from 'react-icons/fa'

export const SpinLoader = () => {
  return (
   <div className="flex flex-col items-center justify-center py-32 text-gray-700">
  <div className="flex items-center gap-3 text-lg font-medium text-blue-600">
    <FaSpinner className="animate-spin text-blue-500 text-4xl" />
    <span className='text-2xl'>Loading....</span>
  </div>
</div>

  )
}
