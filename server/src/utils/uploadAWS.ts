import * as AWS from 'aws-sdk';

const ACCESSS_KEY_ID = 'AKIAJX2WRI7SQFHWNAXQ';
const SECRET_ACCESS_KEY = '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';
const BUCKET_NAME = 'purtier';

AWS.config.update({
    accessKeyId: ACCESSS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: 'us-east-1'
});

export const s3 = new AWS.S3();

export async function uploadAWS(buffer, fileExtension) {
    if (buffer) {
        const randomNumber = Math.floor(Math.random() * 10000);
        const Key = Date.now() + randomNumber + '.' + fileExtension;
        const objectParams = { Bucket: BUCKET_NAME, Key, Body: buffer, ACL: 'public-read' };
        const uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' }).putObject(objectParams).promise();
        return uploadPromise;
    }
}

export async function deleteImageAWS(Key) {
    const params = {
        Bucket: BUCKET_NAME,
        Key
    };
    return s3.deleteObject(params).promise();
}
