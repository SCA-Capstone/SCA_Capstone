"use client";

import FilesMapScrollArea from "@/components/FilesMapScrollArea";
import { useForm } from "@/hooks/useForm";
import { Upload } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import { twMerge } from "tailwind-merge";

interface FormQuestionProps {
    title: string;
    type: string;
    multiple?: boolean;
    required: boolean;
    placeholder: string;
    enumerate?: boolean;
    index: number;
    options?: {value: string, label: string}[];
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, title: string) => void;
    onSelectChange?: (option: {value: string, label: string}, title: string) => void;
}

const FormQuestion = ({title, type, multiple, required, placeholder, enumerate, index, options, onChange, onSelectChange}: FormQuestionProps) => {

    const { jobName, setJobName, jobDescription, setJobDescription, company, setCompany, files, setFiles } = useForm();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log("acceptedFiles:", acceptedFiles);
        setFiles(acceptedFiles);
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
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
                        onChange={(option) => onSelectChange && onSelectChange(option as {value: string, label: string}, title)}
                    />
                ) : type == "file" ? (
                    <div
                        className="2xl:flex"
                    >
                        <div
                            className="flex justify-center items-center mt-6 ml-6 bg-white rounded-xl p-4 w-96 h-48"
                        >
                            <div {...getRootProps()}
                                className={twMerge(
                                    `w-full h-full border-2 border-dashed border-gray-300 bg-neutral-100 rounded-md text-center cursor-pointer p-2 hover:bg-neutral-50 transition`,
                                    isDragActive ? 'border-blue-500 bg-neutral-50' : 'border-gray-300'
                                )}
                                >
                                <input {...getInputProps()} />
                                <div
                                    className="flex justify-center items-center flex-col gap-y-2"
                                >
                                    <Upload
                                    size={16}
                                    className={twMerge(
                                        `h-16 w-16 text-neutral-500`,
                                        isDragActive ? 'text-blue-500' : 'text-neutral-500'
                                    )}
                                    />
                                    
                                    <p
                                    className={twMerge(
                                        `text-neutral-500 text-lg font-medium`,
                                        isDragActive ? 'text-blue-500' : 'text-neutral-500'
                                    )}
                                    >
                                    Upload Files
                                    </p>
                                </div>

                            </div>
                        </div>

                        {files.length > 0 && 
                        (
                            <div
                                className="mt-4"
                            >
                                <FilesMapScrollArea key={index} files={files} scrollDirection="vertical" />
                            </div>
                        )}
                    </div>
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

export default FormQuestion