import React from 'react'
import SortSettings from './SortSettings'
import ButtonWithIcon from './ButtonWithIcon'
import { ArrowDown } from 'lucide-react'

const JobButtons = () => {
  return (
    <div
        className='flex gap-x-2 items-center'
    >
        <SortSettings />
        <ButtonWithIcon icon={ArrowDown} iconSize={6} text="Report" />
    </div>
  )
}

export default JobButtons