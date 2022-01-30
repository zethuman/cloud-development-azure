const { BlobServiceClient, StorageSharedKeyCredential  } = require('@azure/storage-blob');
const getStream = require('into-stream');


async function getContainer(){
    const account = "zooshoprakhat";
    const accountKey = process.env.AZURE_STORAGE_CONNECTION_STRING;

    const containerName = "pet-images"

    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    const blobServiceClient = new BlobServiceClient(
        `https://${account}.blob.core.windows.net`,sharedKeyCredential
    );
    return await blobServiceClient.getContainerClient(containerName);
}

async function uploadImage(image){
    const containerClient = await getContainer()

    const blobName = image.originalname;
    const stream = getStream(image.buffer);
    const streamLength = image.size;
    const contentType = image.mimetype;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    blockBlobClient.uploadStream(stream,streamLength)
    console.log(`Image was uploaded`)
}

async function deleteImage(image){
    const containerClient = await getContainer()
    try{
        containerClient.deleteBlob(image)
    } catch {
        console.log("Can not find image by blob name ", image)
    }
}

module.exports = {
    uploadImage,
    deleteImage
}