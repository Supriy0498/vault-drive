export interface FileUploadClient {
    id: string,
    name: string,
    folder_id: string | null,
    mime: string,
    size: number
}

export interface FileUploadServer extends FileUploadClient {
    file_type: string,
    owner_id: string,
}