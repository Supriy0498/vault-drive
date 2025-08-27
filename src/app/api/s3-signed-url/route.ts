import { withAuthMiddleware } from "@/lib/auth/withAuthMiddleware";
import s3, { S3_VAULT_DRIVE_BUCKET } from "@/lib/s3/s3Client";
import { Handler } from "@/types/api/common";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from 'uuid';

const getS3SignedUrl: Handler = async (req) => {
    const {searchParams} = new URL(req.url);
    const uuid = uuidv4();
    const contentType = searchParams.get("fileType") || "application/octet-stream";
    const key = uuid + '-' + searchParams.get('fileName');
    const command = new PutObjectCommand({
        Bucket: S3_VAULT_DRIVE_BUCKET,
        Key: key,
        ContentType: contentType
    });
    // const command = new GetObjectCommand({
    //     Bucket: S3_VAULT_DRIVE_BUCKET,
    //     Key: 'abc.png',
    // });
    const signedUrl = await getSignedUrl(s3, command, {expiresIn: 10 * 60});
    return Response.json({signedUrl, contentType, fileId: uuid}, {status: 200})
}

export const GET = withAuthMiddleware(getS3SignedUrl);