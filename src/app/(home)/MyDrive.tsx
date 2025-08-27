'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { FileEntity } from "@/types/db/file";
import { FolderEntity } from "@/types/db/folder";
import ItemList from "@/components/ItemList";
import Loading from "../loading";

const MyDrive = (props: object) => {

    const [files, setFiles] = useState<FileEntity[]>([]);
    const [folders, setFolders] = useState<FolderEntity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('MyDrive useEffect');
        getMyDrive();
    }, [])

    const getMyDrive = async () => {
        try {
            const res = await fetch('/api/my-drive');
            if(res.ok) {
                const data = await res.json();
                setFolders(data.folders);
                setFiles(data.files);
                setLoading(false);
            }
            else {
                throw new Error('MyDrive | getMyDrive failed!, status: ' +  res.status);
            }
        } catch (error) {
            setLoading(false);
            console.error('MyDrive | getMyDrive err', error);
        }
    }

    return (
        <main>
            <div>My Drive</div>
            {loading ?
                <Loading/>
                :    
                <ItemList
                    files={files}
                    folders={folders}
                />
            }
        </main>
    )
}

export default MyDrive;