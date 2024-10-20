import React from 'react'
import SortSettings from './SortSettings'
import DownloadButton from './DownloadButton'

const JobButtons = () => {
  return (
    <div
        className='flex gap-x-2 items-center'
    >
        <SortSettings />
        <DownloadButton />
    </div>
  )
}

export default JobButtons