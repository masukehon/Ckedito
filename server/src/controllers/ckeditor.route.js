const { Router } = require("express");
const fs = require('fs');
const path = require('path');
const { upload } = require('../utils/multer');
const Jimp = require('jimp');

const ckeditorRouter = Router();

ckeditorRouter.get('/files', (req, res) => {
    const images = fs.readdirSync('public/upload');
    const imgExtensions = ['.png', '.jpg', '.jpeg', '.svg'];
    const imageData = images
        .filter(item => imgExtensions.includes(path.extname(item)))
        .map(item => ({ image: `http://localhost:4000/upload/${item}`, folder: '/' }));
    res.send(imageData);
});

ckeditorRouter.post('/', (req, res, next) => {
    return new Promise((resolve, reject) => {
        upload.single('flFileUpload')(req, res, async error => {
            if (error) return reject(error);

            if (req.file) {
                const path = 'public/upload/' + req.file.filename;
                const path_thumb = 'public/thumb/' + req.file.filename;
                await Jimp.read(path)
                    .then(image => image.quality(30).write(path_thumb))
                    .catch(error => reject(error.message));
            }
            return resolve(res.redirect('back'));
        });
    });
});

module.exports = { ckeditorRouter };