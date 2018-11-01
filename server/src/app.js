const express = require("express");
const { json } = require('body-parser');
const { ckeditorRouter } = require("./controllers/ckeditor.route");

const cors = require("cors");

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(cors());
app.use(json());



app.get('/', (req, res) => {
    res.send('hello');
});

app.use('/upload', ckeditorRouter);


app.listen(4000, () => console.log('Server started !!'));

