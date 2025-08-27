import { withAuthMiddleware } from "@/lib/auth/withAuthMiddleware";
import { createFolder } from "@/lib/db/folderRepository";
import { Handler } from "@/types/api/common";
import { FolderUploadClient } from "@/types/api/folder";
import { internalServerErrorResponse } from "@/utils/responses";
import { v4 as uuidv4 } from 'uuid';

const createFolderHandler: Handler = async (req, context) => {
    const ownerId = context?.userId;
    const data = await req.json();
    const uuid = uuidv4();
    const folder: FolderUploadClient = data.folder;

    try {
        await createFolder({...folder, owner_id: ownerId, id: uuid});
        return Response.json({message: 'Folder created in DB successfully!'}, {status: 201});
    } catch (error) {
        console.error('api/folder POST createFolderHandler err', error);
        return internalServerErrorResponse;
    }
}

export const POST = withAuthMiddleware(createFolderHandler);