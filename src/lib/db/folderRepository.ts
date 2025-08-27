import { FolderEntity } from "@/types/db/folder";
import db from "./config";
import { FolderUploadServer } from "@/types/api/folder";
import { getChildrenFiles } from "./fileRepository";
import { FileEntity } from "@/types/db/file";


export const createFolder = async (folder: FolderUploadServer) => {
    return await db.query('INSERT INTO folders(id, name, parent_id, owner_id) VALUES($1, $2, $3, $4)', [
        folder.id,
        folder.name,
        folder.parent_id,
        folder.owner_id
    ])
}

export const getChildrenFolders = async (parentId: string | null, ownerId: string) => {
    let res;

    if (parentId === null) {
        res = await db.query<FolderEntity>("SELECT *, 'folder' AS item_type FROM folders WHERE parent_id IS NULL AND owner_id = $1 AND is_deleted = false ORDER BY name", [ownerId]);
    } else {
        res = await db.query<FolderEntity>("SELECT *, 'folder' AS item_type FROM folders WHERE parent_id = $1 AND owner_id = $2 AND is_deleted = false ORDER BY name", [parentId, ownerId]);
    }
    return res.rows;
}

export const getFolder = async (folderId: string, ownerId: string) => {
    const res = await db.query<FolderEntity>('SELECT * FROM folders WHERE id = $1 AND owner_id = $2', [folderId, ownerId]);
    return res.rows.length > 0 ? res.rows[0] : null;
}

export const getFolderItems = async (parentId: string | null, ownerId: string) => {
    const files: FileEntity[] = await getChildrenFiles(parentId, ownerId);
    const folders: FolderEntity[] = await getChildrenFolders(parentId, ownerId);
    return {
        files, 
        folders
    }
}