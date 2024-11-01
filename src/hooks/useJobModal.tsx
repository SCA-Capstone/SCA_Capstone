import { create } from "zustand";

type JobModalStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    submissionId: number;
    userId: string;
    setSubmissionId: (submissionId: number) => void;
    setUserId: (userId: string) => void;
};

export const useJobModal = create<JobModalStore>( (set, get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    submissionId: -1,
    userId: "",
    setSubmissionId: (submissionId: number) => set({ submissionId }),
    setUserId: (userId: string) => set({ userId }),

}))