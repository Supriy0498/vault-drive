'use client'

import { ChangeEventHandler, Ref, useRef } from "react";
import { FileUploadClient } from "@/types/api/file";
import { FolderUploadClient } from "@/types/api/folder";
import { useParams, usePathname } from "next/navigation";
import { isFolderRoute } from "@/lib/routing";

const NewUpload = (props: object) => {
    
    const inputRef: Ref<HTMLInputElement> = useRef(null);
    const params = useParams();
    const pathname = usePathname();
    console.log('MyDrive params', params)

    const handleUploadFile = () => {
        inputRef.current?.click();
    }

    const createFile = async (file: FileUploadClient) => {
        const res = await fetch('/api/file', {
            method: 'POST',
            body: JSON.stringify({file})
        })
        if(res.ok) {
            return;
        }
        else {
            throw new Error('Create File Failed!, status: ' + res.status);
        }
    }
    
    const uploadFile = async (signedUrl: string, file: File, fileId: string, contentType: string) => {
        const res = await fetch(signedUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': contentType
            },
            body: file
        });

        if(res.ok) {
            return;
        }
        else {
            throw new Error('Upload File Failed!, status: ' + res.status);
        }
    }

    const getSignedUrl = async (params: URLSearchParams) => {
        const res = await fetch(`/api/s3-signed-url?${params.toString()}`);
        if(res.ok) {
            return await res.json();
        }
        else {
            throw new Error('GET Signed URL failed!, status: '+ res.status);
        }
    }

    const uploadAndCreateFile = async (file: File) => {
        const urlParams = new URLSearchParams({
            fileType: file.type,
            fileName: file.name,
        });

        let signedUrlRes;

        try {
            signedUrlRes = await getSignedUrl(urlParams);
        } catch (error) {
            console.error(error);
            return;
        }
        
        const {signedUrl, contentType, fileId} = signedUrlRes;
        console.log('Get signed Url succcess, signedURL', signedUrl);

        try {
            await uploadFile(signedUrl, file, fileId, contentType);
            console.log('Upload file success!');
        } catch (error) {
            console.error(error);
            return;
        }

        try {
            const parentFolderId = isFolderRoute(pathname) ? params.id as string : null;
            const fileUpload: FileUploadClient = {
                id: fileId,
                name: file.name,
                folder_id: parentFolderId,
                mime: contentType,
                size: file.size
            } 
            await createFile(fileUpload);
            console.log('Create file success!');
            alert('File uploaded successfully!')
        } catch (error) {
            console.error(error);
            // Delete s3 file
        }
    }

    const handleFileChange: ChangeEventHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleFileChange', e.target.files);
        const file = e.target.files[0];
        uploadAndCreateFile(file);
    }

    const handleNewFolder = async () => {
        const folderName = prompt('Enter folder name');
        const parentId = isFolderRoute(pathname) ? params.id as string : null;
        if(folderName) {
            const folder: FolderUploadClient = {
                name: folderName,
                parent_id: parentId
            }
            try {
                const res = await fetch('/api/folder', {
                    method: 'POST',
                    body: JSON.stringify({folder})
                })
                if(res.ok) {
                    console.log('Create folder success!');
                }
                else {
                    throw new Error('Create folder failed!, status: ' + res.status);
                }
            } catch (error) {
                console.error('handleNewFolder err', error);
            }
        }
    }

    return(
        <>
        <div>
            <button
                onClick={handleNewFolder}
            >
                New Folder
            </button>
        </div>
        <div>
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleUploadFile}
            >
                Upload File
            </button>
            <input
                type="file"
                ref={inputRef}
                style={{visibility:'hidden'}}
                onChange={handleFileChange}
            />
        </div>
        </>
    )
}

export default NewUpload;