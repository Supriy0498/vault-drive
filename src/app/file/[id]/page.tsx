'use client'

import { UuidValidator } from "@/components/UuidValidator";
import { useValidUUID } from "@/hooks/useValidUUID";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const FileViewer = () => {
    const params = useParams();
    const isValidUUID = useValidUUID(params.id as string);

    if(!isValidUUID)
        return null;

    useEffect(() => {
        console.log('FileViewer useEffect');
    }, [])
    
    return (
            <div>
                File Viewer {params.id}
            </div>
    )
}
export default FileViewer;