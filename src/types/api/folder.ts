export interface FolderUploadClient {
    name: string,
    parent_id: string | null,
}

export interface FolderUploadServer extends FolderUploadClient {
    id: string,
    owner_id: string,
}