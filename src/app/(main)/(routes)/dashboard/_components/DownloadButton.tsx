import { ArrowDown } from 'lucide-react'
import React from 'react'

const DownloadButton = () => {
  return (
    <div
        className=''
    >
        <button
            onClick={() => {}}
            className='flex items-center hidden:border border-neutral-400 rounded-md hover:bg-neutral-200 p-1 transition gap-x-1'
        >
            <ArrowDown
                className='w-6 h-6 text-neutral-400'
            />
            <p
                className='text-neutral-400 text-xs font-medium'
            >
                Report
            </p>
        </button>
    </div>
  )
}

export default DownloadButton