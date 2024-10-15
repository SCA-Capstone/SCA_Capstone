"use client";

import uniqid from 'uniqid';
import { useForm } from "@/hooks/useForm";
import FormQuestion from "./_components/FormQuestion";
import { ReceiptRussianRuble } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

const SubmissionPage = () => {


    const { name, setName, email, setEmail, company, setCompany, files, setFiles } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    // convert name, email, company, files to json
    const router = useRouter();
    const supabaseClient = useSupabaseClient();

    const questions = [
        {
            title: "Full name",
            type: "text",
            required: true,
            placeholder: "Enter full name...",
        }, 
        {
            title: "Email address",
            type: "email",
            required: true,
            placeholder: "Enter email address...",
        },
        {
            title: "Company or Institute",
            type: "select",
            required: true,
            placeholder: "Select organization...",
        },
        {
            title: "Upload Files",
            type: "file",
            required: true,
            multiple: true,
        }
    ]

    const onHandleSubmit =  async (e: any) => {
        e.preventDefault();
        // check to see if any of the fields are empty
        if (!name || !email || !company ) {
            toast.error('Please fill out all fields');
            return;
        }
        
        setIsLoading(true);

        const uniqueID = uniqid();
        const randNumber = Math.floor(Math.random() * 1000);
        const created_at = new Date().toISOString();
        const randNumber2 = Math.floor(Math.random() * 1000);

        // upload files to supabase storage
        // for some reason the files when transferred as json to the backend are being null
        // so we need to upload the files here
        console.log(' uploading files, files:', files);
        for (const key in files) {
            if (files.hasOwnProperty(key)) {
                const file = files[key];
                console.log('KEY', key);
                console.log('FILE', file);

                const { data: fileData, error: fileError } = await supabaseClient
                    .storage
                    .from('submission-files')
                    .upload(`user-${randNumber}-submission-${randNumber2}/${file.name}`, file, {
                        cacheControl: '3600',
                        upsert: false
                    });
                if (fileError) {
                    console.error('Error uploading file:', fileError);
                    return;
                }
                console.log('Files were uploaded:', fileData);
            }
        }

        // grab all the global states and submit them to the backend
        const formData = {
            id: randNumber,
            created_at: created_at,
            name: name,
            email: email,
            company: company,
            userId: randNumber2,
            files: files,
        }
        console.log('formData', formData);
        console.log('formData.file')
        // api action
        try {
            fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
        } catch (error) {
            console.error('Trouble submitting form:', error);
            return;
        }

        toast.success('Form submitted successfully');
        // redirect to dashboard
        router.push('/dashboard');

    }

    const handleInputChange = (e: any, title: string) => {
        const target = e.target as HTMLInputElement;
        switch (title) {
            case 'Full name':
                return setName(e.target.value);
            case 'Email address':
                return setEmail(e.target.value);
            case 'Upload Files':
                if (target.files) {
                    return setFiles(e.target.files);
                }

            default:
                return;
        }
    }


    return (
        <div
            className='flex items-center justify-center h-full ml-[15%] mr-[15%] mt-12'
        >
            <div
                className='flex flex-col justify-start items-start h-[949px] mt-12 w-full bg-[#F3F4F6] rounded-[2rem] p-12 overflow-hidden'
            >

                <div
                    className='flex w-full h-auto flex-col gap-y-4'
                >
                    <div
                        className="flex w-full h-10 "
                    >
                        <h1
                            className='flex items-center justify-center text-5xl font-semibold'
                        >
                            Submission Form
                        </h1>
                    </div>

                    <p className='text-neutral-400 text-md'>
                        complete all required fields
                        <span className='text-red-500'> *</span>
                    </p>

                </div>
                
                <div
                    className='mt-4 gap-y-16 w-full'
                >
                    <form onSubmit={onHandleSubmit}>
                        {questions.map( (question, index) => (
                            <FormQuestion
                                key={index}
                                {...question}
                                enumerate
                                index={index}
                                placeholder={question.placeholder || ''}
                                onChange={handleInputChange}
                                onSelectChange={(option) => setCompany(option.value)}
                            />
                        ))}

                        <div
                            className="flex w-full justify-center items-center mt-8"
                        >
                            <button
                                className='bg-blue-500 text-white w-[400px] p-3 rounded-full hover:bg-blue-600 transition tracking-widest'
                                type='submit'
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default SubmissionPage