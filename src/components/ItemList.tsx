'use client'

import { FileEntity } from "@/types/db/file";
import { FolderEntity } from "@/types/db/folder";
import Link from "next/link";
import FileComponent from "./File/File";

const ItemList = (props: {folders: FolderEntity[], files: FileEntity[]}) => {
    const {folders, files} = props;

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {folders.map(folder => 
                <Link href={`/folder/${folder.id}`}>
                    <div style={{display: 'flex', justifyContent: 'space-between', margin: '.5rem'}}>
                        <span>{folder.name}</span>
                        <span>{folder.updated_at}</span>
                    </div>
                </Link>
            )}
            {/* <FileComponent file={files[0]}/> */}
            {files.map(file => 
                <Link href={`/file/${file.id}`}>
                    <div style={{display: 'flex', justifyContent: 'space-between', margin: '.5rem'}}>
                        <span>{file.name}</span>
                        <span>{file.updated_at}</span>
                    </div>
                </Link>
            )}
        </div>
    )

}

export default ItemList;