import { withAuthMiddleware } from "@/lib/auth/withAuthMiddleware";
import { getFile } from "@/lib/db/fileRepository";
import { Handler } from "@/types/api/common";
import { FileEntity } from "@/types/db/file";
import { internalServerErrorResponse } from "@/utils/responses";
import { validate as uuidValidate } from 'uuid';

const getFileHandler: Handler = async (req, context) => {
    try {
        const {id} = await context.params as {id: string};
        if(!uuidValidate(id)) {
            return Response.json({error: 'Invalid file id!'}, {status: 400});
        }

        const userId = context?.userId;
        const file: FileEntity | null = await getFile(id, userId);
        if(file === null) {
            return Response.json({error: 'File not found!'}, {status: 404});
        }
        return Response.json(file, {status: 200});
    } catch (error) {
        console.error('api/file/:id GET err', error);
        return internalServerErrorResponse;
    }
}

export const GET = withAuthMiddleware(getFileHandler);