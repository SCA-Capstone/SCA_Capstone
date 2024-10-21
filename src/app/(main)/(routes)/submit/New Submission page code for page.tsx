import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import uniqid from 'uniqid';
import toast from 'react-hot-toast';

const SubmissionPage = () => {
    const { register, handleSubmit, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const supabaseClient = useSupabaseClient();
    const [files, setFiles] = useState<File[]>([]);

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
    ];

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

    const onSubmit = async (data: any) => {
        if (!data.name || !data.email || !data.company) {
            toast.error('Please fill out all fields');
            return;
        }

        setIsLoading(true);

        const uniqueID = uniqid();
        const created_at = new Date().toISOString();

        const formData = {
            id: uniqueID,
            created_at: created_at,
            name: data.name,
            email: data.email,
            company: data.company,
            files: files,
        };

        try {
            // Upload files to Supabase storage
            const uploadPromises = files.map(file => {
                const filePath = `${uniqueID}/${file.name}`;
                return supabaseClient.storage.from('uploads').upload(filePath, file);
            });
            await Promise.all(uploadPromises);
    
            // Save form data to Supabase table
            const { error } = await supabaseClient
                .from('submissions')
                .insert([formData]);
    
            if (error) {
                throw error;
            }
    
            toast.success('Submission successful!');
            router.push('/success'); // Redirect to a success page
        } catch (error) {
            toast.error('Submission failed. Please try again.');
            console.error('Error submitting form:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {questions.slice(0, 3).map((question, index) => (
                <div key={index}>
                    <label>{question.title}</label>
                    <input
                        type={question.type}
                        required={question.required}
                        placeholder={question.placeholder}
                        {...register(question.title.toLowerCase().replace(/ /g, '_'))}
                    />
                </div>
            ))}
            <div>
                <label>Upload Files</label>
                <div {...getRootProps()} style={{ border: '2px dashed #cccccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>Drag files here or Click here to choose a file from computer</p>
                    )}
                </div>
            </div>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
};

export default SubmissionPage;