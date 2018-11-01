const { Router } = require("express");
const fs = require('fs');
const path = require('path');
const { upload } = require('../utils/multer');

const ckeditorRouter = Router();

ckeditorRouter.get('/files', (req, res) => {
    const images = fs.readdirSync('public/upload');
    const imgExtensions = ['.png', '.jpg', '.jpeg', '.svg'];
    const imageData = images
        .filter(item => imgExtensions.includes(path.extname(item)))
        .map(item => ({ image: `/upload/${item}`, folder: '/' }));
    res.send({ success: true, result: imageData});
});

ckeditorRouter.post('/', (req, res, next) => {
    return new Promise((resolve, reject) => {
        upload.single('flFileUpload')(req, res, error => {
            console.log(req.file);
            res.send({ success: true, result: "ok"});
        });
    });
});

module.exports = { ckeditorRouter };