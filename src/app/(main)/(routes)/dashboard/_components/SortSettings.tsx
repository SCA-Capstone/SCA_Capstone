import { Settings2 } from 'lucide-react'
import React from 'react'

const SortSettings = () => {
  return (
    <div>
        <button
            onClick={() => {}}
            className='hidden:border border-neutral-400 rounded-md hover:bg-neutral-200 p-1 transition'
        >
            <Settings2 
                className='w-6 h-6 text-neutral-400'
            />
        </button>
    </div>
  )
}

export default SortSettings