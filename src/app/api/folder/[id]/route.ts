import { withAuthMiddleware } from "@/lib/auth/withAuthMiddleware";
import { getFolder, getFolderItems } from "@/lib/db/folderRepository";
import { Handler } from "@/types/api/common";
import { FolderEntity } from "@/types/db/folder";
import { internalServerErrorResponse } from "@/utils/responses";
import { validate as uuidValidate } from 'uuid';

const getFolderHandler: Handler = async (req, context) => {
    try {
        const {id} = await context.params as {id: string};
        if(!uuidValidate(id)) {
            return Response.json({error: 'Invalid folder id!'}, {status: 400});
        }

        const userId = context?.userId;
        const folder: FolderEntity | null = await getFolder(id, userId);
        if(folder === null) {
            return Response.json({error: 'Folder not found!'}, {status: 404});
        }
        const {files, folders} = await getFolderItems(id, userId);
        return Response.json({folder, items: {files, folders}}, {status: 200});
    } catch (error) {
        console.error('api/folder/:id GET err', error);
        return internalServerErrorResponse;
    }
}

export const GET = withAuthMiddleware(getFolderHandler);