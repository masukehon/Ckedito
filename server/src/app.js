const express = require("express");
const { json } = require('body-parser');
const multer = require('multer');
const cors = require("cors");

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(cors());
app.use(json());

app.get('/', (req, res) => {
    res.send('hello');
});
app.post('/browser/img', (req, res) => {
    res.send('browser');
});

app.post('/upload/img', multer().single('image'), (req, res) => {
    console.log(req.body);
    res.send('upload');
});

app.listen(4000, () => console.log('Server started !!'));

