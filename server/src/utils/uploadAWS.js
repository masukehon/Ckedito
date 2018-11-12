const AWS = require('aws-sdk');

const ACCESSS_KEY_ID = 'AKIAJX2WRI7SQFHWNAXQ';
const SECRET_ACCESS_KEY = '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';
const BUCKET_NAME = 'purtier';

AWS.config.update({
    accessKeyId: ACCESSS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    subregion: 'us-east-1'
});

const s3 = new AWS.S3();

async function uploadAWS(buffer, fileExtension) { //file = req.file
    if (buffer) {
        const randomNumber = Math.floor(Math.random() * 10000);
        const Key = Date.now() + randomNumber + '.' + fileExtension;
        const objectParams = { Bucket: BUCKET_NAME, Key, Body: buffer, ACL: 'public-read' };
        const uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' }).putObject(objectParams).promise();
        await uploadPromise;
        return Key;
    }
}

module.exports = { s3, uploadAWS };