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
        .map(item => ({ image: `http://localhost:4000/upload/${item}`, folder: '/' }));
    res.send(imageData);
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