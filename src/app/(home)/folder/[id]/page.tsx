'use client'

import Loading from "@/app/loading";
import ItemList from "@/components/ItemList";
import { useValidUUID } from "@/hooks/useValidUUID";
import { FileEntity } from "@/types/db/file";
import { FolderEntity } from "@/types/db/folder";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const FolderViewer = () => {
    const [files, setFiles] = useState<FileEntity[]>([]);
    const [folders, setFolders] = useState<FolderEntity[]>([]);
    const [loading, setLoading] = useState(true);
    
    const params = useParams();
    const isValidUUID = useValidUUID(params.id as string);

    if(!isValidUUID)
        return null; //TODO show loading compo

    useEffect(() => {
        console.log('FolderViewer useEffect');

        fetchFolder();
    }, [])

    const fetchFolder = async () => {
        try {
            const res = await fetch(`/api/folder/${params.id}`);
            if(res.ok) {
                const data = await res.json();
                setFiles(data.items.files)
                setFolders(data.items.folders);
                setLoading(false);
            }
            else {
                throw new Error('Failed!, status: ' +  res.status);
            }
        } catch (error) {
            console.error('FolderViewer | fetchFolder ERR', error);
            setLoading(false);
        }
    }
    
    return (
        <div>
            Folder Viewer {params.id}
            {loading ?
                <Loading/>
                :    
                <ItemList
                    files={files}
                    folders={folders}
                />
            }
        </div>
    )
}
export default FolderViewer;