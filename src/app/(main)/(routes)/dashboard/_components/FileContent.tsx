"use client";

import { ResponseFile } from '@/types/ResponseFile'
import React, { useEffect, useState } from 'react'
import ButtonWithIcon from './ButtonWithIcon';
import { Check, Copy, Download } from 'lucide-react';
import { useJobModal } from '@/hooks/useJobModal';
import { useRouter } from 'next/navigation';
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileContentProps {
    selectedFile: ResponseFile | undefined;
}


const FileContent = ({ selectedFile }: FileContentProps) => {

    const [urlContents, setUrlContents] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const jobModal = useJobModal();
    const router = useRouter();
    const copyIcon = isCopied ? Check : Copy;
    const copyText = isCopied ? "Copied" : "Copy";

    useEffect( () => {

        const scrapeUrl = async (url: string) => {
            const res = await fetch(url);
            const text = await res.text();
            setUrlContents(text);
            console.log(text);
        }
      
        
        if (selectedFile?.publicUrl) {
            console.log("Fetching URL contents...");
            scrapeUrl(selectedFile.publicUrl);
        } else {
            setUrlContents("");
        }
    }, [selectedFile]);

    useEffect( () => {
        if (!jobModal.isOpen) {
            setUrlContents("");
        }
    }, [jobModal.isOpen]);


    const OnCopyClick = () => {
        navigator.clipboard.writeText(urlContents || "");
        setIsCopied(true);
        setTimeout( () => {
            setIsCopied(false);
        }, 3000);

    }
    const onDownloadClick = () => {
        if (selectedFile?.publicUrl) {
            window.open(selectedFile.publicUrl, '_blank');
        }
    }

  return (
    <div
        className="w-full relative h-48 bg-neutral-100 p-4 rounded-xl group overflow-hidden"
    >
        <ScrollArea
            className='w-full h-full'
        >
        
        <p
            className="text-lg font-medium"
        >
            {urlContents}

        </p>
        </ScrollArea>

        <div
            className="absolute flex top-4 right-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300 z-20 p-1 rounded-xl bg-neutral-200"

        >
            <ButtonWithIcon icon={copyIcon} text={copyText} onClick={OnCopyClick} className="text-neutral-800" />
            <ButtonWithIcon icon={Download} text="Download" onClick={onDownloadClick} className='text-neutral-800'/>
        </div>

    </div>
  )
}

export default FileContent