import { create } from "zustand";

type FormStore = {
    jobName: string;
    setJobName: (jobName: string) => void;
    jobDescription: string;
    setJobDescription: (jobDescription: string) => void;
    company: string;
    setCompany: (company: string) => void;
    files: File[];
    setFiles: (files: File[]) => void;
}

export const useForm = create<FormStore>( (set) => ({
    jobName: '',
    setJobName: (jobName: string) => set({ jobName }),
    jobDescription: '',
    setJobDescription: (jobDescription: string) => set({ jobDescription }),
    company: '',
    setCompany: (company: string) => set({ company }),
    files: [],
    setFiles: (files: File[]) => set({ files })
}))