export interface Job {
    company: string;
    created_at: string;
    email: string;
    files: boolean;
    id: number;
    jobDescription: string;
    jobName: string;
    name: string;
    status: string;
    userId: string;
    isHeader?: boolean;
}