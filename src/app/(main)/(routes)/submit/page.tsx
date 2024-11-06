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
import { useDropzone } from 'react-dropzone';

const SubmissionPage = () => {

    const [isMounted, setIsMounted] = useState(false);
    const user = useAuthUser();
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { jobName, setJobName, jobDescription, setJobDescription, company, setCompany, files, setFiles } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [incrementalId, setIncrementalId] = useState(0);
    const router = useRouter();
    const supabaseClient = useSupabaseClient();
    const onDrop = (acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (user?.userId) {
            setUserId(user.userId);
            setName(user.name);
            setEmail(user.email);
            console.log('userId', userId);
            console.log('name', name);
            console.log('email', email);
        }
    }, [user]);

    useEffect(() => {
        // Fetch the latest incremental ID from the backend or local storage
        const fetchIncrementalId = async () => {
            // Replace with actual API call or local storage retrieval
            const latestId = await getLatestIncrementalId();
            setIncrementalId(latestId + 1);
        };
        fetchIncrementalId();
    }, []);

    const getLatestIncrementalId = async () => {
        // Mock function to get the latest ID
        // Replace with actual implementation
        return 1000;
    };

    if (!isMounted) {
        return null;
    }

    const questions = [
        {
            title: "Job Name",
            type: "text",
            required: true,
            placeholder: "Enter Job name...",
        },
        {
            title: "Job Description",
            type: "text",
            required: true,
            placeholder: "Enter Job Description...",
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
        },
        {
            title: "Configuration",
            type: "text",
            required: true,
            placeholder: "Enter configuration...",
        },
        {
            title: "Area Files",
            type: "select",
            required: true,
            placeholder: "Select area files...",
        }
    ];

    const onHandleSubmit = async (e: any) => {
        e.preventDefault();
        if (!name || !email || !company) {
            toast.error('Please fill out all fields');
            return;
        }

        setIsLoading(true);

        const uniqueID = uniqid();
        const created_at = new Date().toISOString();

        console.log(' uploading files, files:', files);
        for (const key in files) {
            if (files.hasOwnProperty(key)) {
                const file = files[key];
                console.log('KEY', key);
                console.log('FILE', file);

                const { data: fileData, error: fileError } = await supabaseClient
                    .storage
                    .from('submission-files')
                    .upload(`user-${userId}-submission-${incrementalId}/${file.name}`, file, {
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

        const formData = {
            id: incrementalId,
            created_at: created_at,
            name: name,
            email: email,
            jobName: jobName,
            jobDescription: jobDescription,
            company: company,
            userId: userId,
            files: files,
        };
        console.log('formData', formData);

        try {
            await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        } catch (error) {
            console.error('Trouble submitting form:', error);
            return;
        }

        toast.success('Form submitted successfully');
        router.push('/dashboard');
    };

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
    };

    return (
        <div className='flex items-center justify-center min-h-screen ml-[10%] mr-[10%] mt-12 overflow-y-auto'>
        <div className='flex flex-col justify-start items-start w-full bg-[#F3F4F6] mb-12 rounded-[2rem] p-12 overflow-hidden'>
            <div className='flex w-full h-auto flex-col gap-y-4'>
                <div className="flex w-full h-10 ">
                    <h1 className='flex items-center justify-center text-5xl md:text-6xl font-semibold'>
                        Submission Form
                    </h1>
                </div>
                <p className='text-neutral-400 text-lg'>
                    complete all required fields
                    <span className='text-red-500'> *</span>
                </p>
            </div>
            <div className='mt-4 gap-y-16 w-full'>
                <form onSubmit={onHandleSubmit}>
                    {questions.map((question, index) => (
                        question.title === "Upload Files" ? (
                            <div key={index} className="mb-4">
                                <label className="block text-gray-700 text-3xl font-bold mb-2">
                                    <strong>{question.title}</strong>
                                </label>
                                <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-6 rounded-lg cursor-pointer">
                                    <input {...getInputProps()} />
                                    {
                                        isDragActive ?
                                            <p>Drop the files here ...</p> :
                                            <p>Drag and drop files or Click to select files</p>
                                    }
                                </div>
                            </div>
                        ) : (
                            <FormQuestion
                                key={index}
                                {...question}
                                enumerate
                                index={index}
                                placeholder={question.placeholder || ''}
                                onChange={handleInputChange}
                                onSelectChange={(option) => setCompany(option.value)}
                            />
                        )
                    ))}
                    <div className="flex w-full justify-center items-center mt-8">
                        <button className='bg-blue-500 text-white w-[400px] p-3 rounded-full hover:bg-blue-600 transition tracking-widest' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
};

export default SubmissionPage;