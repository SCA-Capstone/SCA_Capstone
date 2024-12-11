"use client";


import { File, Loader } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import FileItem from "./FileItem";

interface FilesMapScrollAreaProps {
    files: File[] | [];
    scrollDirection?: 'horizontal' | 'vertical';
    isSubmissionFiles?: boolean;
}

const FilesMapScrollArea = ({ files, scrollDirection = "vertical", isSubmissionFiles }: FilesMapScrollAreaProps) => {


  return (
    <div
        className="w-96 h-48 p-4 bg-white rounded-xl overflow-hidden"
    >
        <ScrollArea
            className="w-full h-full"
        >
            {Array.isArray(files) && files.map((file, index) => {
                const filename = isSubmissionFiles ? (file as any).fileName : file.name;
                return <FileItem key={index} filename={filename} />;
            })}
        </ScrollArea>
    </div>
  )
}

export default FilesMapScrollArea