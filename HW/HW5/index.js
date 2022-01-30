require('dotenv').config();
var express = require('express')
const path  = require('path')
const bodyParser = require('body-parser');

const users = require('./routes/users');
const products = require('./routes/products');
const categories = require('./routes/categories');

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'));

app.use(express.static(path.resolve(__dirname, 'ejs/static')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', users);
app.use('/products', products);
app.use('/categories', categories);


const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})