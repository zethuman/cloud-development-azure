const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
require('dotenv').config();
var express = require('express')
const path  = require('path')
const { getBlobSasUri } = require('./util/functions')

// const __dirname = path.resolve()
const app = express()
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'));

app.use(express.static(path.resolve(__dirname, 'static')))

app.get('/', async function(req,res) {
    const account = "webapprakhat";
    const accountKey = process.env.AZURE_STORAGE_CONNECTION_STRING;

    const containerName = "public"

    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,sharedKeyCredential);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    let i = 1;
    let arrayOfBlobs = []
    let blobs = containerClient.listBlobsFlat();
    for await (const blob of blobs) {
        const sasuri = await getBlobSasUri(containerClient, blob.name, sharedKeyCredential, null)
        arrayOfBlobs.push(sasuri)
        console.log(`Blob ${i++}: ${blob.name} , ${sasuri}`);
    }

    res.render('index', {data: arrayOfBlobs})
});

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})