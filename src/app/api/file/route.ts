import { withAuthMiddleware } from "@/lib/auth/withAuthMiddleware";
import { createFile } from "@/lib/db/fileRepository";
import { Handler } from "@/types/api/common";
import { FileUploadClient } from "@/types/api/file";
import { getFileTypeLabel } from "@/utils/file";
import { internalServerErrorResponse } from "@/utils/responses";

const createFileHandler: Handler = async (req, context) => {
    const ownerId = context?.userId;
    const data = await req.json();
    const file: FileUploadClient = data.file;
    const fileType = getFileTypeLabel(file.mime);

    try {
        await createFile({...file, file_type: fileType, owner_id: ownerId});
        return Response.json({message: 'File created in DB successfully!'}, {status: 201});
    } catch (error) {
        console.error('api/file POST createFileHandler err', error);
        return internalServerErrorResponse;
    }
}

export const POST = withAuthMiddleware(createFileHandler);