import { s3, uploadAWS, deleteImageAWS } from '../utils/uploadAWS';
import { upload } from '../utils/multer';
import Jimp from 'jimp';

export class CkeditorService {

    public static async getAllImageOnAWS() {
        const bucketParams = {
            Bucket: 'purtier'
        };

        return s3.listObjects(bucketParams).promise()
            .then(items => {
                const pathUrl = 'https://s3-ap-southeast-1.amazonaws.com/purtier/';
                const imageData = items.Contents
                    .sort((a, b) => b.LastModified.getTime() - a.LastModified.getTime())
                    .map(imageInfo => ({ image: pathUrl + imageInfo.Key, folder: '/' }));
                return imageData;
            });
    }

    public static async uploadImageToAWS(req, res) {
        return new Promise((resolve, reject) => {
            upload.single('flFileUpload')(req, res, async error => {

                if (error)
                    return reject(error);

                const fileExtension = req.file.originalname.substring(req.file.originalname.lastIndexOf('.') + 1);
                req.file.originalname = `${Date.now()}.${fileExtension}`;
                const { quality } = req.body;

                if (req.file) {

                    await Jimp.read(req.file.buffer)
                        .then(async image => {
                            const extension = image.getExtension();
                            let mine = 'image/jpeg';
                            if (extension.includes('bmp')) mine = 'image/bmp';
                            if (extension.includes('png')) mine = 'image/png';
                            const buffer = await image.quality(+quality).getBufferAsync(mine);

                            return uploadAWS(buffer, extension);
                        });
                }
                return resolve(true);
            });
        });
    }

    public static async deleteImageOnAWS(imageUrl) {
        const index = imageUrl.lastIndexOf('/');
        const Key = imageUrl.substring(index + 1);
        return deleteImageAWS(Key);
    }
}
