"use client";

import { useForm } from "@/hooks/useForm";
import Select from "react-select";

interface FormConfigProps {
    title: string;
    type: string;
    multiple?: boolean;
    required: boolean;
    placeholder: string;
    enumerate?: boolean;
    index: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, title: string) => void;
    onSelectChange?: (option: {value: string, label: string}) => void;
}

const FormConfig = ({title, type, multiple, required, placeholder, enumerate, index, onChange, onSelectChange}: FormConfigProps) => {

    const options = [
        { value: 'CONFIG_A', label: 'Python' },
        { value: 'CONFIG_B', label: 'Java' },
        { value: 'CONFIG_C', label: 'C++' }
    ]

    const { jobName, setJobName, jobDescription, setJobDescription, company, setCompany, files, setFiles } = useForm();
    
    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            borderRadius: '999px',
            border: 'none',
            padding: 0.45 + 'rem',
            paddingLeft: 0.5 + 'rem',
            paddingRight: 0.5 + 'rem',

        })
    }

    const onChangeHelper = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        onChange(e, title);
    }

    return (
        <div className="mt-16 gap-y-4">
            <div className="">
                <h1
                    className="flex items-center justify-start text-3xl md:text-4xl font-semibold mb-4"
                >
                    {enumerate && `${index + 1}. `}
                    {title}
                    {required && <span className='text-red-500'>&nbsp;*</span>}
                </h1>
            </div>
            <div className="w-[50%]">
                {type == "select" ? (
                    <Select
                        placeholder={placeholder}
                        className="w-full p-2 border-none"
                        styles={customStyles}
                        options={options}
                        onChange={(option) => onSelectChange && onSelectChange(option as {value: string, label: string})}
                    />
                ) : (
                    <input
                        type={type}
                        placeholder={placeholder}
                        className="w-full p-3 px-5 rounded-full "
                        onChange={onChangeHelper}
                        multiple={multiple}
                    />
                )}
            </div>
        </div>
    )
}

export default FormConfig;