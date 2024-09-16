import { create } from "zustand";

type FormStore = {
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    company: string;
    setCompany: (company: string) => void;
    files: File[];
    setFiles: (files: File[]) => void;
}

export const useForm = create<FormStore>( (set) => ({
    name: '',
    setName: (name: string) => set({ name }),
    email: '',
    setEmail: (email: string) => set({ email }),
    company: '',
    setCompany: (company: string) => set({ company }),
    files: [],
    setFiles: (files: File[]) => set({ files })
}))