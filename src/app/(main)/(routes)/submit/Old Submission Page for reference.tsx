"use client";

import uniqid from 'uniqid';
import { useForm } from "@/hooks/useForm";
import FormQuestion from "./_components/FormQuestion";
import { ReceiptRussianRuble } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import useAuthUser from '@/app/hooks/auth_user';

const SubmissionPage = () => {

    // get the userId and pass it into the api fetch
    // const user = useAuthUser();
    // const userId = user?.id;
    const [isMounted, setIsMounted] = useState(false);
    const user = useAuthUser();
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { jobName, setJobName, jobDescription, setJobDescription, company, setCompany, files, setFiles } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const supabaseClient = useSupabaseClient();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Fetch jobs from API
    useEffect(() => {

        if (user?.userId) { // set id, name, email
            setUserId(user.userId);
            setName(user.name);
            setEmail(user.email);
            console.log('userId', userId);
            console.log('name', name);
            console.log('email', email);
        }
    }, [user]); // Dependency on user

    if (!isMounted) {
        return null;
    }
    // convert name, email, company, files to json

    const questions = [
        { // TODO: change Full name to be Job Title
            title: "Job Name",
            type: "text",
            required: true,
            placeholder: "Enter Job name...",
        }, 
        { // TODO: grab email from the user useAuthUser hook -> delete this field
            title: "Job Description",
            type: "text",
            required: true,
            placeholder: "Enter Job Description...",
        },
        { // TODO: grab company from the user useAuthUser hook -> delete this field
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
        } // TODO: add a description field
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
                    .upload(`user-${userId}-submission-${randNumber}/${file.name}`, file, {
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
        // TODO: replace id with userId from the user object from the auth hook
        const formData = {
            id: randNumber,
            created_at: created_at,
            name: name,
            email: email,
            jobName: jobName,
            jobDescription: jobDescription,
            company: company,
            userId: userId,
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
            case 'Job Name':
                return setJobName(e.target.value);
            case 'Job Description':
                return setJobDescription(e.target.value);
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
            className='flex items-center justify-center h-full ml-[10%] mr-[10%] mt-12'
        >
            <div
                className='flex flex-col justify-start items-start h-[949px] mt-12 w-full bg-[#F3F4F6] mb-12 rounded-[2rem] p-12 overflow-hidden'
            >

                <div
                    className='flex w-full h-auto flex-col gap-y-4'
                >
                    <div
                        className="flex w-full h-10 "
                    >
                        <h1
                            className='flex items-center justify-center text-4xl md:text-5xl font-semibold'
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