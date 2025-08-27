import { withAuthMiddleware } from "@/lib/auth/withAuthMiddleware";
import { getChildrenFiles } from "@/lib/db/fileRepository";
import { getChildrenFolders, getFolderItems } from "@/lib/db/folderRepository";
import { FileEntity } from "@/types/db/file";
import { FolderEntity } from "@/types/db/folder";
import { internalServerErrorResponse } from "@/utils/responses";

export const myDrive = async (req: Request, context?: any): Promise<Response> => {
    const userId = context?.userId;
    try {
        const {files, folders} = await getFolderItems(null, userId);
        return Response.json({files, folders}, {status: 200});
    } catch (error) {
        console.error('API my-drive GET err', error);
        return internalServerErrorResponse
    }
}

export const GET = withAuthMiddleware(myDrive);