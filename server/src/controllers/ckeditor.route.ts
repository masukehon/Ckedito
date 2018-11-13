import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { upload } from '../utils/multer';
import Jimp from 'jimp';
import { s3, uploadAWS, deleteImageAWS } from '../utils/uploadAWS';
import { CkeditorService } from '../services/ckeditor.service';

export const ckeditorRouter = Router();

// get file ở server
ckeditorRouter.get('/files', (req, res) => {
    const images = fs.readdirSync('public/upload');
    const imgExtensions = ['.png', '.jpg', '.jpeg', '.svg'];
    const imageData = images
        .filter(item => imgExtensions.includes(path.extname(item)))
        .map(item => ({ image: `/upload/${item}`, folder: '/' }));
    res.send(imageData);
});

// get file ở server aws
ckeditorRouter.get('/image-on-aws', (req, res) => {
    CkeditorService.getAllImageOnAWS()
        .then(imageData => res.send(imageData))
        .catch(error => console.log(error));
});

// upload file lên server
ckeditorRouter.post('/', (req, res: any) => {
    return new Promise((resolve, reject) => {
        upload.single('flFileUpload')(req, res, async error => {

            if (error) return reject(error);

            const { quality } = req.body;
            if (req.file) {
                const pathUrl = 'public/upload/' + req.file.filename;
                const pathThumb = 'public/thumb/' + req.file.filename;
                await Jimp.read(pathUrl)
                    .then(image => image.quality(+quality).write(pathThumb))
                    .catch(err => reject(err.message));
            }
            return resolve(res.redirect('back'));
        });
    });
});

// upload file lên server aws
ckeditorRouter.post('/aws', (req, res: any, next) => {
    CkeditorService.uploadImageToAWS(req, res)
        .then(() => res.redirect('back'))
        .catch(error => console.log(error));
});

// delete file trên server aws
ckeditorRouter.post('/delete-file', (req, res) => {
    const { url_del } = req.body;
    CkeditorService.deleteImageOnAWS(url_del)
        .then(() => res.send({ result: 'success' }))
        .catch(error => console.log(error));
});

