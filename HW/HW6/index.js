require('dotenv').config();
var express = require('express')
const path  = require('path')
const bodyParser = require('body-parser');

const posts = require('./routes/posts');

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'));

app.use(express.static(path.resolve(__dirname, 'ejs/static')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/post', posts);


const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})