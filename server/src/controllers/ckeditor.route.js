const { Router } = require("express");
const fs = require('fs');
const path = require('path');
const { upload } = require('../utils/multer');
const Jimp = require('jimp');
const { s3, uploadAWS } = require('../utils/uploadAWS');



const ckeditorRouter = Router();

ckeditorRouter.get('/files', (req, res) => {
    const images = fs.readdirSync('public/upload');
    const imgExtensions = ['.png', '.jpg', '.jpeg', '.svg'];
    const imageData = images
        .filter(item => imgExtensions.includes(path.extname(item)))
        .map(item => ({ image: `http://localhost:4000/upload/${item}`, folder: '/' }));
    res.send(imageData);
});

ckeditorRouter.get('/image-on-aws', (req, res) => {
    var bucketParams = {
        Bucket: 'purtier'
    };

    s3.listObjects(bucketParams).promise()
        .then(items => {
            const path = 'https://s3-ap-southeast-1.amazonaws.com/purtier/';
            const imageData = items.Contents.map(imageInfo => ({ image: path + imageInfo.Key, folder: '/' }));
            res.send(imageData);
        })
        .catch(error => console.log(error));
});

ckeditorRouter.post('/', (req, res, next) => {
    return new Promise((resolve, reject) => {
        upload.single('flFileUpload')(req, res, async error => {
            const { quality } = req.body;
            if (error) return reject(error);

            if (req.file) {
                const path = 'public/upload/' + req.file.filename;
                const path_thumb = 'public/thumb/' + req.file.filename;
                await Jimp.read(path)
                    .then(image => image.quality(+quality).write(path_thumb))
                    .catch(error => reject(error.message));
            }
            return resolve(res.redirect('back'));
        });
    });
});
ckeditorRouter.post('/aws', (req, res, next) => {
    return new Promise((resolve, reject) => {
        upload.single('flFileUpload')(req, res, async error => {
            const { quality } = req.body;
            if (error) return reject(error);

            if (req.file) {
                const path = 'public/upload/' + req.file.filename;

                await Jimp.read(path)
                    .then(image => ({ image, ext: image.getExtension() }))
                    .then(obj => {
                        let mine = "image/jpeg";
                        if (obj.ext.includes("bmp")) mine = "image/bmp";
                        if (obj.ext.includes("png")) mine = "image/png";

                        return { buffer: obj.image.quality(+quality).getBufferAsync(mine), ext: obj.ext };
                    })
                    .then(async obj => {
                        buffer = await obj.buffer;
                        uploadAWS(buffer, obj.ext);
                    })
                    .catch(error => reject(error.message));
            }
            return resolve(res.redirect('back'));
        });

    });
});

module.exports = { ckeditorRouter };