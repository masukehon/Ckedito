const express = require('express');
const cors = require('cors');
import { json } from 'body-parser';
import { ckeditorRouter } from './controllers/ckeditor.route';


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

