"use client";

import uniqid from 'uniqid';
import { useForm } from "@/hooks/useForm";
import FormQuestion from "./_components/FormQuestion";
import FormConfig from './_components/FormConfig';
import { ReceiptRussianRuble } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import useAuthUser from '@/app/hooks/auth_user';
import { useDropzone } from 'react-dropzone';
import { generateHash } from '@/actions/actions';

const SubmissionPage = () => {

    const [isMounted, setIsMounted] = useState(false);
    const user = useAuthUser();
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { jobName, setJobName, jobDescription, setJobDescription, company, setCompany, configuration, setConfiguration, files, setFiles, setFileStatus } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [submissionId, setSubmissionId] = useState<number>(0);
    const router = useRouter();
    const supabaseClient = useSupabaseClient();


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
    }, [user, userId, name, email]);

    useEffect(() => {

        const generateUniqueId = async () => {
            const date = new Date();
            const hash = await generateHash(userId, date);

            console.log('hash', hash);
            setSubmissionId(hash);
        }
        generateUniqueId();
    }, []);

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
            options: [
                { value: 'UARK', label: 'Univ. Of Arkansas' },
                { value: 'PRINCE', label: 'Princeton Univ.' },
                { value: 'CALTECH', label: 'California Inst. of Tech.' }
            ]
        },
        {
            title: "Upload Files",
            type: "file",
            required: true,
            multiple: true,
        },
        {
            title: "Configuration",
            type: "select",
            required: true,
            placeholder: "Choose configuration...",
            options: [
                { value: 'Python', label: 'Python' },
                { value: 'C++', label: 'C++' },
                { value: 'Java', label: 'Java' }
            ]
        }
    ];

    const onHandleSubmit = async (e: any) => {
        e.preventDefault();
        if (!name || !email || !company) {
            toast.error('Please fill out all fields');
            return;
        }

        setIsLoading(true);
        const created_at = new Date().toISOString();

        console.log(' uploading files, files:', files);
        for (const key in files) {
            if (files.hasOwnProperty(key)) {
                const file = files[key];
                console.log('KEY', key);
                console.log('FILE', file);

                // setFileStatus(file, 'uploading');

                const { data: fileData, error: fileError } = await supabaseClient
                    .storage
                    .from('submission-files')
                    .upload(`user-${userId}-submission-${submissionId}/${file.name}`, file, {
                        cacheControl: '3600',
                        upsert: false
                    });
                if (fileError) {
                    console.error('Error uploading file:', fileError);
                    // setFileStatus(file, 'error');
                    return;
                } else {
                    // setFileStatus(file, 'success');
                }
                console.log('Files were uploaded:', fileData);
            }
        }

        const formData = {
            id: submissionId,
            created_at: created_at,
            name: name,
            email: email,
            jobName: jobName,
            jobDescription: jobDescription,
            company: company,
            userId: userId,
            config: configuration,
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

    const handleSelectChange = (option: { value: string, label: string }, title: string) => {
        switch (title) {
            case 'Company or Institute':
                return setCompany(option.value);
            case 'Configuration':
                return setConfiguration(option.value);
            default:
                return;
        }
    }


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
                            <FormQuestion
                                key={index}
                                {...question}
                                enumerate
                                index={index}
                                placeholder={question.placeholder || ''}
                                onChange={handleInputChange}
                                onSelectChange={(option, title) => handleSelectChange(option, title)}
                                
                            />
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