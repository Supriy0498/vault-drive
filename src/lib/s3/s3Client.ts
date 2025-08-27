import { S3Client } from "@aws-sdk/client-s3";

export const S3_VAULT_DRIVE_BUCKET = 'vault-drive-storage';

const s3 = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_ACCESS_KEY
    }
})

export default s3;