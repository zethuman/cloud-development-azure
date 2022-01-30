require('dotenv').config();
var express = require('express')
const path  = require('path')
const bodyParser = require('body-parser');
const { getPets, createPet, deletePet, updatePet } = require('./util/cosmos');
const multer = require('multer');
const { uploadImage, deleteImage } = require('./util/blobStorage');
const inMemoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMemoryStorage });

// const __dirname = path.resolve()
const app = express()
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'));

app.use(express.static(path.resolve(__dirname, 'ejs/static')))
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async function(req,res) {
    results = await getPets()
    for (const pet in results){
        pet.url = `https://zooshoprakhat.blob.core.windows.net/pet-images/${pet.imagename}`
    }
    console.log(results)
    res.render('index', {data: results})
});

app.get('/add', async function(req,res) {
    res.render('add')
});

app.post('/add', singleFileUpload.single('img'), async function(req,res, next) {
    const image = req.file;
    const name = req.body.name;
    const category = req.body.category;
    const facts = req.body.facts;
    
    try{
        await uploadImage(image)
        await createPet(category, name, image.originalname, facts)
    } catch (err){
        console.log("Error occured when uploading: ", err)
        res.status(400).send("Error occured when uploading: ", err)
    }

    res.render('add')
}); 

app.post('/view', async function(req,res) {
    console.log(req.body)
    res.render('view', {data: req.body})
});

app.post('/edit', async function(req,res) {
    console.log('Edit ',req.body)
    const id = req.body.id
    const name = req.body.name
    const facts = req.body.facts
    const category = req.body.category
    const imagename = req.body.imagename
    const method = req.body.method

    if(method==='edit'){
        await updatePet(id, name, facts, category, imagename)
        res.render('edited')
    } else if (method === 'delete'){
        const deleted = await deletePet(id)
        await deleteImage(imagename)
        console.log(deleted)
        res.render('deleted')
    } else{
        res.status(400).render('index')
    }
});

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})