import { FileUploadServer } from "../api/file";

export interface FileEntity extends FileUploadServer {
    created_at: string,
    updated_at: string,
    is_deleted: boolean,
    original_name: string,
    item_type?: 'file'
}