"use client";
import { ResponseFile } from '@/types/ResponseFile';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

interface SelectDropDownProps {
    options: ResponseFile[];
    onClick: (option: string) => void;
}

const SelectDropDown = ({ options, onClick }: SelectDropDownProps) => {
  return (
    <Select
        onValueChange={(value) => onClick(value)}
    >
    <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Files" />
    </SelectTrigger>
    <SelectContent>
        {options.map((option, index) => (
            <SelectItem key={index} value={option.fileName}>
                {option.fileName}
            </SelectItem>
        ))}
    </SelectContent>
    </Select>
  )
}

export default SelectDropDown