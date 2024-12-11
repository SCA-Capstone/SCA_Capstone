"use client";

import { useForm } from "@/hooks/useForm";
import { Check, File, Folder, Image, Loader, LucideIcon, Package, X } from "lucide-react";
import { useState } from "react";

interface FileItemProps {
    filename: string;
}

const FileItem = ({ filename }: FileItemProps) => {

    const { fileStatuses } = useForm();
    const [IconStatus, setIconStatus] = useState<LucideIcon>(Loader);

    const fileStatus = fileStatuses.find((fs: { file: { name: string } }) => fs.file.name === filename);
    const FileIcon = filename.slice(-4) === ".png" || filename.slice(-4) === ".jpg" ? Image : filename.slice(-4) === ".zip" ? Package : File;

    if (fileStatus) {
        const StatusIcon: LucideIcon = fileStatus.status === 'uploading' ? Loader : fileStatus.status === 'success' ? Check : X;
        setIconStatus(StatusIcon);
    }


    return (
        <div
            className="flex items-center justify-between gap-x-2 p-2 hover:bg-neutral-100 rounded-md transition"
        >
            <div
                className="flex gap-x-2 justify-center items-center"
            >
                <FileIcon
                    size={16}
                    className="text-neutral-500 h-4"
                />
                <p
                    className="text-neutral-500 text-sm line-clamp-1 flex-1"
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