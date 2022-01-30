const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const path = require('path')

async function getContainer(){
  const account = "finalimagestore";
  const accountKey = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const containerName = "finalimagecontainer"

  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
  const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,sharedKeyCredential
  );
  return await blobServiceClient.getContainerClient(containerName);
}

const uploadToAzure = async (src) => {
  try {
    const blobName = path.basename(src).split('.')[0]
    const containerClient = await getContainer()
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    blockBlobClient.uploadFile(src);
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

module.exports = {
  uploadToAzure,
}