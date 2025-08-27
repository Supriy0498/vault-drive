import { FileUploadServer } from "@/types/api/file";
import db from "./config";
import { FileEntity } from "@/types/db/file";

export const createFile = async (file: FileUploadServer) => {
    return await db.query('INSERT INTO files(id, name, folder_id, owner_id, file_type, size, mime, original_name) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [
        file.id,
        file.name,
        file.folder_id,
        file.owner_id,
        file.file_type,
        file.size,
        file.mime,
        file.name
    ])
}

export const getChildrenFiles = async (folderId: string | null, ownerId: string): Promise<FileEntity[]> => {
    let res;

    if (folderId === null) {
        res = await db.query<FileEntity>("SELECT *, 'file' AS item_type FROM files WHERE folder_id IS NULL AND owner_id = $1 AND is_deleted = false ORDER BY name", [ownerId]);
    } else {
        res = await db.query<FileEntity>("SELECT *, 'file' AS item_type FROM files WHERE folder_id = $1 AND owner_id = $2 AND is_deleted = false ORDER BY name", [folderId, ownerId]);
    }
    return res.rows;
}

export const getFile = async (fileId: string, ownerId: string) => {
    const res = await db.query<FileEntity>('SELECT * FROM files WHERE id = $1 AND owner_id = $2', [fileId, ownerId]);
    return res.rows.length > 0 ? res.rows[0] : null;
}