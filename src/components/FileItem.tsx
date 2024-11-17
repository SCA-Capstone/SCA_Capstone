"use client";

import { useForm } from "@/hooks/useForm";
import { Check, File, Icon, Loader, LucideIcon, X } from "lucide-react";
import { useState } from "react";

interface FileItemProps {
    filename: string;
}

const FileItem = ({ filename }: FileItemProps) => {

    const { fileStatuses } = useForm();
    const [IconStatus, setIconStatus] = useState<LucideIcon>(Loader);

    const fileStatus = fileStatuses.find((fs: { file: { name: string } }) => fs.file.name === filename);

    if (fileStatus) {
        const StatusIcon: LucideIcon = fileStatus.status === 'uploading' ? Loader : fileStatus.status === 'success' ? Check : X;
        setIconStatus(StatusIcon);
    }


    return (
        <div
            className="flex items-center justify-between gap-x-2 p-2 hover:bg-neutral-100 rounded-md transition"
        >
            <div
                className="flex gap-x-2"
            >
                <File
                    size={16}
                    className="text-slate-500"
                />
                <p
                    className="text-slate-500 text-sm line-clamp-1"
                >
                    {filename}
                </p>
            </div>

            {fileStatus && (
                <div
                    className="flex items-center justify-center"
                >
                    <IconStatus
                        size={24}
                        className="w-24 h-24"
                    />
                </div>
            )}
        </div>
    )
}

export default FileItem