import { create } from "zustand";

type FileStatus = {
    file: File;
    status: 'uploading' | 'success' | 'error';
}

type FormStore = {
    jobName: string;
    setJobName: (jobName: string) => void;
    jobDescription: string;
    setJobDescription: (jobDescription: string) => void;
    company: string;
    setCompany: (company: string) => void;
    files: File[];
    setFiles: (files: File[]) => void;
    configuration: string;
    setConfiguration: (configuration: string) => void;
    fileStatuses: FileStatus[];
    setFileStatus: (file: File, status: 'uploading' | 'success' | 'error') => void;

}

export const useForm = create<FormStore>( (set) => ({
    jobName: '',
    setJobName: (jobName: string) => set({ jobName }),
    jobDescription: '',
    setJobDescription: (jobDescription: string) => set({ jobDescription }),
    company: '',
    setCompany: (company: string) => set({ company }),
    files: [],
    setFiles: (files: File[]) => set({ files }),
    configuration: '',
    setConfiguration: (configuration: string) => set({ configuration }),
    fileStatuses: [],
    setFileStatus: (file: File, status: 'uploading' | 'success' | 'error') => set((state) => {
        const existingFileStatus = state.fileStatuses.find((fs) => fs.file.name === file.name);
        if (existingFileStatus) {
            existingFileStatus.status = status;
        } else {
            state.fileStatuses.push({ file, status });
        }
        return { fileStatuses: [...state.fileStatuses] };
    }),

}))